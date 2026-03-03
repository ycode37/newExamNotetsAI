import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverUrl } from "../App";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function History() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const myNotes = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`${serverUrl}/api/notes/getnotes`, {
          withCredentials: true,
          headers: {
            ...(localStorage.getItem("token")
              ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
              : {}),
          },
        });
        const list = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.notes)
            ? res.data.notes
            : [];
        setTopics(list);
      } catch (error) {
        console.log(error);
        setError("Unable to load your saved notes right now.");
      } finally {
        setLoading(false);
      }
    };
    myNotes();
  }, []);

  const getTopicTitle = (note, index) => {
    return (
      note?.topic ||
      note?.title ||
      note?.subject ||
      `Untitled Note ${index + 1}`
    );
  };

  const getPreview = (note) => {
    const text = note?.notes || note?.content || note?.summary || "";
    if (!text) return "No preview available for this note.";
    return text.length > 190 ? `${text.slice(0, 190)}...` : text;
  };

  const getDate = (note) => {
    const source = note?.createdAt || note?.updatedAt || note?.date;
    if (!source) return "No date";
    const parsed = new Date(source);
    if (Number.isNaN(parsed.getTime())) return "No date";
    return parsed.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-black selection:bg-black selection:text-white">
      <Navbar />

      <main className="max-w-6xl mx-auto px-8 py-24">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-black/40 font-bold">
              Knowledge Archive
            </p>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight mt-3">
              Your Note History
            </h1>
            <p className="text-sm text-black/50 mt-4 max-w-xl leading-relaxed">
              Review past generations and jump back into active study sessions.
            </p>
          </div>

          <button
            onClick={() => navigate("/notes")}
            className="px-8 py-3 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black/85 transition-colors"
          >
            Create New Notes
          </button>
        </motion.section>

        <div className="mt-12 h-[1px] w-full bg-black/[0.06]" />

        {loading && (
          <div className="mt-16 text-center text-[10px] uppercase tracking-[0.25em] text-black/40 font-bold">
            Loading your notes...
          </div>
        )}

        {error && (
          <div className="mt-10 p-4 border border-red-100 bg-red-50/30 text-red-500 text-xs rounded-xl text-center font-medium">
            {error}
          </div>
        )}

        {!loading && !error && topics.length === 0 && (
          <div className="mt-14 bg-white border border-black/[0.05] rounded-3xl p-12 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-black/30 font-bold">
              No saved notes yet
            </p>
            <p className="mt-4 text-sm text-black/50">
              Generate your first topic summary to see it here.
            </p>
          </div>
        )}

        {!loading && !error && topics.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {topics.map((note, index) => (
              <motion.article
                key={note?._id || note?.id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="bg-white border border-black/[0.06] rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-lg font-medium tracking-tight leading-snug">
                    {getTopicTitle(note, index)}
                  </h2>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30 shrink-0">
                    {getDate(note)}
                  </span>
                </div>

                <p className="mt-4 text-sm text-black/55 leading-relaxed">
                  {getPreview(note)}
                </p>
              </motion.article>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
export default History;
