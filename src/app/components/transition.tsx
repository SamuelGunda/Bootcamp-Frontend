"use client";

import { motion } from "framer-motion";
import React from "react";

export default function Transition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.1 }}
    >
      {children}
    </motion.div>
  );
}
