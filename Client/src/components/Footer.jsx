import { motion } from "motion/react";
import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="w-full bg-black text-white py-16 px-8 mt-20"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="w-8 h-8 invert" />
              <span className="text-xl font-light tracking-tight">
                ExamNotes <span className="font-bold">AI</span>
              </span>
            </div>
            <p className="text-sm text-white/50 max-w-xs leading-relaxed">
              The minimalist workspace for students. Turn messy lectures into
              structured study guides instantly.
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col md:items-end gap-4">
          <h1 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">
            Quick Links
          </h1>
          <ul className="flex flex-col md:items-end gap-2">
            <li
              className="text-sm hover:text-white/60 cursor-pointer transition-colors"
              onClick={() => navigate("/notes")}
            >
              Notes
            </li>
            <li
              onClick={() => navigate("/history")}
              className="text-sm hover:text-white/60 cursor-pointer transition-colors"
            >
              History
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/10 flex justify-between items-center text-[10px] uppercase tracking-widest text-white/30">
        <p>© 2026 ExamNotes AI</p>
        <p>Built for Focus</p>
      </div>
    </motion.div>
  );
};

export default Footer;
