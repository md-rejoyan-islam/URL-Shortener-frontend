import axios, { AxiosResponse } from "axios";
import api from "./axios-instance";

export const createUrlShorten = async (details: {
  originalUrl: string;
  customAlias?: string | null;
}) => {
  try {
    const response: AxiosResponse = await api.post("/api/v1/urls", details, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error.message || "Registration failed"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getAllUrls = async () => {
  try {
    const response: AxiosResponse = await api.get("/api/v1/urls", {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return new Error(
        error.response.data.error.message || "Registration failed"
      );
    } else {
      return new Error("An unexpected error occurred");
    }
  }
};

export const deleteUrlById = async (id: string) => {
  try {
    const response: AxiosResponse = await api.delete(`/api/v1/urls/${id}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return new Error(
        error.response.data.error.message || "Registration failed"
      );
    } else {
      return new Error("An unexpected error occurred");
    }
  }
};

export const analyticUrls = async () => {
  try {
    const response: AxiosResponse = await api.get(`/api/v1/urls/analytics`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return new Error(
        error.response.data.error.message || "Registration failed"
      );
    } else {
      return new Error("An unexpected error occurred");
    }
  }
};
