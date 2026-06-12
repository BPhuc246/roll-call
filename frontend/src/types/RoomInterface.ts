import type { UserInfo } from "./AuthInterface";
import type { QRInfo } from "./QRInterface";

export interface RoomInputRequest {
  name: string;
  allowMembersEmail: string[] | null;
}

export interface RoomInfo {
  id: number;
  name: string;
  allowMembersEmail: string[];
  members: UserInfo[];
  owner: UserInfo;
  qrCodes: QRInfo[];
  createdAt: Date;
}

export interface RoomInitialState {
  rooms: RoomInfo[] | null;
  status: "idle" | "rejected" | "succeeded" | "pending";

  detail: RoomInfo | null;
  detailStatus: "idle" | "rejected" | "succeeded" | "pending";

  createStatus: "idle" | "rejected" | "succeeded" | "pending";
}
