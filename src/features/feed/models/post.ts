import { User } from "@/features";

export interface Comment {
  _id: string;
  content?: string;
  image?: string;
  commentCreator: User;
  post: string;
  parentComment: string | null;
  likes: string[];
  createdAt: string;
  repliesCount?: number;
}

export interface SharedPostType {
  _id: string;
  body?: string;
  image?: string;
  privacy: string;
  user: User;
  sharedPost: SharedPostType | null;
  likes: string[];
  createdAt: string;
  commentsCount: number;
  topComment: Comment | null;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
}

export interface Post {
  _id: string;
  body?: string;
  image?: string;
  privacy: string;
  user: User;
  sharedPost: SharedPostType | null;
  likes: Likes;
  createdAt: string;
  commentsCount: number;
  topComment: Comment | null;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
  bookmarked?: boolean;
}

export type Likes = string[];
