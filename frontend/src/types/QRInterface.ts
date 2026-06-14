export interface QRInput {
  title: string;
  startTime: string;
  endTime: string;
  locationMethod: string;
  ipAddress: string;
}

export interface QRRecordResponse {
  id: number;
  qrCodeId: number;
  memberEmail: string;
  amountCheckIn: number;
  createdAt: Date;
}

export interface QRResponse {
  id: number;
  token: string;
  code: string;
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
  currentQr: QRResponse | null;
  scanStatus: "idle" | "rejected" | "succeeded" | "pending";
}
