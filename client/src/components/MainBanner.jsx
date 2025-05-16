import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MainBanner = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set loaded state after a small delay to ensure smooth animation sequence
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0.3 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  };

  // Particle animation for the shine effect
  const ShineEffect = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-white/30 blur-sm"
            initial={{
              x: Math.random() * 100 - 50 + "%",
              y: Math.random() * 100 - 50 + "%",
              scale: 0,
              opacity: 0,
            }}
            animate={{
              x: [
                Math.random() * 100 - 50 + "%",
                Math.random() * 100 - 50 + "%",
              ],
              y: [
                Math.random() * 100 - 50 + "%",
                Math.random() * 100 - 50 + "%",
              ],
              scale: [0, Math.random() * 1.5 + 0.5, 0],
              opacity: [0, Math.random() * 0.7 + 0.3, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 7,
              repeat: Infinity,
              repeatType: "loop",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-primary/5 mix-blend-overlay z-10"></div>

      {/* Shine effect */}
      <ShineEffect />

      {/* Background images with animation */}
      <motion.div
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={imageVariants}
        className="relative"
      >
        <motion.img
          src={assets.main_banner_bg}
          alt="banner"
          className="w-full hidden md:block rounded-lg object-cover h-[370px] lg:h-[400px]"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8 }}
        />
        <motion.img
          src={assets.main_banner_bg_sm}
          alt="banner"
          className="w-full md:hidden  rounded-xl  object-cover h-[550px]"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>

      {/* Content overlay */}
      <motion.div
        className="absolute inset-0 z-20 flex flex-col items-center md:items-start justify-end md:justify-center pb-14 md:pb-0 px-4 md:pl-18 lg:pl-24"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {/* Animated decorative shape */}
        <motion.div
          className="absolute top-1/4 md:top-1/3 right-1/4 md:right-1/3 w-32 h-32 md:w-48 md:h-48 rounded-full bg-primary/10 blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.div className="relative" variants={itemVariants}>
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15 text-gray-800 drop-shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.span
              className="block mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Freshness You
            </motion.span>
            <motion.span
              className="block relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <span className="relative">
                Can Trust,
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-1 bg-primary rounded"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                />
              </span>
            </motion.span>
            <motion.span
              className="block text-primary mt-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Savings You Will Love!
            </motion.span>
          </motion.h1>

          <motion.div
            className="flex flex-col md:flex-row items-center mt-8 md:mt-10 font-medium gap-4"
            variants={itemVariants}
          >
            <Link to="/products">
              <motion.button
                className="group flex items-center gap-2 px-8 md:px-10 py-3 bg-primary hover:bg-primary-dull rounded-full transition text-white cursor-pointer shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Shop Now
                <motion.img
                  className="transition"
                  src={assets.white_arrow_icon}
                  alt="arrow"
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                />
              </motion.button>
            </Link>

            <Link to="/products" className="hidden md:block">
              <motion.button
                className="group flex items-center gap-2 px-8 py-3 cursor-pointer relative overflow-hidden border border-transparent hover:border-gray-200 rounded-full transition-all hover:bg-white/70 hover:shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span>Explore Deals</span>
                <motion.img
                  className="transition"
                  src={assets.black_arrow_icon}
                  alt="arrow"
                  whileHover={{ x: 5 }}
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 bg-primary"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating badge */}
        <motion.div
          className="absolute top-1/4 right-10 md:right-24 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hidden md:flex items-center gap-2"
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ y: -5 }}
          transition={{ delay: 1, duration: 0.6, type: "spring" }}
        >
          <span className="text-primary text-lg font-bold">30% OFF</span>
          <span className="text-sm text-gray-700">on first order</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MainBanner;
