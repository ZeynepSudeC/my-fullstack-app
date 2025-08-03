import React from "react";
import { Button } from "antd";
import { motion } from "framer-motion";
import "./Navbar.css";
import {HomeOutlined, InfoCircleOutlined} from "@ant-design/icons";

const Navbar = ({ onFilterClick }) => {
  return (
    <motion.div
      className="navbar"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <span className="logo-text">
  <img
    src="/icons/solutions.png"
    alt="logo"
    style={{ width: 64, height: 64, marginRight: 8, verticalAlign: "middle" }}
  />
  𝐏𝐞𝐫𝐟𝐞𝐜𝐭 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧𝐬
</span>
{/* Sağda Butonlar */}
      <div className="navbar-right">
        <motion.button
          className="nav-btn"
          whileHover={{ scale: 1.1, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
        >
          <HomeOutlined style={{ marginRight: 6 }} />
          Ana Sayfa
        </motion.button>

        <motion.button
          className="nav-btn"
          whileHover={{ scale: 1.1, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <InfoCircleOutlined style={{ marginRight: 6 }} />
          Hakkımızda
        </motion.button>
      </div>


    </motion.div>
  );
};

export default Navbar;