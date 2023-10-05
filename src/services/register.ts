import axios from "axios";

const REGISTER_URL = "https://edeaf-api-staging.azurewebsites.net/v1/admin/Users";

const api = axios.create({
  baseURL: REGISTER_URL,
});

export const registerUser = async (name: string, surname: string, email: string, role: string) => {
    try {
        const sendData = {
            name: name,
            surname: surname,
            email: email,
            role: role,
        }

        const accessToken = getAccessToken();

        const config = {
            headers: {
            Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        };

        const response = await api.post("", sendData, config);

        console.log("Register success: ", response);
        return response;
    }
    catch (error) {
        console.log("Register failed: ", error);
        throw error;
    }
}

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};