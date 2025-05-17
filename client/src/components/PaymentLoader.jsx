import { useState, useEffect } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { useLocation } from "react-router-dom";

const PaymentLoader = () => {
  const { navigate } = useAppContext();
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const nextUrl = query.get("next");

  useEffect(() => {
    if (nextUrl) {
      setTimeout(() => {
        navigate(`/${nextUrl}`);
      }, 8000);
    }
  }, [nextUrl]);

  const [loadingStage, setLoadingStage] = useState(0);
  const stages = [
    "Processing your payment...",
    "Confirming with your bank...",
    "Almost there...",
    "Payment complete!",
  ];

  // Simulate loading stages (for demo purposes)
  useEffect(() => {
    if (loadingStage < stages.length - 1) {
      const timer = setTimeout(() => {
        setLoadingStage((prev) => prev + 1);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [loadingStage]);

  return (
    <div className="flex items-center mt-10 justify-center h-[60vh] w-full bg-gray-100">
      <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto p-8 bg-white rounded-lg shadow-lg">
        {/* Logo and title */}
        <div className="flex items-center mb-6">
          <span className="text-emerald-500">
            {loadingStage === stages.length - 1 ? (
              <Check size={32} strokeWidth={3} />
            ) : (
              <ShoppingCart size={32} />
            )}
          </span>
          <h2 className="ml-3 text-2xl font-bold text-gray-800">
            Fresh Groceries
          </h2>
        </div>

        {/* Animated loader */}
        <div className="w-full mb-6">
          {loadingStage < stages.length - 1 ? (
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-50">
                    Payment in progress
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-emerald-600">
                    {Math.round(((loadingStage + 1) / stages.length) * 100)}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-emerald-50">
                <div
                  style={{
                    width: `${((loadingStage + 1) / stages.length) * 100}%`,
                  }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500 transition-all duration-500 ease-in-out"
                ></div>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
              <div className="flex items-center justify-center">
                <span className="bg-emerald-500 rounded-full p-1">
                  <Check size={24} className="text-white" />
                </span>
                <span className="ml-2 font-medium text-emerald-700">
                  Payment successful!
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Current stage text */}
        <p className="text-gray-600 text-center mb-4">{stages[loadingStage]}</p>

        {/* Footer message */}
        <p className="text-xs text-gray-500 mt-2 text-center">
          {loadingStage === stages.length - 1
            ? "Thank you for your order! You'll receive a confirmation email shortly."
            : "Please don't close this page while we process your payment..."}
        </p>
      </div>
    </div>
  );
};

export default PaymentLoader;
