import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { generateNotes } from "../services/api";
import { useDispatch } from "react-redux";
import { setuserData, updateCredits } from "../redux/userSlice"; // Using setuserData to keep it consistent with your Auth logic

const TopicForm = ({ setResult, setLoading, loading, setError }) => {
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [examType, setExamType] = useState("");
  const [revisionMode, setRevisionMode] = useState(false);
  const [includeDiagram, setIncludeDiagram] = useState(false);
  const [includeChart, setIncludeChart] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!topic.trim()) {
      setError("Please Enter The Topic");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const result = await generateNotes({
        topic,
        classLevel,
        examType,
        revisionMode,
        includeChart,
        includeDiagram,
      });

      console.log("🔥 BACKEND RESPONSE:", result);

      // 1. Update Redux credits if they exist in response
      if (result && result.creditsLeft !== undefined) {
        dispatch(updateCredits(result.creditsLeft));
      }

      // 2. Set result for display (backend wraps AI response in result.data)
      setResult(result.data);

      // 3. Reset form to normal
      setTopic("");
      setClassLevel("");
      setExamType("");
      setRevisionMode(false);
      setIncludeDiagram(false);
      setIncludeChart(false);
    } catch (error) {
      console.error("🔥 ERROR:", error);
      const msg =
        error?.response?.data?.message ||
        "Failed to generate notes. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      setProgress(0);
      setProgressText("");
      return;
    }
    let value = 0;

    const interval = setInterval(() => {
      value += Math.random() * 8;

      if (value >= 95) {
        value = 95;
        setProgressText("Almost Done");
        clearInterval(interval);
      } else if (value > 70) {
        setProgressText("Finalizing Notes");
      } else if (value > 40) {
        setProgressText("Processing Content");
      } else {
        setProgressText("Generating Notes");
      }
      setProgress(Math.floor(value));
    }, 700);
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-8 p-10 bg-white border border-black/[0.05] rounded-3xl"
    >
      {/* Input Fields */}
      <div className="space-y-4">
        <InputField
          placeholder="Topic (e.g. Quantum Mechanics)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-4">
          <InputField
            placeholder="Class Level"
            value={classLevel}
            onChange={(e) => setClassLevel(e.target.value)}
          />
          <InputField
            placeholder="Exam Type"
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
          />
        </div>
      </div>

      {/* Toggles Group */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-y border-black/[0.03]">
        <Toggle
          label="Revision Mode"
          checked={revisionMode}
          onChange={() => setRevisionMode(!revisionMode)}
        />
        <Toggle
          label="Charts"
          checked={includeChart}
          onChange={() => setIncludeChart(!includeChart)}
        />
        <Toggle
          label="Diagrams"
          checked={includeDiagram}
          onChange={() => setIncludeDiagram(!includeDiagram)}
        />
      </div>

      {/* Submit Button */}
      <motion.button
        onClick={handleSubmit}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        disabled={loading}
        className={`w-full py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 shadow-sm
          ${loading ? "bg-gray-100 text-black/20 cursor-not-allowed" : "bg-black text-white hover:shadow-xl hover:shadow-black/10"}`}
      >
        {loading ? "Generating Notes..." : "Generate Notes"}
      </motion.button>

      {/* Loading State UI */}
      {loading && (
        <div className="space-y-4 pt-4">
          <div className="w-full bg-black/5 h-[2px] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-black"
            />
          </div>
          <div className="flex justify-between items-center text-[9px] uppercase tracking-[0.2em] font-bold text-black/40">
            <span>{progressText}</span>
            <span className="tabular-nums">{progress}%</span>
          </div>
          <p className="text-center text-[10px] text-black/30 italic">
            This may take 2-5 minutes so Please Wait !!
          </p>
        </div>
      )}
    </motion.div>
  );
};

function InputField({ placeholder, value, onChange }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-6 py-4 bg-[#fafafa] border border-black/[0.03] rounded-xl text-sm focus:outline-none focus:border-black/20 focus:bg-white transition-all placeholder:text-black/20 font-medium"
    />
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <div
      onClick={onChange}
      className="flex items-center justify-between px-4 py-3 rounded-xl border border-black/[0.03] cursor-pointer hover:bg-[#fafafa] transition-colors"
    >
      <span className="text-[10px] font-bold uppercase tracking-widest text-black/50">
        {label}
      </span>
      <div
        className={`w-8 h-4 rounded-full relative transition-colors duration-300 ${checked ? "bg-black" : "bg-black/10"}`}
      >
        <motion.div
          animate={{ x: checked ? 18 : 2 }}
          className="absolute top-1 w-2 h-2 rounded-full bg-white"
        />
      </div>
    </div>
  );
}

export default TopicForm;
