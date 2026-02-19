import React from "react";
import { GiPin } from "react-icons/gi";
import { HiOutlineQuestionMarkCircle, HiOutlineStar } from "react-icons/hi";
import { motion } from "framer-motion";

const Sidebar = ({ result }) => {
  if (!result || !result.subTopics) {
    return (
      <div className="text-[10px] uppercase tracking-widest text-black/20 italic p-6">
        Loading metadata...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-12 pb-10"
    >
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-black/[0.03]">
        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white shrink-0 shadow-lg shadow-black/10">
          <GiPin className="text-sm" />
        </div>
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-black">
          Quick Exam View
        </h3>
      </div>

      {/* 1. Sub-Topics Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-end border-b border-black/[0.02] pb-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">
            Priority Topics
          </p>
          <span className="text-[9px] uppercase tracking-tighter text-black/20 italic font-serif">
            Distilled
          </span>
        </div>

        <div className="space-y-6">
          {Object.entries(result.subTopics).map(([priority, topics]) => (
            <div key={priority} className="group">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 bg-black text-white text-[8px] font-black uppercase tracking-widest rounded-sm whitespace-nowrap">
                  {priority}
                </span>
                <div className="h-[1px] flex-1 bg-black/[0.05]" />
              </div>

              <ul className="space-y-2 pl-1">
                {Array.isArray(topics) &&
                  topics.map((t, i) => (
                    <motion.li
                      key={i}
                      whileHover={{ x: 2 }}
                      className="text-[11px] text-black/50 hover:text-black transition-colors flex items-start gap-2 leading-relaxed"
                    >
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-black/20 flex-shrink-0" />
                      {t}
                    </motion.li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Exam Importance & Questions */}
      <section className="space-y-8">
        {/* Importance Meter */}
        <div className="p-4 bg-black/[0.02] border border-black/[0.03] rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <HiOutlineStar className="text-black/30" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">
              Importance
            </p>
          </div>
          <span className="text-sm font-medium tracking-tight text-black leading-relaxed block">
            {result.importance}
          </span>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-black/[0.02] pb-2">
            <HiOutlineQuestionMarkCircle className="text-black/30 text-lg" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">
              Key Questions
            </p>
          </div>

          {/* Question Blocks */}
          <QuestionBlock
            title="Short Response"
            items={result.questions?.short}
          />
          <QuestionBlock title="Long Response" items={result.questions?.long} />

          {result.questions?.diagram && (
            <div className="space-y-2">
              <p className="text-[9px] font-bold uppercase tracking-widest text-black/30 italic">
                Diagram Focus
              </p>
              <div className="p-3 bg-white border border-black/5 rounded-xl text-[11px] text-black/60 leading-relaxed font-medium">
                {result.questions.diagram}
              </div>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
};

/* Internal Helper Component */
function QuestionBlock({ title, items }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="space-y-3">
      <p className="text-[9px] font-bold uppercase tracking-widest text-black/80">
        {title}
      </p>
      <ul className="space-y-3">
        {items.map((q, i) => (
          <li
            key={i}
            className="text-[11px] text-black/50 leading-relaxed pl-3 border-l border-black/5 hover:border-black transition-colors"
          >
            {q}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
