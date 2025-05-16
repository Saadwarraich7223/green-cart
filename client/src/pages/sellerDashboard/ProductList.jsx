import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";

const ProductList = () => {
  const { products, currency, axios, fetchProducts } = useAppContext();
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const deleteProduct = async (id) => {
    try {
      const { data } = await axios.post("/api/product/delete", { id });
      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post("/api/product/stock", { id, inStock });
      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedProductId(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    deleteProduct(selectedProductId);
    setShowConfirm(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex-1 no-scrollbar py-10 flex h-[95vh] overflow-y-scroll flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Product</th>
                <th className="px-4 py-3 font-semibold truncate">Category</th>
                <th className="px-4 py-3 font-semibold truncate hidden md:block">
                  Selling Price
                </th>
                <th className="px-4 py-3 font-semibold truncate">In Stock</th>
                <th className="px-4 py-3 font-semibold truncate">Delete</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {products.map((product) => (
                <tr key={product._id} className="border-t border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <div className="border border-gray-300 rounded p-2">
                      <img
                        src={product.image[0]}
                        alt="Product"
                        className="w-16"
                      />
                    </div>
                    <span className="truncate max-sm:hidden w-full">
                      {product.name}
                    </span>
                  </td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3 max-sm:hidden">
                    {currency}
                    {product.offerPrice}
                  </td>
                  <td className="px-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                      <input
                        onClick={() =>
                          toggleStock(product._id, !product.inStock)
                        }
                        checked={product.inStock}
                        type="checkbox"
                        className="sr-only peer"
                      />
                      <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                      <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                    </label>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDeleteClick(product._id)}
                      className="bg-gray-100 p-2 rounded cursor-pointer hover:bg-gray-200"
                    >
                      <img src={assets.remove_icon} alt="" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Confirmation Popup */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-80 text-center">
              <h2 className="text-xl font-semibold mb-4">Delete Product?</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this product? This action cannot
                be undone.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  onClick={confirmDelete}
                >
                  Yes, Delete
                </button>
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
