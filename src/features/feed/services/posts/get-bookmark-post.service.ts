import { API_BASE_URL, API_ENDPOINTS, clientApiFetch } from "@/core";

interface GetBookmarkPostServiceParams {
  limit?: number;
  page?: number;
}

export const getBookmarkPostService = async ({
  limit = 10,
  page = 1,
}: GetBookmarkPostServiceParams = {}) => {
  const response = await clientApiFetch(
    `${API_BASE_URL}${API_ENDPOINTS.POSTS.GET_BOOKMARKS(page, limit)}`,
  );

  return {
    ...response,
    data: {
      ...response.data,
      posts: response.data?.bookmarks || [],
    },
  };
};
