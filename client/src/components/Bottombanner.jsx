import React from "react";
import { assets, features } from "../assets/assets";
import { motion } from "framer-motion";

const Bottombanner = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="relative mt-24 overflow-hidden  rounded-lg shadow-md"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <motion.img
        src={assets.bottom_banner_image}
        className="w-full hidden md:block object-cover"
        variants={imageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
      <motion.img
        src={assets.bottom_banner_image_sm}
        className="w-full block md:hidden object-cover"
        variants={imageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />

      <div className="inset-0 absolute flex flex-col items-center md:items-end md:justify-center pt-0  sm:pt-24 md:pt-0 md:pr-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="bg-white/85 backdrop-blur-sm p-6 rounded-lg md:max-w-md"
        >
          <motion.h1
            className="text-2xl md:text-3xl font-semibold text-primary mb-6 relative inline-block"
            variants={itemVariants}
          >
            Why We Are the Best?
            <motion.span
              className="absolute -bottom-2 left-0 h-1 bg-primary rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
            />
          </motion.h1>

          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex gap-4 mt-4 items-start group"
              variants={itemVariants}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="p-2 bg-primary/10 rounded-full flex items-center justify-center"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(var(--color-primary-rgb), 0.2)",
                }}
              >
                <motion.img
                  src={feature.icon}
                  alt={feature.title}
                  className="md:w-8 w-7"
                  whileHover={{ rotate: 5 }}
                />
              </motion.div>

              <div className="">
                <motion.h3 className="text-lg md:text-xl font-semibold group-hover:text-primary transition-colors duration-200">
                  {feature.title}
                </motion.h3>
                <motion.p
                  className="text-gray-600 text-xs md:text-sm"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                >
                  {feature.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Bottombanner;
