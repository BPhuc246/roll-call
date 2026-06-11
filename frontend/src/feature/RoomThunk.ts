import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import type { RoomInfo } from "../types/RoomInterface";

export const getAllRooms = createAsyncThunk<RoomInfo[], void>(
  "room/getAllRooms",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/room");
      return res.data.result;
    } catch (error: any) {
      return rejectWithValue(null);
    }
  },
);

export const getRoomDetails = createAsyncThunk<RoomInfo, number>(
  "room/getRoomDetails",
  async (roomId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/room/detail", {
        params: {
          roomId,
        },
      });

      return res.data.result;
    } catch (error) {
      return rejectWithValue(null);
    }
  },
);

export const createRoom = createAsyncThunk<RoomInfo, string>(
  "room/createRoom",
  async (name, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/room/create", name);
      return res.data.result;
    } catch (error: any) {
      return rejectWithValue(null);
    }
  },
);
