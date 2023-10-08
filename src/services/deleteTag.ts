import axios from "axios";

const DELETE_TAG_URL = import.meta.env.VITE_APP_BASE_URL;

const api = axios.create({
  baseURL: DELETE_TAG_URL,
});

export const deleteTag = async (id: number) => {
  try {
    const accessToken = getAccessToken();

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await api.delete(`/v1/admin/Tags/${id}`, config);

    console.log("Delete success: ", response);
    return response;
  } catch (error) {
    console.log("Delete failed: ", error);
    throw error;
  }
};

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};
