import React from "react";
import { motion } from "framer-motion"; // Changed from motion/react for standard compatibility
import { FaGoogle, FaArrowRight } from "react-icons/fa";
import {
  HiOutlineLightningBolt,
  HiOutlineSparkles,
  HiOutlineDocumentDownload,
  HiOutlineChartBar,
} from "react-icons/hi";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setuserData } from "../redux/userSlice";

const Auth = () => {
  const dispatch = useDispatch();

  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const { displayName: name, email } = response.user;
      const result = await axios.post(
        `${serverUrl}/api/auth/google`,
        { name, email },
        { withCredentials: true },
      );
      // Store token for cross-origin auth (cookies blocked cross-domain)
      if (result.data.token) {
        localStorage.setItem("token", result.data.token);
      }
      dispatch(setuserData(result.data.user));
    } catch (e) {
      console.error("Auth Error:", e);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-black font-sans selection:bg-black selection:text-white">
      {/* Subtle Grid Background */}
      <div
        className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L30 60 M0 30 L60 30' fill='none' stroke='black' stroke-width='1'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="flex justify-between items-center px-8 py-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold tracking-tighter uppercase"
          >
            ExamNotes.AI
          </motion.div>
          <div className="h-[1px] w-12 bg-black/20 hidden md:block"></div>
        </nav>

        <main className="max-w-7xl mx-auto px-8 py-12 md:py-24">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="inline-block px-3 py-1 rounded-full border border-black/10 text-[10px] uppercase tracking-widest mb-6 font-medium bg-white">
                  Available for 2026 Academic Season
                </span>
                <h1 className="text-6xl md:text-8xl font-medium tracking-tight leading-[0.9] mb-8">
                  Intelligence <br />
                  meets <span className="italic font-serif">Revision.</span>
                </h1>

                <div className="max-w-lg">
                  <p className="text-lg text-gray-500 leading-relaxed mb-10">
                    Traditional note-taking is dead. We use neural processing to
                    transform complex curriculums into structured,
                    high-retention exam guides.
                  </p>

                  <motion.button
                    onClick={handleGoogleAuth}
                    whileHover={{
                      scale: 1.01,
                      backgroundColor: "#000",
                      color: "#fff",
                    }}
                    whileTap={{ scale: 0.99 }}
                    className="group flex items-center justify-between gap-4 w-full md:w-80 border border-black px-8 py-4 rounded-full font-medium transition-all duration-300 bg-transparent text-black"
                  >
                    <span className="flex items-center gap-3">
                      <FaGoogle className="text-sm" />
                      Sign in with Google
                    </span>
                    <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Right Features */}
            <div className="lg:col-span-5 grid gap-4">
              <FeatureBox
                icon={<HiOutlineSparkles />}
                title="50 Credits"
                desc="Complementary start for new accounts."
              />
              <FeatureBox
                icon={<HiOutlineChartBar />}
                title="Visual Synthesis"
                desc="Automatic diagram generation for complex topics."
              />
              <FeatureBox
                icon={<HiOutlineDocumentDownload />}
                title="LaTeX Export"
                desc="Clean, professional PDFs ready for print."
              />
            </div>
          </div>

          {/* Philosophy Section (The Blockquote) */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-32 pt-20 border-t border-black/5"
          >
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-8 font-semibold">
                The Philosophy
              </p>
              <blockquote className="text-2xl md:text-3xl font-serif italic text-gray-800 leading-snug">
                "Efficiency is not about doing more; it is about distilling the
                noise until only the essence remains. We didn't build a
                note-taker—we built a clarity engine."
              </blockquote>
              <p className="mt-6 text-sm text-gray-500">— The ExamNotes Team</p>
            </div>
          </motion.section>
        </main>
      </div>
    </div>
  );
};

const FeatureBox = ({ icon, title, desc }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="bg-white border border-black/5 p-8 rounded-2xl hover:border-black/20 transition-all duration-500 shadow-sm hover:shadow-md group"
  >
    <div className="text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-sm font-bold uppercase tracking-widest mb-2">
      {title}
    </h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

export default Auth;
