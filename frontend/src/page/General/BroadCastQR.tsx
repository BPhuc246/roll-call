import { Play, SlidersVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LocationFilterMethod } from "../../types/SampleDetails";

interface VerifyQRCodeProps {
  data: {
    title: string;
    startTime: string;
    duration: {
      time: string;
      type: string;
    };
    locationMethod: string;
  };
  onClose: () => void;
}

const BroadCastQR = () => {
  const [openVerify, setOpenVerify] = useState(false);

  const verifyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const toggleOpen = (event: MouseEvent) => {
      if (
        verifyRef.current &&
        !verifyRef.current.contains(event.target as Node)
      ) {
        setOpenVerify(false);
      }
    };
    document.addEventListener("mousedown", toggleOpen);
    return () => document.removeEventListener("mousedown", toggleOpen);
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    startTime: "",
    duration: {
      time: "5",
      type: "minute",
    },
    locationMethod: "None",
  });

  return (
    <div className="w-full min-h-screen bg-slate-900 text-xs text-white p-3 relative">
      {openVerify && (
        <div className="absolute" ref={verifyRef}>
          <VerifyQRCode data={formData} onClose={() => setOpenVerify(false)} />
        </div>
      )}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold">QR Roll Call Broadcaster</h1>
        <p className="text-gray-400">
          Configure instant attendance bounds below and trigger live dynamic
          code.
        </p>
      </div>
      <div className="flex flex-col border rounded-md mt-3">
        <div className="flex items-center gap-2 bg-slate-800 p-2 rounded-t-md">
          <SlidersVertical className="text-blue-400" />
          <p className="text-lg font-semibold">QR Customization Panel</p>
        </div>
        <div className="flex flex-col gap-2 p-2">
          <div className="flex flex-col gap-2">
            <label className="text font-semibold uppercase tracking-wider">
              Roll Call Course Title{" "}
              <span className="text-red-600 text-lg">(*)</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
              className="w-full bg-black border border-gray-400 rounded-md p-2 text-white focus:outline-none focus:border-blue-300"
              placeholder="Roll Call Network Class #1"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text font-semibold uppercase tracking-wider">
              Set Time stamp
            </label>
            <div className="flex justify-between gap-2 w-full">
              <div className="flex flex-col gap-2 w-1/2">
                <p className="font-semibold">Start Time</p>
                <input
                  type="datetime-local"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      startTime: e.target.value,
                    })
                  }
                  className="bg-white text-black rounded-md p-1.5 w-full"
                />
              </div>
              <div className="flex flex-col gap-2 w-1/2">
                <span className="relative font-semibold">
                  Duration
                  <span className="text-red-600 text-lg absolute -top-2 left-13">
                    (*)
                  </span>
                </span>
                <div className="flex items-center gap-2 text-black">
                  <select
                    className="bg-white w-1/3 p-1 rounded-md"
                    value={formData.duration.time}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        duration: {
                          ...formData.duration,
                          time: e.target.value,
                        },
                      })
                    }
                  >
                    <option value="1">1</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="30">30</option>
                  </select>
                  <select
                    className="bg-white w-2/3 p-1 rounded-md"
                    value={formData.duration.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        duration: {
                          ...formData.duration,
                          type: e.target.value,
                        },
                      })
                    }
                  >
                    <option value="second">second</option>
                    <option value="minute">minute</option>
                    <option value="hour">hour</option>
                  </select>
                </div>
              </div>
            </div>
            <p className="flex gap-1">
              Expires and self-locks automatically when limits expire.{" "}
              <p className="text-red-400">
                {formData.duration.time} {formData.duration.type}s
              </p>
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text font-semibold uppercase tracking-wider">
              Location Verification Filter
            </label>
            <div className="grid grid-cols-2 gap-3">
              {LocationFilterMethod.map((item) => (
                <div
                  className={`border rounded-md p-2 flex flex-col gap-3 ${formData.locationMethod === item.name && "text-white bg-blue-600"}`}
                  key={item.name}
                  onClick={() =>
                    setFormData({ ...formData, locationMethod: item.name })
                  }
                >
                  <item.icon
                    className={`${formData.locationMethod === item.name ? "text-white" : item.color}`}
                  />
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          </div>
          <button
            className="flex items-center gap-2 w-full justify-center p-2 mt-5 bg-blue-600/90 rounded-md"
            onClick={() => setOpenVerify(true)}
          >
            <Play />
            <p className="font-semibold text-sm">Generate QR Code</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BroadCastQR;

const VerifyQRCode = ({ data, onClose }: VerifyQRCodeProps) => {
  return (
    <form
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 w-full"
      onClick={onClose}
    >
      <div
        className="w-[80%] rounded-xl bg-slate-900 border border-slate-700 p-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-xl font-bold">Verify QR Configuration</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-slate-400">Course Title</p>
            <p>{data.title}</p>
          </div>

          <div>
            <p className="text-slate-400">Start Time</p>
            <p>
              {data?.startTime
                ? new Date(data.startTime).toLocaleString()
                : new Date().toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-slate-400">Duration</p>
            <p>
              {data.duration.time} {data.duration.type}
            </p>
          </div>

          <div>
            <p className="text-slate-400">Location Verification</p>
            <p>{data.locationMethod}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-md bg-slate-700 px-4 py-2"
          >
            Cancel
          </button>

          <button className="rounded-md bg-blue-600 px-4 py-2">
            Confirm & Generate
          </button>
        </div>
      </div>
    </form>
  );
};
