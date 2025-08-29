import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Plus } from "lucide-react";
import { AddSongForm } from "./AddSongForm";
import type { ComponentProps } from "react";

export function AddSongFormCard({
  formProps,
}: {
  formProps?: ComponentProps<typeof AddSongForm>;
}) {
  return (
    <Card className="mt-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="space-y-1 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center">
            <Plus className="h-5 w-5 mr-2 text-primary" />
            Add New Song
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <AddSongForm {...formProps} />
      </CardContent>
    </Card>
  );
}
