import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import QRSlice from "./QRSlice";
import roomSlice from "./RoomSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    qr: QRSlice,
    room: roomSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
