import { DetailAccount } from "../../types/SampleDetails";

const CloneAccount = () => {
  return (
    <div className="flex flex-col gap-3 border border-gray-400 p-6 bg-blue-950/20 rounded-xl">
      <h1 className="uppercase font-bold">⚡ One-Click Sandbox Profiles</h1>
      <div className="flex flex-col gap-4">
        {DetailAccount.map((acc) => (
          <div
            key={acc.name}
            className="flex gap-4 border border-blue-900 p-3 rounded-xl hover:cursor-pointer group hover:border-blue-600 hover:bg-black"
          >
            <img
              src={acc.image}
              alt={acc.name}
              className="rounded-full size-12 object-cover group-hover:scale-110"
            />
            <div className="flex flex-col gap-2">
              <h3 className="font-black text-lg">{acc.name}</h3>
              <p
                className={`${acc.bg} ${acc.color} px-2 rounded-md w-fit h-fit uppercase font-semibold text-sm`}
              >
                {acc.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CloneAccount;
