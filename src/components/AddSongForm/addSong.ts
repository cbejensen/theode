"use server";

import { db } from "@/db";
import { getCurrentUser } from "@/lib/user";

export enum ErrorMessage {
  TitleRequired = "Title is required",
  LyricsRequired = "Lyrics are required",
  UserNotFound = "User not found",
  UnknownError = "An unknown error occurred",
}

export interface AddSongFormValue {
  title: string;
  artist: string;
  lyrics: string;
}

export interface AddSongResult {
  success: boolean;
  errors?: FieldError<ErrorMessage>[];
  formValue?: AddSongFormValue;
}

export interface FieldError<Message extends string> {
  field?: string;
  message: Message;
}

export function validate(formData: FormData): FieldError<ErrorMessage>[] {
  const errors: FieldError<ErrorMessage>[] = [];

  // Validate required fields
  if (!formData.get("title")) {
    errors.push({ field: "title", message: ErrorMessage.TitleRequired });
  }

  if (!formData.get("lyrics")) {
    errors.push({ field: "lyrics", message: ErrorMessage.LyricsRequired });
  }

  return errors;
}

export async function addSong(
  prevState: unknown,
  formData: FormData
): Promise<AddSongResult> {
  // Extract form values to preserve on error
  const formValue: AddSongFormValue = {
    title: formData.get("title") as string,
    artist: formData.get("artist") as string,
    lyrics: formData.get("lyrics") as string,
  };
  const errors = validate(formData);
  if (errors.length > 0) {
    return { success: false, errors, formValue };
  }

  // Get current user
  const user = await getCurrentUser();
  if (!user) {
    errors.push({ field: "user", message: ErrorMessage.UserNotFound });
    return { success: false, errors, formValue };
  }

  try {
    // Create the song directly associated with the user
    await db.song.create({
      data: {
        ...formValue,
        userId: user.id,
      },
    });

    console.log("Song saved successfully:", formValue);
    return { success: true, formValue };
  } catch (error) {
    console.error("Failed to save song:", error);
    return {
      success: false,
      errors: [{ message: ErrorMessage.UnknownError }],
      formValue,
    };
  }
}
