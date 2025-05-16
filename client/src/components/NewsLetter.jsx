import React, { useState } from "react";
import { motion } from "framer-motion";

const NewsLetter = () => {
  return (
    <motion.div
      className="flex flex-col mt-24  items-center justify-center text-center space-y-4 px-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <motion.h1
          className="md:text-4xl text-2xl font-semibold relative inline-block pb-2"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Never Miss a Deal!
          <motion.span
            className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
          />
        </motion.h1>
      </motion.div>

      <motion.p
        className="md:text-lg text-gray-600 max-w-xl pb-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
      >
        Subscribe to get the latest offers, new arrivals, and exclusive
        discounts
      </motion.p>

      <motion.form
        className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12 "
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <input
          className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          type="text"
          placeholder="Enter your email id"
          required
        />

        <motion.button
          type="submit"
          className="md:px-12 px-8 h-full text-white bg-primary rounded-md rounded-l-none font-medium hover:bg-primary-dull"
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          <motion.span
            initial={{ opacity: 1 }}
            whileHover={{
              x: [0, 5, 0],
              transition: {
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1,
              },
            }}
          >
            Subscribe
          </motion.span>
        </motion.button>
      </motion.form>

      <motion.p
        className="text-xs text-gray-500 pt-2 max-w-md"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.7 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        viewport={{ once: true }}
      >
        By subscribing, you agree to our privacy policy and consent to receive
        marketing communications.
      </motion.p>
    </motion.div>
  );
};

export default NewsLetter;
