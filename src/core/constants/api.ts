import { PrivacyType } from "@/shared";

export const API_BASE_URL = "https://route-posts.routemisr.com" as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/users/signin",
    SIGNUP: "/users/signup",
    CHANGE_PASSWORD: "/users/change-password",
    UPLOAD_PHOTO: "/users/upload-photo",
    UPLOAD_COVER: "/users/upload-cover",
    DELETE_COVER: "/users/cover",
    PROFILE_DATA: "/users/profile-data",
  },
  POSTS: {
    GET_POSTS: (only: PrivacyType, limit: number, page: number) =>
      `/posts/feed?only=${only}&limit=${limit}&page=${page}`,
    GET_BOOKMARKS: (page: number, limit: number) =>
      `/users/bookmarks?page=${page}&limit=${limit}`,
    CREATE_POST: () => "/posts",
    GET_SINGLE_POST: (postId: string) => `/posts/${postId}`,
    GET_POST_LIKES: (postId: string, page: number, limit: number) =>
      `/posts/${postId}/likes?page=${page}&limit=${limit}`,
    UPDATE_POST: (postId: string) => `/posts/${postId}`,
    DELETE_POST: (postId: string) => `/posts/${postId}`,
    TOGGLE_LIKE_POST: (postId: string) => `/posts/${postId}/like`,
    TOGGLE_BOOKMARK_POST: (postId: string) => `/posts/${postId}/bookmark`,
    SHARE_POST: (postId: string) => `/posts/${postId}/share`,

    GET_COMMENTS: (postId: string, page: number, limit: number) =>
      `/posts/${postId}/comments?page=${page}&limit=${limit}`,
    CREATE_COMMENT: (postId: string) => `/posts/${postId}/comments`,
    GET_REPLIES: (
      postId: string,
      commentId: string,
      page: number,
      limit: number,
    ) =>
      `/posts/${postId}/comments/${commentId}/replies?page=${page}&limit=${limit}`,
    CREATE_REPLY: (postId: string, commentId: string) =>
      `/posts/${postId}/comments/${commentId}/replies`,
    UPDATE_COMMENT: (postId: string, commentId: string) =>
      `/posts/${postId}/comments/${commentId}`,
    DELETE_COMMENT: (postId: string, commentId: string) =>
      `/posts/${postId}/comments/${commentId}`,
    TOGGLE_LIKE_COMMENT: (postId: string, commentId: string) =>
      `/posts/${postId}/comments/${commentId}/like`,
  },
  USERS: {
    GET_ALL_USERS: (limit: number = 20) => `/users/suggestions?limit=${limit}`,
    FOLLOW_USER: (userId: string) => `/users/${userId}/follow`,
    SEARCH_USER: (q: string, page: number = 1, limit: number = 20) =>
      `/users/search?q=${q}&page=${page}&limit=${limit}`,
    GET_PROFILE: () => `/users/profile-data`,
    GET_USER_PROFILE: (userId: string) => `/users/${userId}/profile`,
    GET_USER_POSTS: (userId: string, page: number = 1, limit: number = 20) =>
      `/users/${userId}/posts?page=${page}&limit=${limit}`,
  },
  NOTIFICATIONS: {
    GET_NOTIFICATIONS: (unread: boolean, page: number, limit: number) =>
      `/notifications?${unread ? "unread=false&" : ""}page=${page}&limit=${limit}`,
    GET_UNREAD_COUNT: "/notifications/unread-count",
    READ_NOTIFICATION: (notificationId: string) =>
      `/notifications/${notificationId}/read`,
    READ_ALL_NOTIFICATIONS: "/notifications/read-all",
  },
} as const;
