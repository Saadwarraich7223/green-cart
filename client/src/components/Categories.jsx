import React, { useState } from "react";
import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const Categories = () => {
  const { navigate } = useAppContext();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="mt-16 px-4 md:px-0"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.div
        className="flex items-center justify-between mb-8"
        variants={titleVariants}
      >
        <div>
          <motion.h2 className="text-2xl pb-2 md:text-3xl font-bold mt-1 relative inline-block">
            Shop By Categories
            <motion.span
              className="absolute -bottom-1 left-0 h-1 bg-primary rounded"
              initial={{ width: 0 }}
              animate={{ width: "80%" }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            />
          </motion.h2>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 md:gap-6"
        variants={containerVariants}
      >
        {categories.map((category, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{
              y: -8,
              transition: { type: "spring", stiffness: 300, damping: 10 },
            }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            onClick={() => {
              navigate(`products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
            className="relative overflow-hidden cursor-pointer group"
          >
            <motion.div
              className="relative z-10 flex flex-col items-center h-full pt-6 pb-4 px-3 rounded-2xl transition-all"
              style={{
                backgroundColor: category.bgColor,
                boxShadow:
                  hoveredIndex === index
                    ? `0 10px 25px -5px ${category.bgColor}80`
                    : "none",
              }}
              animate={{
                backgroundColor:
                  hoveredIndex === index
                    ? category.bgColor
                    : category.bgColor + "90",
              }}
            >
              {/* Decorative elements */}
              <motion.div
                className="absolute right-2 top-2 w-8 h-8 rounded-full opacity-30"
                style={{ backgroundColor: category.bgColor + "80" }}
                animate={{
                  scale: hoveredIndex === index ? [1, 1.5, 1] : 1,
                  opacity: hoveredIndex === index ? [0.3, 0.6, 0.3] : 0.3,
                }}
                transition={{
                  duration: 2,
                  repeat: hoveredIndex === index ? Infinity : 0,
                }}
              />

              <motion.div
                className="absolute left-2 bottom-8 w-4 h-4 rounded-full opacity-40"
                style={{ backgroundColor: category.bgColor + "60" }}
                animate={{
                  scale: hoveredIndex === index ? [1, 1.8, 1] : 1,
                  opacity: hoveredIndex === index ? [0.4, 0.7, 0.4] : 0.4,
                }}
                transition={{
                  duration: 2,
                  delay: 0.3,
                  repeat: hoveredIndex === index ? Infinity : 0,
                }}
              />

              {/* Image with animation */}
              <motion.div
                className="relative mb-3 h-24 flex items-center justify-center"
                animate={{
                  y: hoveredIndex === index ? [0, -5, 0] : 0,
                }}
                transition={{
                  duration: 2,
                }}
              >
                <motion.img
                  src={category.image}
                  alt={category.text}
                  className="max-w-24 max-h-24 object-contain"
                  whileHover={{ scale: 1.35, rotate: [0, -5, 5, -5, 0] }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>

              {/* Text with styling */}
              <motion.div
                className="relative mt-auto mb-4 text-center w-full"
                animate={{ y: hoveredIndex === index ? -3 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.p
                  className="text-sm font-bold transition-all"
                  animate={{
                    scale: hoveredIndex === index ? 1.05 : 1,
                  }}
                >
                  {category.text}
                </motion.p>
              </motion.div>

              {/* View button that appears on hover */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-primary/10 py-2 text-xs text-center text-primary font-medium"
                initial={{ y: 30, opacity: 0 }}
                animate={{
                  y: hoveredIndex === index ? 0 : 30,
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                View Products
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Categories;
