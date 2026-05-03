import { API_BASE_URL, API_ENDPOINTS, clientApiFetch } from "@/core";

export const updateCoverService = async (file: File) => {
  const formData = new FormData();
  formData.append("cover", file);

  const data = await clientApiFetch(
    `${API_BASE_URL}${API_ENDPOINTS.AUTH.UPLOAD_COVER}`,
    {
      method: "PUT",
      body: formData,
    },
  );

  return data;
};
