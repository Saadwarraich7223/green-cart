import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { PackageX } from "lucide-react";
import toast from "react-hot-toast";

const Orders = () => {
  const { currency, axios, isSeller } = useAppContext();
  const [status, setStatus] = useState("Order Placed");

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeHandler = async (e, id) => {
    try {
      const status = e.target.value;
      const { data } = await axios.post("/api/order/status", {
        status: status,
        id,
      });

      if (data.success) {
        fetchOrders();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isSeller) {
      fetchOrders();
    }
  }, [isSeller]);

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll ">
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row  md:items-center gap-5 p-5 max-w-4xl rounded-md border justify-between border-gray-300 "
            >
              <div className="flex gap-5 max-w-80">
                <img
                  className="w-12 h-12 object-cover "
                  src={assets.box_icon}
                  alt="boxIcon"
                />
                <div>
                  {order.items.map((item, index) => (
                    <div key={index} className="flex flex-col ">
                      <p className="font-medium">
                        {item.product.name}{" "}
                        <span className="text-primary ">x {item.quantity}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-sm md:text-base text-black/60">
                <p className="text-black/80">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p>
                  {order.address.street}, {order.address.city}
                </p>
                <p>
                  {order.address.state},{order.address.zipcode},{" "}
                  {order.address.country}
                </p>
                <p></p>
                <p>{order.address.phone}</p>
              </div>

              <p className="font-medium text-lg my-auto">
                {currency}
                {order.amount}
              </p>

              <div className="flex flex-col text-sm md:text-base text-black/60">
                <p>Method: {order.paymentType}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Payment: {order.isPayed ? "Paid" : "Not Paid"}</p>
                <select
                  onChange={(e) => onChangeHandler(e, order._id)}
                  value={order.status}
                  className="text-primary-dull w-full py-2.5 px-2 border border-gray-500/30 rounded  outline-none bg-primary/20  transition "
                  name=""
                  id=""
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Being Delivered">Being Delivered</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
            <PackageX className="w-20 h-20 text-gray-400 mb-6" />{" "}
            {/* or <Inbox /> */}
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              No Orders Yet
            </h2>
            <p className="text-gray-500">
              You haven’t received any orders. Once you do, they’ll show up
              here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
