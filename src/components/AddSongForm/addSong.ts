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

export async function addSong(
  prevState: unknown,
  formData: FormData
): Promise<AddSongResult> {
  console.log("wowza");
  const title = formData.get("title");
  const artist = formData.get("artist");
  const lyrics = formData.get("lyrics");
  const errors: FieldError<ErrorMessage>[] = [];

  // Extract form values to preserve on error
  const formValue: AddSongFormValue = {
    title: (title as string) || "",
    artist: (artist as string) || "",
    lyrics: (lyrics as string) || "",
  };

  // Validate required fields
  if (!title) {
    errors.push({ field: "title", message: ErrorMessage.TitleRequired });
    return { success: false, errors, formValue };
  }

  if (!lyrics) {
    errors.push({ field: "lyrics", message: ErrorMessage.LyricsRequired });
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
        title: title as string,
        artist: artist as string,
        lyrics: lyrics as string,
        userId: user.id,
      },
    });

    console.log("Song saved successfully:", { title, artist, lyrics });
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
