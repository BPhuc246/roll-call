import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import type { QRInfo, QRInput } from "../types/QRInterface";
import toast from "react-hot-toast";

export const getAllQrs = createAsyncThunk<QRInfo[], void>(
  "qr/getAllQrs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/qr");
      return res.data.result;
    } catch (error: any) {
      return rejectWithValue(null);
    }
  },
);

export const createQrCode = createAsyncThunk<string, QRInput>(
  "qr/createQrCode",
  async (data, { rejectWithValue }) => {
    try {
      console.log("Sending data:", data);
      const result = await axiosInstance.post("/qr/create", data, {
        responseType: "blob",
      });
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(result.data);
      });

      toast.success("Create QR successfully");
      return base64;
    } catch (error) {
      return rejectWithValue(null);
    }
  },
);
