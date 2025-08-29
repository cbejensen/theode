import { Music } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { db } from "@/db";

function getPreviewLyrics(lyrics: string): string {
  const lines = lyrics.split("\n");
  const previewLines = lines.slice(0, 4);
  return previewLines.join("\n") + (lines.length > 4 ? "..." : "");
}

export async function UserSongsList({ userId }: { userId: string }) {
  const songs = await db.song.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  if (!songs || songs.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Music className="h-5 w-5 mr-2" />
        Your Songs
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {songs.map((song) => (
          <Card key={song.id} className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">
                {song.title}
                {song.artist && (
                  <span className="text-sm font-normal text-muted-foreground ml-2">
                    by {song.artist}
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                {getPreviewLyrics(song.lyrics)}
              </pre>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
