import { Card, CardContent } from "@/shared";
import { PostCreatorForm } from "./creator";

export async function PostCreator() {
  return (
    <Card className="rounded-lg border border-border shadow-sm py-0">
      <CardContent className="p-4">
        <PostCreatorForm />
      </CardContent>
    </Card>
  );
}
