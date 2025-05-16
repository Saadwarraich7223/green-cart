import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const AllProducts = () => {
  const { products, searchQuery } = useAppContext();

  // Filter categories for the filter buttons
  const categories =
    products && products.length > 0
      ? [...new Set(products.filter((p) => p.inStock).map((p) => p.category))]
      : [];

  // Currently selected category (null means all)
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!products) return;
    if (!searchQuery && selectedCategory === null) {
      const allInStock = products.filter((p) => p.inStock);
      setFilteredProducts(allInStock);
      return;
    }

    const filtered = products.filter((product) => {
      const matchesCategory =
        selectedCategory === null || product.category === selectedCategory;

      const matchesSearch = searchQuery
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      return product.inStock && matchesCategory && matchesSearch;
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 1, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const categoryButtonVariants = {
    inactive: { scale: 1 },
    active: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
    hover: {
      scale: 1.03,

      transition: { duration: 0.2 },
    },
    tap: { scale: 0.98 },
  };

  return (
    <motion.div
      className="mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="grid grid-rows-1  gap-10  justify-between w-full mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2 className="text-2xl text-gray-800/80  pb-2 md:text-3xl font-bold mt-1 relative inline-block">
          All Products By Categories
          <motion.span
            className="absolute -bottom-1 left-0 h-1 bg-primary rounded"
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </motion.h2>

        <motion.div
          className="flex  gap-2 no-scrollbar overflow-x-scroll  hide-scrollbar pb-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            className={`px-3 py-1 text-sm rounded-full border  border-gray-300 whitespace-nowrap ${
              selectedCategory === null
                ? "bg-primary "
                : "bg-white text-gray-600 border-gray-300"
            }`}
            variants={categoryButtonVariants}
            animate={selectedCategory === null ? "active" : "inactive"}
            // whileHover="hover"
            whileTap="tap"
            onClick={() => setSelectedCategory(null)}
          >
            All Items
          </motion.button>

          {categories.slice(0, 4).map((category) => (
            <motion.button
              key={category}
              className={`px-3 py-1 text-sm rounded-full border  border-gray-300 whitespace-nowrap ${
                selectedCategory === category ? "bg-primary" : "bg-white"
              }`}
              variants={categoryButtonVariants}
              animate={selectedCategory === category ? "active" : "inactive"}
              // whileHover="hover"
              whileTap="tap"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {!products || products.length === 0 ? (
        <motion.div
          className="w-full flex justify-center items-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex flex-col items-center"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
            }}
          >
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-gray-500 font-medium">Loading products...</p>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-2 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {showAllProducts
            ? filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id || index}
                  variants={itemVariants}
                  className="w-full"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))
            : filteredProducts.slice(0, 10).map((product, index) => (
                <motion.div
                  key={product._id || index}
                  variants={itemVariants}
                  className="w-full"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
        </motion.div>
      )}

      {filteredProducts && filteredProducts.length > 0 && (
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.button
            onClick={() => {
              setShowAllProducts((prev) => !prev);
              showAllProducts &&
                window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="px-6 py-2 text-white mt-4 hover:bg-primary-dull cursor-pointer bg-primary rounded-full font-medium"
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{ scale: 0.98 }}
          >
            {showAllProducts ? "View Less Products" : "View All Products"}
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AllProducts;
