import { createSlice } from "@reduxjs/toolkit";
import type { RoomInitialState } from "../types/RoomInterface";
import { createRoom, getAllRooms, getRoomDetails } from "../feature/RoomThunk";

const roomInitialState: RoomInitialState = {
  rooms: null,
  detail: null,
  status: "idle",
};

export const roomSlice = createSlice({
  name: "room",
  initialState: roomInitialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllRooms.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getAllRooms.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rooms = action.payload;
      })
      .addCase(getAllRooms.rejected, (state) => {
        state.status = "rejected";
        state.rooms = null;
      });

    builder
      .addCase(getRoomDetails.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getRoomDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detail = action.payload;
      })
      .addCase(getRoomDetails.rejected, (state) => {
        state.status = "rejected";
        state.rooms = null;
      });

    builder
      .addCase(createRoom.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rooms?.push(action.payload);
      })
      .addCase(createRoom.rejected, (state) => {
        state.status = "rejected";
        state.rooms = null;
      });
  },
});

export default roomSlice.reducer;
