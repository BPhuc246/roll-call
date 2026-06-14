import { useState } from "react";
import { KeyRound } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { scanQrCode } from "../../feature/QRThunk";

const CheckCode = () => {
  const { scanStatus } = useSelector((state: RootState) => state.qr);
  const disptach = useDispatch<AppDispatch>();
  const [code, setCode] = useState("");

  const handleSubmit = async () => {
    disptach(scanQrCode(code));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 text-black">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border p-8">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-blue-100 p-4 rounded-full">
            <KeyRound size={32} />
          </div>

          <h1 className="text-2xl font-bold">Enter Attendance Code</h1>

          <p className="text-sm text-slate-500 text-center">
            Ask your teacher for the attendance code and enter it below.
          </p>
        </div>

        <div className="mt-8">
          <input
            type="text"
            value={code}
            maxLength={8}
            onChange={(e) =>
              setCode(e.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase())
            }
            placeholder="12345678"
            className="w-full border rounded-xl p-4 text-center text-3xl font-bold tracking-[0.5rem] outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={scanStatus === "pending"}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-medium disabled:opacity-50"
        >
          {scanStatus === "pending" ? "Checking..." : "Check In"}
        </button>

        <div className="mt-6 text-center text-sm text-slate-500">
          Can't scan the QR code? Use the attendance code provided by your
          teacher.
        </div>
      </div>
    </div>
  );
};

export default CheckCode;
