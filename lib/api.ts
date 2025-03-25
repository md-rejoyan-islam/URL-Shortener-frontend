import { AxiosError, AxiosResponse } from "axios";
import api from "./axios-instance";

interface LoginResponse {
  token: string;
}

export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  try {
    const response: AxiosResponse = await api.post("/api/v1/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const errorMessage = error.response.data?.message || "Login failed";
      throw new Error(errorMessage);
    }
    throw new Error("Login failed");
  }
}

interface RegistrationResponse {
  message: string;
  data: {
    _id: string;
    email: string;
    username: string;
  };
}

// Register API call
export async function registerUser(
  email: string,
  password: string
): Promise<RegistrationResponse> {
  try {
    const response: AxiosResponse = await api.post("/api/register", {
      email,
      password,
    });
    return response.data; // Axios automatically parses JSON
  } catch (error) {
    throw new Error("Registration failed");
  }
}
