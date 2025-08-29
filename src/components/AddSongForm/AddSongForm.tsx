"use client";
import { useActionState } from "react";
import { Button } from "../ui/Button";
import { FormField } from "../ui/FormField";
import { addSong } from "./addSong";

export function AddSongForm({
  cancelButton,
}: {
  cancelButton?: React.ReactNode;
}) {
  const [formState, formAction, isPending] = useActionState(addSong, undefined);

  // Helper function to get field error
  const getFieldError = (fieldName: string) => {
    return formState?.errors?.find((error) => error.field === fieldName)
      ?.message;
  };

  return (
    <form noValidate action={formAction}>
      <div className="space-y-4">
        <FormField
          id="title"
          label="Title"
          name="title"
          type="text"
          placeholder="Enter song title"
          className="w-full"
          required
          error={getFieldError("title")}
          defaultValue={formState?.formValue?.title}
        />

        <FormField
          id="artist"
          label="Artist"
          name="artist"
          type="text"
          placeholder="Enter artist name (optional)"
          className="w-full"
          error={getFieldError("artist")}
          defaultValue={formState?.formValue?.artist}
        />

        <div>
          <label
            htmlFor="lyrics"
            className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 after:content-['*'] after:ml-0.5 after:text-red-500"
          >
            Lyrics
          </label>
          <textarea
            id="lyrics"
            placeholder="Enter song lyrics"
            className={`flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${
              getFieldError("lyrics")
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }`}
            rows={6}
            name="lyrics"
            required
            defaultValue={formState?.formValue?.lyrics}
          />
          {getFieldError("lyrics") && (
            <p className="text-sm text-red-500 mt-2">
              {getFieldError("lyrics")}
            </p>
          )}
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="submit" className="flex-1" disabled={isPending}>
            Add Song
          </Button>
          {cancelButton}
        </div>
      </div>
    </form>
  );
}
