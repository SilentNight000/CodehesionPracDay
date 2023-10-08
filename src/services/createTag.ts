import axios from "axios";

const CREATE_TAG_URL = import.meta.env.VITE_APP_BASE_URL;

const api = axios.create({
  baseURL: CREATE_TAG_URL,
});

export const createTag = async (name: string, color: string) => {
    try {
        const sendData = {
            name: name,
            color: color,
        }

        const accessToken = getAccessToken();

        const config = {
            headers: {
            Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        };

        const response = await api.post("/v1/admin/Tags", sendData, config);

        console.log("Creation success: ", response);
        return response;
    }
    catch (error) {
        console.log("Creation failed: ", error);
        throw error;
    }
}

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};
