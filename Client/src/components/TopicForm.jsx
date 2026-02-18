import { motion } from "framer-motion";
import React, { useState } from "react";
import { generateNotes } from "../services/api";

const TopicForm = ({ setResult, setLoading, loading, setError }) => {
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [examType, setExamType] = useState("");
  const [revisionMode, setRevisionMode] = useState(false);
  const [includeDiagram, setIncludeDiagram] = useState(false);
  const [includeChart, setIncludeChart] = useState(false);

  const handleSubmit = async (params) => {
    if (!topic.trim()) {
      setError("Please Enter The Topic");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const result = generateNotes({
        topic,
        classLevel,
        examType,
        revisionMode,
        includeChart,
        includeDiagram,
      });
      setResult(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

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
    </motion.div>
  );
};

/* Internal UI Components for Cleanliness */
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
