import { Eye, EyeClosed, Key, Mail, User } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, register } from "../../feature/AuthThunk";
import type { AppDispatch } from "../../store";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div
      className="flex flex-col border border-gray-400 rounded-xl bg-blue-950/20"
      id="auth"
    >
      <div className="flex justify-between w-full text-sm hover:cursor-pointer border-b border-b-gray-700">
        <button
          className={`${isLogin ? "bg-blue-950/50 font-bold p-2 text-blue-300 border-b-2 border-b-blue-500" : "text-gray-400"} w-1/2 rounded-tl-xl`}
          onClick={() => setIsLogin(true)}
        >
          Sign in to account
        </button>
        <button
          className={`${!isLogin ? "bg-blue-950/50 font-bold p-2 text-blue-300 border-b-2 border-b-blue-500" : "text-gray-400"} w-1/2 rounded-tr-xl`}
          onClick={() => setIsLogin(false)}
        >
          Register new account
        </button>
      </div>
      <div className="p-5">{isLogin ? <LoginPage /> : <RegisterPage />}</div>
      <hr className="text-blue-800/80" />
      <p
        className="p-5 text-center text-blue-300 font-medium text-sm hover:cursor-default hover:underline"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin
          ? "Don't hold an account? Create a free sandbox identity here"
          : "Already registered in this applet? Tap here to sign in"}
      </p>
    </div>
  );
};

export default AuthPage;

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const submitHandling = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({ email: "", password: "" });
    await dispatch(login(formData));
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-bold">Welcome Back!</h1>
      <p className="text-gray-400 mb-5">
        Access your role-based academic dashboard and verify checks.
      </p>
      <form className="flex flex-col gap-5" onSubmit={submitHandling}>
        <div className="flex flex-col gap-2">
          <label className="text-gray-500 font-semibold">
            Email address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute top-2 left-2 text-gray-300" />
            <input
              type="email"
              className="w-full bg-black border border-gray-400 rounded-md p-2 indent-8 text-gray-400 focus:outline-none focus:border-blue-300"
              placeholder="abcd@gmail.com"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-500 font-semibold">
            Secure Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Key className="absolute top-2 left-2 text-gray-300" />
            <input
              type={showPassword ? "text" : "password"}
              className="w-full bg-black border border-gray-400 rounded-md p-2 indent-8 text-gray-400 focus:outline-none focus:border-blue-300"
              placeholder="*********"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <div
              className="absolute top-2 right-2 text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeClosed /> : <Eye />}
            </div>
          </div>
        </div>
        <button className="w-full bg-blue-700 p-3 font-semibold rounded-md hover:cursor-pointer">
          Sign In to account
        </button>
      </form>
    </div>
  );
};

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submitHandling = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({ username: "", email: "", password: "" });
    await dispatch(register(formData));
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-bold">Register Institutional Profile</h1>
      <p className="text-gray-400 mb-5">
        Create a new sandbox character and customize authorization capabilities.
      </p>
      <form className="flex flex-col gap-5" onSubmit={submitHandling}>
        <div className="flex flex-col gap-2">
          <label className="text-gray-500 font-semibold">
            Username <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute top-2 left-2 text-gray-300" />
            <input
              type="text"
              className="w-full bg-black border border-gray-400 rounded-md p-2 indent-8 text-gray-400 focus:outline-none focus:border-blue-300"
              placeholder="e.g: baophuc"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-500 font-semibold">
            Email address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute top-2 left-2 text-gray-300" />
            <input
              type="email"
              className="w-full bg-black border border-gray-400 rounded-md p-2 indent-8 text-gray-400 focus:outline-none focus:border-blue-300"
              placeholder="abcd@gmail.com"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-500 font-semibold">
            Secure Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Key className="absolute top-2 left-2 text-gray-300" />
            <input
              type={showPassword ? "text" : "password"}
              className="w-full bg-black border border-gray-400 rounded-md p-2 indent-8 text-gray-400 focus:outline-none focus:border-blue-300"
              placeholder="*********"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <div
              className="absolute top-2 right-2 text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeClosed /> : <Eye />}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-700 p-3 font-semibold rounded-md hover:cursor-pointer"
        >
          Register new account
        </button>
      </form>
    </div>
  );
};
