import {
  Calendar,
  CloudUpload,
  DoorOpen,
  FileSpreadsheet,
  Plus,
  QrCode,
  Trash,
  Users,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { useEffect, useState } from "react";
import {
  createRoom,
  getAllRooms,
  getRoomDetails,
} from "../../feature/RoomThunk";
import { PercentNumberToColor } from "../../utils/ColorFunction";
import type { RoomInfo, RoomInputRequest } from "../../types/RoomInterface";
import { convertListToStringArray } from "../../utils/ConvertFunction";

const RoomManagement = () => {
  const { rooms, detail, status, createStatus } = useSelector(
    (state: RootState) => state.room,
  );

  const dispatch = useDispatch<AppDispatch>();
  const [currentRoom, setCurrentRoom] = useState<RoomInfo | null>(null);
  const [formData, setFormData] = useState<RoomInputRequest>({
    name: "",
    allowMembersEmail: null,
  });

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    await dispatch(createRoom(formData)).unwrap();
    setFormData({ name: "", allowMembersEmail: null });
    dispatch(getAllRooms());
  };

  useEffect(() => {
    const load = async () => {
      const result = await dispatch(getAllRooms()).unwrap();

      if (result.length > 0) {
        setCurrentRoom(result[0]);
        dispatch(getRoomDetails(result[0].id));
      }
    };

    load();
  }, [dispatch]);

  const handleSelectRoom = (room: RoomInfo) => {
    setCurrentRoom(room);
    dispatch(getRoomDetails(room.id));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      allowMembersEmail: await convertListToStringArray(e),
    });
  };

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen flex flex-col p-5 text-white">
      <div className="flex flex-col w-full gap-5">
        {/* Create room */}
        <div className="bg-slate-900/70 w-full p-5 rounded-md border border-slate-500">
          <h1 className="flex items-center gap-2 uppercase font-semibold text-slate-300">
            <DoorOpen className="text-blue-500" /> Create new room
          </h1>
          <form
            className="flex flex-col gap-2 text-sm font-bold mt-3"
            onSubmit={handleCreateRoom}
          >
            <div className="flex flex-col gap-2 font-normal">
              <label className="font-bold">Room Name</label>
              <p className="text-slate-400 text-xs">
                Set the name for room to manage
              </p>
              <input
                type="text"
                className="w-full bg-black border border-gray-400 rounded-md p-3 text-white focus:outline-none focus:border-blue-300 text-xs"
                placeholder="Roll Call Network Class #1"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2 font-normal">
              <label className="mt-3 font-bold">Allow members email</label>
              <p className="text-slate-400 text-xs">
                Default is public or set specific allowed emails
              </p>
              <label className="w-full flex flex-col border border-dashed border-slate-400 p-4 gap-3 rounded-md items-center text-xs font-normal cursor-pointer">
                <input
                  id="member-file"
                  type="file"
                  accept=".csv,.xlsx,.xls, .txt"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="bg-blue-950 rounded-full w-fit p-2">
                  <CloudUpload className="text-blue-600 size-7" />
                </div>
                <h1 className="font-bold">Upload Excel / CSV Spreadsheet</h1>
                <p className="text-center text-slate-400">
                  Parse spreadsheet strings into member roster list
                  automatically. Any tabular emails, student IDs, or usernames
                  will compile.
                </p>
                <div className="flex items-center gap-2 border border-slate-400 py-1 px-3 rounded-md text-slate-500 bg-slate-800/70">
                  <FileSpreadsheet className="text-green-600 size-4" />
                  xlsx, xls, csv, txt supported
                </div>
              </label>
            </div>
            <button
              type="submit"
              className={`flex w-full gap-1 items-center justify-center p-1.5 text-white bg-blue-600 rounded-xl text-xs mt-3`}
              disabled={createStatus === "pending"}
            >
              <Plus /> Create Room
            </button>
          </form>
        </div>
        {/* All Rooms */}
        <div className="flex flex-col gap-1 bg-slate-900/70 w-full p-5 rounded-md border border-slate-500">
          <h1 className="uppercase font-semibold text-slate-300">
            Room directory ({rooms?.length})
          </h1>
          <p className="text-slate-400 text-xs mb-3">
            Your current room managing
          </p>
          <div className="flex flex-col gap-3">
            {rooms?.map((r) => (
              <div
                key={r.id}
                className={`flex border ${currentRoom === r ? "border-blue-600 bg-slate-950/70" : "border-slate-600"} rounded-xl p-3 text-xs text-slate-400 justify-between`}
                onClick={() => handleSelectRoom(r)}
              >
                <div className="flex flex-col w-1/2">
                  <h2
                    className={`text-sm ${currentRoom === r ? "text-blue-400 font-bold" : "text-white"} w-full line-clamp-1`}
                  >
                    {r.name}
                  </h2>
                  <p>
                    Created At: {new Date(r.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-6 items-center w-1/2 justify-end">
                  <div
                    className={`flex gap-1 items-center border border-slate-600 rounded-md p-1 bg-slate-800 ${PercentNumberToColor(r.members.length, r?.allowMembersEmail ? r.allowMembersEmail.length : 0)}`}
                  >
                    <Users className="size-4" />
                    {r.members.length} /{" "}
                    {r?.allowMembersEmail ? r.allowMembersEmail.length : 0}
                  </div>
                  <div className="flex gap-1 items-center border border-slate-600 rounded-md p-1 bg-slate-800">
                    <QrCode className="size-4" />
                    {r.qrCodes.length}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Detail Room */}
      {detail && currentRoom && (
        <div className="text-xs mt-5 border p-5 border-slate-400 rounded-md bg-slate-900/40">
          <div className="flex flex-col gap-1">
            <h2 className="flex items-center gap-1 text-blue-400 bg-blue-900/70 borer border-blue-600 uppercase w-fit py-1 px-2 rounded-full font-semibold">
              <DoorOpen className="size-4" /> Room Space
            </h2>
            <p className="text-slate-400 text-xs">View detail specific room</p>
            <h1 className="text-xl text-white font-semibold">
              {currentRoom?.name}
            </h1>
            <h4 className="flex gap-2 items-center text-slate-400">
              <Calendar className="size-4" /> Created on:{" "}
              {new Date(currentRoom?.createdAt).toLocaleString()}
            </h4>
          </div>
          <button className="flex items-center gap-2 mt-4 w-fit px-4 py-1 bg-red-700/40 text-red-400 rounded-lg border border-red-400">
            <Trash className="size-4" /> Demolish Room
          </button>
          <hr className="my-4" />
        </div>
      )}
    </div>
  );
};

export default RoomManagement;
