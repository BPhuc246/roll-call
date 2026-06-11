import { createSlice } from "@reduxjs/toolkit";
import type { QRInitialState } from "../types/QRInterface";
import { createQrCode, getAllQrs } from "../feature/QRThunk";

const qrInitialState: QRInitialState = {
  qrs: null,
  status: "idle",
  currentQr: null,
};

export const QRSlice = createSlice({
  name: "qr",
  initialState: qrInitialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllQrs.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getAllQrs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.qrs = action.payload;
      })
      .addCase(getAllQrs.rejected, (state) => {
        state.qrs = null;
        state.status = "rejected";
      });

    builder
      .addCase(createQrCode.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createQrCode.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentQr = action.payload;
      })
      .addCase(createQrCode.rejected, (state) => {
        state.qrs = null;
        state.status = "rejected";
      });
  },
});

export default QRSlice.reducer;
