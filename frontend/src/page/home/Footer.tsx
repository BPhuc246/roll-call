import { Capabilities, Policies, Support } from "../../types/SampleDetails";
import logo from "/src/assets/logo.svg";

const Footer = () => {
  return (
    <div className="flex flex-col gap-4 pb-10">
      <div className="w-full grid md:grid-cols-4 grid-cols-1 p-5">
        <div className="flex flex-col w-full gap-4">
          <div className="flex items-center w-full gap-3">
            <img src={logo} alt="Logo" className="size-15" />
            <p className="text-2xl font-black">QR Roll Call</p>
          </div>
          <p className="text-gray-400">
            Next-generation instant classroom and corporate attendance platform
            utilizing secure, expiring cryptographic QR keys, instant
            geographical cross-referencing, and flexible role administration.
          </p>
          <div className="flex items-center gap-2 px-2 rounded-xl bg-green-900/30 w-fit">
            <p className="text-green-400 animate-pulse text-3xl">󠁯•󠁏</p>
            <p className="text-green-400">Operational Status: 100% Online</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-10">
          <h1 className="uppercase font-bold text-xl tracking-wider">
            Platform Capabilities
          </h1>
          <div className="flex flex-col gap-2">
            {Capabilities.map((capa) => (
              <div
                key={capa.name}
                className="flex items-center gap-2 text-gray-400"
              >
                <capa.icon />
                <p>{capa.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-10">
          <h1 className="uppercase font-bold text-xl tracking-wider">
            Data & Privacy Policies
          </h1>
          <div className="flex flex-col gap-2">
            {Policies.map((poli) => (
              <div
                key={poli.name}
                className="flex items-center gap-2 text-gray-400"
              >
                <p>{poli.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-10">
          <h1 className="uppercase font-bold text-xl tracking-wider">
            Support & Inquiry
          </h1>
          <div className="flex flex-col gap-2">
            {Support.map((sup) => (
              <div
                key={sup.info}
                className="flex items-center gap-2 text-gray-400"
              >
                <sup.icon className="text-blue-400" />
                <p>{sup.info}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <hr className="text-gray-600" />
      <p className="text-center text-xs px-5 text-gray-400">
        Developed by nhbphuc2006@gmail.com. All sandbox privileges are
        self-persisted locally.
      </p>
    </div>
  );
};

export default Footer;
