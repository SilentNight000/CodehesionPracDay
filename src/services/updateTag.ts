import axios from "axios";

const UPDATE_TAG_URL = import.meta.env.VITE_APP_BASE_URL;

const api = axios.create({
  baseURL: UPDATE_TAG_URL,
});

export const updateTag = async (id: number, name: string, color: string) => {
  try {
    const accessToken = getAccessToken();

    const sendData = {
      name: name,
      color: color,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await api.put(`/v1/admin/Tags/${id}`, sendData, config);

    console.log("Update success: ", response);
    return response;
  } catch (error) {
    console.log("Update failed: ", error);
    throw error;
  }
};

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};
