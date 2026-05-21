import { FeatureDeatisl } from "../../types/SampleDetails";
import AuthPage from "./AuthPage";
import CloneAccount from "./CloneAccount";

const FeaturePage = () => {
  return (
    <div className="flex md:flex-row flex-col p-5 gap-5">
      <div className="flex flex-col gap-5">
        <FeatureDetailPage />
        <CloneAccount />
      </div>
      <AuthPage />
    </div>
  );
};

export default FeaturePage;

const FeatureDetailPage = () => {
  return (
    <div className="flex flex-col gap-2 p-6 border border-gray-400 rounded-xl bg-blue-950/20">
      <h1 className="font-extrabold text-xl">Secure Institutional Portal</h1>
      <p className="text-gray-400">
        Verify your attendance registry with cryptographically secure,
        geolocalized QR credentials matching active course boundaries.
      </p>
      <hr className="text-gray-500" />
      <div className="flex flex-col gap-5 mt-5">
        {FeatureDeatisl.map((detail) => (
          <div key={detail.title} className="flex gap-2">
            <div
              className={`${detail.bg} ${detail.border} border w-fit h-fit p-1 rounded-xl`}
            >
              <detail.icon className={` ${detail.color}`} />
            </div>

            <div>
              <h2 className="font-bold">{detail.title}</h2>
              <p className="text-gray-400">{detail.des}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 border border-blue-900 bg-black p-3 rounded-xl">
        <h1 className="font-bold uppercase text-lg text-blue-400">💡 Instructor & Evaluator Sandbox</h1>
        <p className="text-gray-400">Instead of manually filling credentials, utilize the one-tap accounts below to instantly hot-swap between multiple student/administrator levels to assess permission-based UI rendering.</p>
      </div>
    </div>
  );
};
