import { User } from "@/features";

export interface ProfileUser extends User {
  cover?: string;
  createdAt: string;
  followersCount: number;
  followingCount: number;
  bookmarksCount: number;
  postsCount: number;
  gender: string;
  dateOfBirth: string;
  following?: string[];
  followers?: string[];
}

export interface ProfileData {
  isFollowing: boolean;
  user: ProfileUser;
}

export interface ProfileResponse {
  message: string;
  data: ProfileData;
}
