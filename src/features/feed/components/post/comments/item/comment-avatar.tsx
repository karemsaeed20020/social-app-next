import { Avatar, AvatarFallback, AvatarImage } from "@/shared";

interface CommentAvatarProps {
  photo?: string;
  name: string;
}

export function CommentAvatar({ photo, name }: CommentAvatarProps) {
  return (
    <Avatar className="size-8 shrink-0 border border-border">
      <AvatarImage src={photo} alt={name} />
      <AvatarFallback>{name[0]}</AvatarFallback>
    </Avatar>
  );
}
