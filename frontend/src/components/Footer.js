// src/components/Footer.js
import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", duration: 0.8 }}
      style={{
        backgroundColor: "#f58320",
        color: "#121212",
        textAlign: "center",
        padding: "12px 0",
        fontSize: "14px",
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 999,
      }}
    >
      © {new Date().getFullYear()} Enerji Haritası · Tüm hakları saklıdır.
    </motion.footer>
  );
};

export default Footer;