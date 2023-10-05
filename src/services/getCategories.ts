import axios from "axios";

const CATEGORIES_URL = import.meta.env.VITE_APP_BASE_URL + "/v1/admin/categories";

export const getCategories = async () => {
  const accessToken = getAccessToken();

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.get(CATEGORIES_URL, config);

    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};
