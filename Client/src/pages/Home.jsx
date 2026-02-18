import React from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#fafafa] text-black antialiased selection:bg-black selection:text-white font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-black/[0.03] to-transparent rounded-full blur-3xl -z-10" />

        <div className="max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-7xl md:text-[120px] font-medium tracking-[ -0.04em] leading-[0.85] mb-10">
              Effortless <br />
              <span className="italic font-serif font-light text-black/30">
                Intelligence.
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col items-center gap-10"
          >
            <p className="text-xl md:text-2xl text-black/50 max-w-2xl font-light leading-relaxed">
              The minimalist workspace for modern students.{" "}
              <br className="hidden md:block" />
              We turn lecture chaos into{" "}
              <span className="text-black font-normal">structured clarity</span>
              .
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <motion.button
                onClick={() => navigate("/notes")}
                whileHover={{ scale: 1.02, backgroundColor: "#000" }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-3 px-12 py-5 bg-black/90 text-white rounded-full font-medium tracking-tight transition-all shadow-2xl"
              >
                Start Creating
                <HiOutlineArrowNarrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Abstract "App" Preview Placeholder */}
      </section>

      {/* Philosophy Block */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-end">
          <h2 className="text-4xl md:text-5xl font-serif italic tracking-tight leading-tight">
            "Your brain is for having ideas, not for storing messy bullet
            points."
          </h2>
          <div className="border-l border-black/10 pl-8">
            <p className="text-gray-500 leading-relaxed max-w-sm">
              We built ExamNotes AI to handle the cognitive load of
              organization, so you can focus on synthesis and understanding.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="px-8 py-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-16">
          <FeatureCard
            number="01"
            title="Instant Synthesis"
            desc="Generate high-fidelity study guides and LaTeX formatted PDFs in under 5 seconds."
          />
          <FeatureCard
            number="02"
            title="Neural Vision"
            desc="Our models don't just read text; they interpret complex diagrams and handwritten sketches."
          />
          <FeatureCard
            number="03"
            title="Deep Focus"
            desc="A zero-distraction interface designed intentionally for long, rhythmic study sessions."
          />
          <FeatureCard
            number="04"
            title="Sovereign Data"
            desc="Your intellectual property is encrypted. Your notes belong to you, not the model."
          />
          <FeatureCard
            number="05"
            title="Universal Export"
            desc="Move your knowledge base to Notion, Obsidian, or professional print-ready PDFs."
          />
          <FeatureCard
            number="06"
            title="Cloud Sync"
            desc="Your entire library, synchronized across your hardware in near real-time."
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

const FeatureCard = ({ number, title, desc }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group"
  >
    <span className="text-[10px] font-bold tracking-[0.2em] text-black/20 block mb-4 group-hover:text-black transition-colors duration-500">
      {number}
    </span>
    <div className="h-[1px] w-full bg-black/5 mb-6 group-hover:bg-black/20 transition-colors" />
    <h3 className="text-lg font-medium mb-3 tracking-tight">{title}</h3>
    <p className="text-sm text-black/40 leading-relaxed font-light">{desc}</p>
  </motion.div>
);

export default Home;
