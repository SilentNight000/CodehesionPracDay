import axios from "axios";

const WORDS_URL = import.meta.env.VITE_APP_BASE_URL;

export const addWord = async (id: number, wordId: number) => {
  const accessToken = getAccessToken();

  const sendData = {
    wordId: wordId,
  }

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.patch(`${WORDS_URL}/v1/admin/categories/${id}/words`, sendData, config);

    // console.log(response);
    return response;
  } catch (error) {
    console.error("Error updating word:", error);
    throw error;
  }
};

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};
