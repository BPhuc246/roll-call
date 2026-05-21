import { MousePointerClick, UserCheck } from "lucide-react";

const HeroPage = () => {
  return (
    <div className="flex md:justify-between md:flex-row flex-col bg-linear-to-tr from-slate-950 to-blue-900/40 p-5 gap-5 items-center">
        {/* Left section */}
      <div className="flex flex-col gap-5 mt-5 md:w-4/9">
        <h1 className="text-4xl md:text-5xl font-bold">
          Secure QR Roll Call <span className="bg-linear-to-r from-blue-500 to-blue-200 bg-clip-text text-transparent">Instant Geocoded</span>{" "}
          <span className="bg-linear-to-r from-purple-500 to-purple-200 bg-clip-text text-transparent">Verification</span>
        </h1>
        <p className="text-gray-400">
          Prevent proxy attendance logging. Generate rolling dynamic QR keys
          that cycle frequently. Cross-reference attendee connected SSIDs,
          public networks, and GPS coordinate radial distance automatically.
        </p>
        <div className="flex gap-2 items-center justify-between">
            <div className="flex gap-2 items-center text-gray-300">
                <UserCheck className="text-blue-400"/>
                <h4 className="text-lg">Checks registered</h4>
                <p className="font-bold">8</p>
            </div>
            <div className="flex gap-2 items-center text-gray-300">
                <MousePointerClick className="text-green-400"/>
                <h4 className="text-lg">Total used</h4>
                <p className="font-bold">18</p>
            </div>
        </div>
      </div>
        {/* Right section */}
      <div className="flex md:flex-row flex-col gap-4 h-fit md:w-1/3">
        <div className="flex flex-col gap-1 border border-gray-400 p-3 rounded-xl bg-slate-900">
            <h3 className="uppercase font-bold text-gray-500">SYSTEM INTEGRATION</h3>
            <h1 className="text-lg font-bold">Instant QR</h1>
            <p className="text-gray-400 text-sm">Coded hash verification matches mobile GPS & Wifi within sandbox.</p>
        </div>
        <div className="flex flex-col gap-1 border border-gray-400 p-3 rounded-xl bg-slate-900">
            <h3 className="uppercase font-bold text-gray-500">ROLE COMPLIANCE</h3>
            <h1 className="text-lg font-bold">RBAC Ready</h1>
            <p className="text-gray-400 text-sm">Admins manage user permissions & manually override registers.</p>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
