import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className="w-full py-2.5 px-2 border border-gray-500/30 rounded  outline-none focus:border-primary text-gray-500 transition "
    type={type}
    placeholder={placeholder}
    name={name}
    onChange={handleChange}
    value={address[name]}
    id=""
    required
  />
);

const AddAddress = () => {
  const { axios, user, navigate } = useAppContext();

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const { data } = await axios.post("/api/address/add", {
        address,
      });

      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/cart");
    }
  }, []);

  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add Shipping <span className="font-semibold text-primary">Address</span>
      </p>
      <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
        <div className="flex-1 max-w-md">
          <form onSubmit={handleSubmit} className="space-y-3 mt-6 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                type="text"
                placeholder="First Name"
                name="firstName"
                address={address}
              />
              <InputField
                handleChange={handleChange}
                type="text"
                placeholder="Last Name"
                name="lastName"
                address={address}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <InputField
                handleChange={handleChange}
                type="email"
                placeholder="Email"
                name="email"
                address={address}
              />
              <InputField
                handleChange={handleChange}
                type="text"
                placeholder="Street"
                name="street"
                address={address}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                type="text"
                placeholder="City"
                name="city"
                address={address}
              />
              <InputField
                handleChange={handleChange}
                type="text"
                placeholder="State"
                name="state"
                address={address}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                type="number"
                placeholder="Zip Code"
                name="zipcode"
                address={address}
              />
              <InputField
                handleChange={handleChange}
                type="text"
                placeholder="Country"
                name="country"
                address={address}
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <InputField
                handleChange={handleChange}
                type="text"
                placeholder="Phone"
                name="phone"
                address={address}
              />
              <button className="w-full py-2.5 px-2 text-lg font-semibold rounded bg-primary text-white outline-none transition">
                Save Address
              </button>
            </div>
          </form>
        </div>
        <img
          src={assets.add_address_iamge}
          alt=""
          className="md:mr-16 mb-16 md:mt-0"
        />
      </div>
    </div>
  );
};

export default AddAddress;
