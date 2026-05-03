import { Comment } from "@/features";
import { CommentItem } from "../comment-item";
import { CommentSkeleton } from "../item";

interface CommentsListProps {
  comments: Comment[];
  isLoading: boolean;
  postId: string;
  onReply: () => void;
}

export function CommentsList({
  comments,
  isLoading,
  postId,
  onReply,
}: CommentsListProps) {
  if (isLoading) {
    return (
      <div className="px-4 py-3 space-y-4">
        {[...Array(3)].map((_, i) => (
          <CommentSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="px-4 py-3 space-y-4">
      {comments.map((comment: Comment) => (
        <CommentItem
          key={comment._id}
          postId={postId}
          comment={comment}
          onReply={onReply}
        />
      ))}
    </div>
  );
}
