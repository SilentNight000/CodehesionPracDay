import axios from "axios";

const WORDS_URL = import.meta.env.VITE_APP_BASE_URL + "/v1/admin/Words";

export const getWords = async () => {
  const accessToken = getAccessToken();

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.get(WORDS_URL, config);

    // console.log("Words: ", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};
