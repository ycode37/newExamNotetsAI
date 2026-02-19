import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  HiOutlineDownload,
  HiOutlineClipboardCopy,
  HiOutlineLightningBolt,
  HiOutlineArrowLeft,
  HiOutlineCamera,
} from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import MermaidSetup from "./MermaidSetup";
import ChartSetup from "./ChartSetup";
import { downloadPDF } from "../services/api";

const markDownComponent = {
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold tracking-tight mb-8 mt-12 text-black leading-none">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-bold tracking-tight mb-5 mt-10 text-black/80">
      {children}
    </h2>
  ),
  p: ({ children }) => (
    <p className="text-base leading-relaxed text-black/60 mb-6 font-serif">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-none space-y-3 mb-8 ml-2">{children}</ul>
  ),
  li: ({ children }) => (
    <li className="flex items-start gap-4 text-black/60 text-sm leading-relaxed font-serif">
      <span className="mt-2 w-1 h-1 rounded-full bg-black/20 shrink-0" />
      {children}
    </li>
  ),
};

const FinalResult = ({ result }) => {
  const [quickRevision, setQuickRevision] = useState(false);

  if (!result || !result.notes) return null;

  return (
    <div className="max-w-4xl mx-auto py-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-black/[0.04] gap-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/20 block mb-3">
            {quickRevision ? "Blitz Mode Active" : "Intelligence Synthesis"}
          </span>
          <h2 className="text-3xl font-medium tracking-tight text-black">
            {quickRevision ? "Quick Revision" : "Comprehensive Notes"}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuickRevision(!quickRevision)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500 border ${
              quickRevision
                ? "bg-black text-white border-black"
                : "bg-transparent text-black border-black/10 hover:border-black"
            }`}
          >
            {quickRevision ? (
              <HiOutlineArrowLeft />
            ) : (
              <HiOutlineLightningBolt className="text-yellow-500" />
            )}
            {quickRevision ? "Back to Notes" : "5 Min Revision"}
          </button>

          <div className="h-8 w-[1px] bg-black/5 mx-2 hidden md:block" />

          <button
            className="p-2.5 text-black/40 hover:text-black transition-colors"
            title="Copy Raw Text"
          >
            <HiOutlineClipboardCopy className="text-xl" />
          </button>

          <button
            onClick={() => downloadPDF(result)}
            className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
          >
            <HiOutlineDownload className="text-sm" />
            Export
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {!quickRevision ? (
          <motion.div
            key="standard-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {/* Priority Topics */}
            <section className="grid md:grid-cols-3 gap-10 mb-20">
              {Object.entries(result.subTopics || {}).map(
                ([priority, topics]) => (
                  <div key={priority} className="group">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/30 mb-6 border-l-2 border-black pl-3 transition-colors group-hover:text-black">
                      {priority} Priority
                    </p>
                    <ul className="space-y-3">
                      {Array.isArray(topics) &&
                        topics.map((t, i) => (
                          <li
                            key={i}
                            className="text-[11px] text-black/50 leading-tight flex items-start gap-2"
                          >
                            <span className="w-1 h-1 rounded-full bg-black/10 mt-1.5" />
                            {t}
                          </li>
                        ))}
                    </ul>
                  </div>
                ),
              )}
            </section>

            {/* Notes Body */}
            <article className="prose prose-neutral max-w-none">
              <ReactMarkdown components={markDownComponent}>
                {result.notes}
              </ReactMarkdown>
            </article>

            {/* Diagrams */}
            {result.diagram?.data && (
              <section className="mt-24 pt-16 border-t border-black/[0.03]">
                <div className="bg-white rounded-3xl p-8 border border-black/[0.02]">
                  <MermaidSetup diagram={result.diagram.data} />
                </div>
                <div className="mt-8 flex items-center justify-center gap-2 text-[9px] text-black/20 font-bold uppercase tracking-[0.3em]">
                  <HiOutlineCamera />
                  <span>Snapshot for offline reference</span>
                </div>
              </section>
            )}

            {/* Charts */}
            {result.charts?.length > 0 && (
              <section className="mt-24 pt-16 border-t border-black/[0.03]">
                <ChartSetup charts={result.charts} />
                <div className="mt-8 flex items-center justify-center gap-2 text-[9px] text-black/20 font-bold uppercase tracking-[0.3em]">
                  <HiOutlineCamera />
                  <span>Snapshot data for offline reference</span>
                </div>
              </section>
            )}
          </motion.div>
        ) : (
          /* Revision Mode */
          <motion.div
            key="revision-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="bg-[#0a0a0a] text-white p-10 md:p-20 rounded-[2.5rem] shadow-2xl"
          >
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-1 border border-white/10 rounded-full text-[9px] uppercase tracking-[0.4em] text-white/40">
                  Blitz Review
                </span>
              </div>
              <ul className="space-y-12">
                {(result.revisionPoints || []).map((p, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-8 group"
                  >
                    <span className="font-serif italic text-3xl text-white/10 shrink-0 group-hover:text-white/40 transition-colors">
                      0{i + 1}
                    </span>
                    <p className="text-xl md:text-2xl leading-snug tracking-tight text-white/80 group-hover:text-white transition-colors">
                      {p}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="mt-32 pt-12 border-t border-black/[0.03] flex justify-between items-center opacity-20">
        <span className="text-[10px] font-bold uppercase tracking-widest italic">
          Distilled by ExamNotes Core V.2
        </span>
        <span className="text-[10px] uppercase tracking-widest">
          {new Date().toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </footer>
    </div>
  );
};

export default FinalResult;
("");
