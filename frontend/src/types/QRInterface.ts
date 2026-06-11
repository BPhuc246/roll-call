export interface QRInput {
  title: string;
  startTime: string;
  endTime: string;
  locationMethod: string;
}

export interface QRInfo {
  id: number;
  title: string;
  token: string;
  username: string;
  avatar: string;
  email: string;
  startTime: Date;
  endTime: Date;
  locationMethod: string;
  status: "ACTIVE" | "INACTIVE" | "EXPIRED";
}

export interface QRInitialState {
  qrs: QRInfo[] | null;
  status: "idle" | "rejected" | "succeeded" | "pending";
  currentQr: string | null;
}
