
import axios from "axios";

const GET_TAGS_URL = import.meta.env.VITE_APP_BASE_URL + "/v1/admin/Tags";

export const getTags = async () => {
  const accessToken = getAccessToken();

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.get(GET_TAGS_URL, config);

    // console.log(response);
    return response.data.data.items;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};
