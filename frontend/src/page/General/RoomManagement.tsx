import { DoorOpen, Plus, Users } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import { getAllRooms, getRoomDetails } from "../../feature/RoomThunk";

const RoomManagement = () => {
  const { rooms, detail, status } = useSelector(
    (state: RootState) => state.room,
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const load = async () => {
      const result = await dispatch(getAllRooms()).unwrap();

      if (result.length > 0) {
        dispatch(getRoomDetails(result[0].id));
      }
    };

    load();
  }, []);

  console.log(rooms);
  console.log(detail);

  if (!rooms) return "Rooms are null";

  return (
    <div className="w-full min-h-screen flex flex-col p-3 text-white">
      <div className="flex flex-col w-full">
        {/* Create room */}
        <div className="bg-slate-700/70 w-full p-2 rounded-md border border-slate-500">
          <h1 className="flex items-center gap-2 uppercase font-semibold text-slate-300">
            <DoorOpen className="text-blue-500" /> Create new room
          </h1>
          <form className="flex flex-col gap-2 text-sm font-bold mt-3">
            <label>Room Name</label>
            <input
              type="text"
              className="w-full bg-black border border-gray-400 rounded-md p-3 text-white focus:outline-none focus:border-blue-300 text-xs"
              placeholder="Roll Call Network Class #1"
            />
            <button
              type="submit"
              className="flex w-full gap-1 items-center justify-center p-1.5 text-white bg-blue-600 rounded-xl text-xs"
            >
              <Plus /> Create Room
            </button>
          </form>
        </div>
        {/* All Rooms */}
        <div className="flex flex-col gap-2">
          <h1 className="uppercase">Room directory {rooms?.length}</h1>
          <div className="flex flex-col gap-1">
            {rooms.map((r) => (
              <div key={r.id} className="flex justify-between items-center">
                <div className="flex flex-col items-center">
                  <h2>{r.name}</h2>
                  <p>Created: {new Date(r.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="flex gap-1 items-center">
                    <Users />
                    {r.allowMembersEmail.length}
                  </div>
                  <div>{r.qrCodes.length}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Detail Room */}
      <div></div>
    </div>
  );
};

export default RoomManagement;
