/* eslint-disable no-useless-catch */
import axios from 'axios';

const LOGIN_URL = "https://edeaf-api-staging.azurewebsites.net/connect/token";

const api = axios.create({
    baseURL: LOGIN_URL,
})

const scope = import.meta.env.VITE_APP_SCOPE;
const clientSecret = import.meta.env.VITE_APP_CLIENT_SECRET;
const clientId = import.meta.env.VITE_APP_CLIENT_ID;
const grantType = import.meta.env.VITE_APP_GRANT_TYPE;

export const loginUser = async (username: string, password: string) => {
    try {
        const formData = new URLSearchParams();
        formData.append("grant_type", grantType);
        formData.append("client_id", clientId);
        formData.append("client_secret", clientSecret);
        formData.append("scope", scope);
        formData.append("username", username);
        formData.append("password", password);

        const config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        };
        const response = await api.post('', formData, config);
        // console.log("No error");
        localStorage.setItem('access_token', response.data.access_token);
        return response;
    } catch (error) {
        // console.log("Error");
        throw error;
    }
}