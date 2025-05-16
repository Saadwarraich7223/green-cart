import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const {
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
    navigate,
  } = useAppContext();

  // Animation variants
  const cardVariants = {
    hover: {
      y: -8,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 },
    },
    initial: {
      y: 0,
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.4 },
    },
    initial: {
      scale: 1,
    },
  };

  const buttonVariants = {
    tap: { scale: 0.95 },
    hover: {
      backgroundColor: "rgba(var(--color-primary-rgb), 0.2)",
      borderColor: "rgba(var(--color-primary-rgb), 0.6)",
    },
  };

  return (
    product && (
      <motion.div
        className="rounded-lg justify-self-center overflow-hidden shadow-sm border border-gray-400/30 md:px-4 px-3 py-4 bg-white sm:min-w-40   min-w-40 max-w-56 w-full"
        variants={cardVariants}
        initial="initial"
        whileHover="hover"
        onClick={() => {
          navigate(
            `/products/${product.category.toLowerCase()}/${product._id}`
          );
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <div className="cursor-pointer flex items-center justify-center px-2 mb-3 min-h-30 overflow-hidden rounded-md bg-gray-50 py-4">
          <motion.img
            variants={imageVariants}
            className="max-w-26 md:max-w-36  object-contain"
            src={product.image[0]}
            alt={product.name}
          />
        </div>
        <div className="text-gray-500/70 text-sm">
          <p className="text-xs uppercase tracking-wider font-medium">
            {product.category}
          </p>
          <motion.p className="text-gray-800 font-medium text-lg truncate w-full mt-1">
            {product.name}
          </motion.p>
          <div className="flex items-center gap-0.5 mt-2">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <motion.img
                  key={i}
                  whileHover={{ scale: 1.2 }}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt=""
                  className="w-4 h-4"
                />
              ))}
            <p className="ml-1 text-xs">({4})</p>
          </div>
          <div className="flex items-end justify-between mt-4">
            <div>
              <p className="md:text-xl text-base font-bold text-primary">
                {currency} {product.offerPrice} {""}
              </p>
              <p className="text-gray-500/60 md:text-sm text-xs line-through">
                ${product.price}
              </p>
            </div>
            <div onClick={(e) => e.stopPropagation()} className="text-primary">
              {!cartItems[product._id] ? (
                <motion.button
                  className="flex cursor-pointer items-center justify-center gap-1 bg-primary/10 border border-primary/40 md:w-[80px] w-[64px] h-[34px] rounded-full text-primary font-medium"
                  onClick={() => addToCart(product._id)}
                  whileTap="tap"
                  whileHover="hover"
                  variants={buttonVariants}
                >
                  <motion.img
                    src={assets.cart_icon}
                    alt="cartIcon"
                    className="w-4 h-4"
                    whileHover={{ rotate: 10 }}
                  />
                  Add
                </motion.button>
              ) : (
                <motion.div
                  className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/10 border border-primary/40 rounded-full select-none"
                  whileHover={{
                    backgroundColor: "rgba(var(--color-primary-rgb), 0.2)",
                  }}
                >
                  <motion.button
                    onClick={() => removeFromCart(product._id)}
                    className="cursor-pointer text-md px-2 h-full text-primary font-bold"
                    whileTap={{ scale: 0.9 }}
                  >
                    -
                  </motion.button>
                  <motion.span
                    className="w-5 text-center font-medium"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key={cartItems[product._id]}
                  >
                    {cartItems[product._id]}
                  </motion.span>
                  <motion.button
                    onClick={() => addToCart(product._id)}
                    className="cursor-pointer text-md px-2 h-full text-primary font-bold"
                    whileTap={{ scale: 0.9 }}
                  >
                    +
                  </motion.button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Sale badge - show only if there's a significant discount */}
          {product.price - product.offerPrice > 10 && (
            <motion.div
              className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              SALE
            </motion.div>
          )}
        </div>
      </motion.div>
    )
  );
};

export default ProductCard;
