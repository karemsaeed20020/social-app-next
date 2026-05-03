"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Textarea,
} from "@/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSharePost } from "../../hooks";
import { Post as PostType } from "../../models";
import { SharePostFormValues, sharePostSchema } from "../../schemas";
import { SharedPost } from "./card/shared-post";

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  post: PostType;
}

export function ShareDialog({ isOpen, onClose, post }: ShareDialogProps) {
  const { mutate: sharePost, isPending } = useSharePost();

  const form = useForm<SharePostFormValues>({
    resolver: zodResolver(sharePostSchema),
    defaultValues: {
      body: "",
    },
  });

  const onSubmit = (values: SharePostFormValues) => {
    sharePost(
      {
        postId: post._id,
        body: values.body,
      },
      {
        onSuccess: () => {
          onClose();
          form.reset();
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-137.5 border-border/40 bg-card p-0 overflow-hidden shadow-2xl">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-bold tracking-tight">
            Share post
          </DialogTitle>
        </DialogHeader>

        <Form
          methods={form}
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col"
        >
          <div className="px-6 space-y-4">
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Say something about this..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Post Preview */}
            <div className="rounded-lg border border-border/50 bg-muted/50 overflow-hidden">
              <SharedPost post={post} />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 p-6 pt-4 border-t border-border/40 mt-4 bg-muted/20">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isPending}
              className="font-semibold h-10 px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="font-semibold h-10 px-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sharing...
                </>
              ) : (
                "Share now"
              )}
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
