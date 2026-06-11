import type { UserInfo } from "./AuthInterface";
import type { QRInfo } from "./QRInterface";

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
  detail: RoomInfo | null;
  status: "idle" | "rejected" | "succeeded" | "pending";
}
