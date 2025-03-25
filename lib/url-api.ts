import { getCookies } from "@/app/actions/actions";
import axios, { AxiosResponse } from "axios";
import api from "./axios-instance";

export const createUrlShorten = async (details: {
  originalUrl: string;
  customAlias?: string | null;
}) => {
  try {
    const token = await getCookies();
    const response: AxiosResponse = await api.post("/api/v1/urls", details, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
    const token = await getCookies();
    const response: AxiosResponse = await api.get("/api/v1/urls", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
    const token = await getCookies();
    const response: AxiosResponse = await api.delete(`/api/v1/urls/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
    const token = await getCookies();
    const response: AxiosResponse = await api.get(`/api/v1/urls/analytics`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
