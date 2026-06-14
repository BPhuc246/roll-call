import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import type {
  QRInfo,
  QRInput,
  QRRecordResponse,
  QRResponse,
} from "../types/QRInterface";
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

export const createQrCode = createAsyncThunk<QRResponse, QRInput>(
  "qr/createQrCode",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/qr/create", data);
      toast.success("Create QR successfully");
      return res.data.result;
    } catch (error) {
      return rejectWithValue(null);
    }
  },
);

export const scanQrCode = createAsyncThunk<QRRecordResponse, string>(
  "qr/scanQrCode",
  async (code, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/qr/scan", code);
      toast.success("Scan QR successfully");
      return res.data.result;
    } catch (error) {
      toast.error("Scan QR failed");
      return rejectWithValue(null);
    }
  },
);
