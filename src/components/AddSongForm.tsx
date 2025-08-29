"use server";

import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

async function addSong(value: any) {
  "use server";
  console.log(value);
  const { title, artist, lyrics } = value;
  console.log({ title, artist, lyrics });
}

export function AddSongForm({
  cancelButton,
}: {
  cancelButton?: React.ReactNode;
}) {
  return (
    <form action={addSong}>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title *
          </label>
          <Input
            id="title"
            type="text"
            placeholder="Enter song title"
            className="w-full"
            name="title"
            required
          />
        </div>

        <div>
          <label
            htmlFor="artist"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Artist
          </label>
          <Input
            id="artist"
            type="text"
            placeholder="Enter artist name (optional)"
            className="w-full"
            name="artist"
          />
        </div>

        <div>
          <label
            htmlFor="lyrics"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Lyrics *
          </label>
          <textarea
            id="lyrics"
            placeholder="Enter song lyrics"
            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            rows={6}
            name="lyrics"
            required
          />
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="submit" className="flex-1">
            Add Song
          </Button>
          {cancelButton}
        </div>
      </div>
    </form>
  );
}
