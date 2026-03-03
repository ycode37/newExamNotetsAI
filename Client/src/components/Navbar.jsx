import { AnimatePresence, motion } from "framer-motion"; // Changed to framer-motion for standard imports
import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setuserData } from "../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { HiOutlineLogout, HiOutlineClock, HiOutlinePlus } from "react-icons/hi";

const Navbar = () => {
  const { userData } = useSelector((state) => state.user);
  const credits = userData?.credits || 0;
  const [showCredit, setShowCredit] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
        headers: {
          ...(localStorage.getItem("token")
            ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
            : {}),
        },
      });
      localStorage.removeItem("token");
      dispatch(setuserData(null));
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.nav
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center justify-between px-10 py-5 bg-white/70 backdrop-blur-xl border-b border-black/[0.03] sticky top-0 z-50"
    >
      {/* Brand */}
      <Link to="/" className="flex items-center gap-3 group">
        <img
          src={logo}
          alt="Logo"
          className="w-6 h-6 grayscale opacity-80 group-hover:opacity-100 transition-opacity"
        />
        <span className="text-sm font-bold tracking-[0.2em] uppercase text-black/80">
          ExamNotes <span className="font-light text-black/30 italic">AI</span>
        </span>
      </Link>

      <div className="flex items-center gap-8 relative">
        {/* Credits Status */}
        <div className="relative">
          <motion.div
            onClick={() => {
              setShowCredit(!showCredit);
              setShowProfile(false);
            }}
            whileHover={{ y: -1 }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-bold uppercase tracking-widest text-black/30">
                Balance
              </span>
              <span className="text-sm font-medium tabular-nums">
                {credits} CR
              </span>
            </div>
            <div
              className={`p-1.5 rounded-full border transition-all duration-300 ${showCredit ? "bg-black border-black text-white" : "border-black/10 text-black/40 group-hover:border-black group-hover:text-black"}`}
            >
              <HiOutlinePlus
                className={`text-xs transition-transform duration-300 ${showCredit ? "rotate-45" : ""}`}
              />
            </div>
          </motion.div>

          <AnimatePresence>
            {showCredit && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                className="absolute right-0 top-full mt-6 w-72 bg-white border border-black/[0.06] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] rounded-2xl z-50"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30 mb-2">
                  Refill Credits
                </p>
                <h4 className="text-lg font-medium mb-3 tracking-tight text-black">
                  Precision Generation
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  Credits power our neural engine to synthesize notes, diagrams,
                  and LaTeX exports.
                </p>
                <button
                  onClick={() => {
                    setShowCredit(false);
                    navigate("/pricing");
                  }}
                  className="w-full py-4 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-black/80 transition-all shadow-lg"
                >
                  Purchase Bundle
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile */}
        <div className="relative">
          <motion.div
            onClick={() => {
              setShowProfile(!showProfile);
              setShowCredit(false);
            }}
            whileHover={{ scale: 1.05 }}
            className="w-10 h-10 flex items-center justify-center bg-[#f0f0f0] rounded-full cursor-pointer overflow-hidden border border-black/5 hover:border-black/20 transition-all"
          >
            {userData?.photoURL ? (
              <img
                src={userData.photoURL}
                alt="Avatar"
                className="w-full h-full object-cover grayscale"
              />
            ) : (
              <span className="text-[10px] font-bold text-black/40">
                {userData?.name?.slice(0, 1).toUpperCase()}
              </span>
            )}
          </motion.div>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                className="absolute right-0 top-full mt-6 w-56 bg-white border border-black/[0.06] py-3 shadow-[0_20px_50px_rgba(0,0,0,0.08)] rounded-2xl z-50 overflow-hidden"
              >
                <div className="px-5 py-3 border-b border-black/[0.03]">
                  <p className="text-xs font-bold text-black truncate">
                    {userData?.name}
                  </p>
                  <p className="text-[9px] text-black/30 truncate uppercase tracking-tighter">
                    {userData?.email}
                  </p>
                </div>
                <div className="py-2">
                  <MenuItem
                    icon={<HiOutlineClock />}
                    text="History"
                    onClick={() => {
                      setShowProfile(false);
                      navigate("/history");
                    }}
                  />
                  <MenuItem
                    icon={<HiOutlineLogout />}
                    text="Sign Out"
                    isRed
                    onClick={() => {
                      setShowProfile(false);
                      handleLogout();
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};

function MenuItem({ onClick, text, isRed, icon }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.15em] transition-all group ${
        isRed
          ? "text-red-400 hover:bg-red-50"
          : "text-black/60 hover:bg-black hover:text-white"
      }`}
    >
      <span className="text-sm opacity-70 group-hover:opacity-100">{icon}</span>
      {text}
    </button>
  );
}

export default Navbar;
