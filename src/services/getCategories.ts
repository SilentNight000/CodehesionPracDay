import axios from "axios";

const CATEGORIES_URL = "https://edeaf-api-staging.azurewebsites.net/v1/admin/categories";

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
    throw error; // You can handle the error further up in your code
  }
};

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};
