import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLogin = () => {
  const { isSeller, setIsSeller, axios, navigate } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const { data } = await axios.post("/api/seller/login", {
        email,
        password,
      });

      if (data.success) {
        setIsSeller(true);
        toast.success(data.message);

        navigate("/seller");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);

  return (
    <div>
      {!isSeller && (
        <form
          onSubmit={onSubmitHandler}
          className="min-h-screen flex items-center text-sm
  text-gray-600"
        >
          <div className="flex flex-col gap-8 m-auto  items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg  shadow-xl border border-gray-200">
            <p className="text-2xl font-medium m-auto ">
              <span className="text-primary">Seller</span>Login
            </p>
            <div className="w-full">
              <p>Email</p>
              <input
                type="email"
                name=""
                id="email"
                value={email}
                placeholder="enter your email"
                required
                className="border px-2 py-2 border-gray-200 rounded w-full pt-2 mt-1 outline-primary"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full">
              <p>Password</p>
              <input
                type="password"
                name=""
                id="password"
                value={password}
                placeholder="enter your password"
                required
                className="border px-2 py-2 border-gray-200 rounded w-full pt-2 mt-1 outline-primary"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="bg-primary text-white w-full  py-3 rounded-md cursor-pointer ">
              Login
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SellerLogin;
