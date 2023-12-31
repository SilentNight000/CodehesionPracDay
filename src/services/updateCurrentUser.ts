import axios from "axios";

const UPDATE_USER_URL = import.meta.env.VITE_APP_BASE_URL;

const api = axios.create({
  baseURL: UPDATE_USER_URL,
});

export const updateCurrentUser = async (name: string, lastName: string, email: string) => {
    try {
        const accessToken = getAccessToken();

        const sendData = {
            name: name,
            lastName: lastName,
            email: email,
        }

        const config = {
            headers: {
            Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        };

        const response = await api.put("/v1/admin/Users/current", sendData, config);

        console.log("Update success: ", response);
        return response;
    }
    catch (error) {
        console.log("Update failed: ", error);
        throw error;
    }
}

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};