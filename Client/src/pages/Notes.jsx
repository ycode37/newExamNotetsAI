import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TopicForm from "../components/TopicForm";
import Sidebar from "../components/Sidebar";
import FinalResult from "../components/FinalResult";

const Notes = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const credits = userData?.credits || 0;
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, seterror] = useState(null);

  useEffect(() => {
    console.log("📦 result state updated:", result);
    console.log("📦 result.subTopics:", result?.subTopics);
  }, [result]);

  return (
    <div className="min-h-screen bg-[#fafafa] text-black selection:bg-black selection:text-white">
      {/* Reusing the aesthetic Navbar */}
      <Navbar />

      <main className="max-w-5xl mx-auto px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center text-center"
        >
          {/* Main Title Section */}
          <h1
            onClick={() => navigate("/")}
            className="text-5xl md:text-7xl font-medium tracking-tighter mb-12 cursor-pointer hover:opacity-70 transition-opacity"
          >
            ExamNotes{" "}
            <span className="italic font-serif font-light text-black/20">
              AI
            </span>
          </h1>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/history")}
              className="px-10 py-4 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl hover:shadow-black/10 transition-all"
            >
              Your Notes
            </motion.button>
          </div>
        </motion.div>

        {/* Subtle separator */}
        <div className="mt-32 w-full h-[1px] bg-black/[0.03]" />

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <TopicForm
            loading={loading}
            setLoading={setLoading}
            setResult={setResult}
            setError={seterror}
          />
        </motion.div>

        {/* Loading Message */}
        {
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center text-[10px] uppercase tracking-[0.3em] text-black/40 font-bold italic"
          >
            Generating Exam Focused Notes...
          </motion.div>
        }

        {/* Error Message */}
        {error && (
          <div className="mt-8 p-4 border border-red-100 bg-red-50/30 text-red-500 text-xs rounded-xl text-center font-medium">
            {error}
          </div>
        )}

        {/* Empty State Placeholder */}
        {!result && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-20 py-20 border-t border-black/[0.03] text-center"
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-black/20 font-bold">
              Your Notes Will Appear Here
            </p>
          </motion.div>
        )}

        {/* Result Container */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-20 flex flex-col md:flex-row gap-10 items-start"
          >
            <aside className="w-full md:w-64 sticky top-28">
              <Sidebar result={result} />
            </aside>
            <div className="flex-1 w-full bg-white border border-black/[0.05] rounded-3xl p-8 shadow-sm">
              <FinalResult result={result} />
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Notes;
