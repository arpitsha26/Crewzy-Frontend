import React from "react";
import { GoHomeFill } from "react-icons/go";
import { FiSearch, FiPlus } from "react-icons/fi";
import { RxVideo } from "react-icons/rx";
import dp from "../assets/dp.webp";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = useSelector((state) => state.user);

  const navItem = (path, Icon) => {
    const active = location.pathname === path;

    return (
      <motion.button
        type="button"
        aria-label={path === "/" ? "Home" : path.slice(1)}
        whileTap={{ scale: 0.85 }}
        whileHover={{ scale: 1.15 }}
        onClick={() => navigate(path)}
        className={`cursor-pointer transition ${
          active ? "text-blue-500" : "text-white"
        }`}
      >
        <Icon className="w-[26px] h-[26px]" />
      </motion.button>
    );
  };

  return (
    <nav aria-label="Primary navigation" className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[92%] lg:w-[38%] h-[70px]
    bg-[#111318]/90 backdrop-blur-xl border border-white/10
    flex justify-around items-center rounded-full shadow-2xl shadow-black/40 z-[100] px-3">

      {navItem("/", GoHomeFill)}

      {navItem("/search", FiSearch)}

      
      <motion.button
        type="button"
        aria-label="Create"
        whileTap={{ scale: 0.8 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => navigate("/upload")}
        className="w-[55px] h-[55px] flex items-center justify-center rounded-full 
        bg-gradient-to-tr from-blue-500 to-purple-500 shadow-lg cursor-pointer"
      >
        <FiPlus className="text-white w-[28px] h-[28px]" />
      </motion.button>

      {navItem("/loops", RxVideo)}

   
      <motion.button
        type="button"
        aria-label="Profile"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-[38px] h-[38px] rounded-full overflow-hidden 
        border-2 border-white cursor-pointer"
        onClick={() => navigate(`/profile/${userData.userName}`)}
      >
        <img
          src={userData.profileImage || dp}
          alt=""
          className="w-full h-full object-cover"
        />
      </motion.button>
    </nav>
  );
}

export default Nav;