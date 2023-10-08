import axios from "axios";

const CURRENT_USER_URL = import.meta.env.VITE_APP_BASE_URL + "/v1/admin/Users/current";

export const getCurrentUser = async () => {
  const accessToken = getAccessToken();

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.get(CURRENT_USER_URL, config);

    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};
