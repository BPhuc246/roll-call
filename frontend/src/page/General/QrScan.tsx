import QRCode from "react-qr-code";
import { Copy, Download } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

const QrScan = () => {
  const { currentQr } = useSelector((state: RootState) => state.qr);
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const qrValue = `${window.location.origin}/qr/scan?token=${token}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(qrValue);
  };

  console.log(currentQr);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 text-black">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border p-8 flex flex-col items-center gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Attendance QR Code</h1>

          <p className="text-slate-500 mt-2">Scan this QR code to check in</p>
        </div>

        <div className="bg-white p-4 rounded-xl border">
          <QRCode value={qrValue} size={280} />
        </div>

        {currentQr?.code && (
          <div className="flex flex-col items-center">
            <span className="text-sm text-red-500">Attendance Code</span>

            <div className="text-4xl font-bold tracking-[0.5rem] text-black">
              {currentQr?.code}
            </div>
          </div>
        )}

        <div className="w-full bg-slate-50 border rounded-lg p-3 text-center break-all text-sm">
          {qrValue}
        </div>

        <div className="flex gap-3 w-full">
          <button
            onClick={copyLink}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700 transition"
          >
            <Copy size={18} />
            Copy Link
          </button>

          <button className="flex-1 flex items-center justify-center gap-2 border rounded-lg py-3 hover:bg-slate-50 transition">
            <Download size={18} />
            Download
          </button>
        </div>

        <div className="text-xs text-slate-400 text-center">
          Students can scan the QR code or enter the attendance code manually.
        </div>
      </div>
    </div>
  );
};

export default QrScan;
