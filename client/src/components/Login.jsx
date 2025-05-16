import React from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Login = () => {
  const { setShowUserLogin, setUser, axios, navigate } = useAppContext();

  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });

      if (data.success) {
        navigate("/");
        toast.success(data.message);
        setUser(data.user);
        setShowUserLogin(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex z-99 items-center text-sm text-gray-600 bg-black/50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 m-auto  items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg relative shadow-xl border border-gray-200 bg-white"
      >
        <span
          onClick={() => setShowUserLogin(false)}
          className="absolute top-3 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-all  cursor-pointer right-3  font-bold"
        >
          X
        </span>
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>
        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              type="text"
              required
            />
          </div>
        )}
        <div className="w-full ">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="email"
            required
          />
        </div>
        <div className="w-full ">
          <p>Password</p>
          <div
            className="border relative w-full border-none
           "
          >
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="type here"
              className=" outline-primary border border-gray-200 rounded  w-full h-full p-2 mt-1"
              type={showPassword ? "text" : "password"}
              required
            />
            <img
              className={`absolute right-3 transition-all top-3 w-5 h-5 cursor-pointer  ${
                showPassword ? "opacity-80" : "opacity-50"
              }`}
              src={showPassword ? assets.EyeOn : assets.EyeOff}
              onClick={() => setShowPassword(!showPassword)}
              alt=""
            />
          </div>
        </div>
        {state === "register" ? (
          <p>
            Already have account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-primary cursor-pointer"
            >
              click here
            </span>
          </p>
        ) : (
          <p>
            Create an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-primary cursor-pointer"
            >
              click here
            </span>
          </p>
        )}
        <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
