import { API_BASE_URL, API_ENDPOINTS, clientApiFetch } from "@/core";

export const updatePhotoService = async (file: File) => {
  const formData = new FormData();
  formData.append("photo", file);

  const data = await clientApiFetch(
    `${API_BASE_URL}${API_ENDPOINTS.AUTH.UPLOAD_PHOTO}`,
    {
      method: "PUT",
      body: formData,
    },
  );

  return data;
};
