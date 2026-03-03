import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

const Pricing = () => {
  const { userData } = useSelector((state) => state.user);
  const credits = userData?.credits || 0;

  const plans = [
    {
      name: "Starter",
      credits: 100,
      price: "₹199",
      detail: "For focused weekly revisions.",
      featured: false,
    },
    {
      name: "Scholar",
      credits: 250,
      price: "₹399",
      detail: "Best for semester-long prep cycles.",
      featured: true,
    },
    {
      name: "Mastery",
      credits: 600,
      price: "₹799",
      detail: "High-volume generation for intensive exams.",
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] text-black selection:bg-black selection:text-white">
      <Navbar />

      <main className="max-w-6xl mx-auto px-8 py-24">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.25em] text-black/40 font-bold">
            Credit Bundles
          </p>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight mt-3">
            Pricing
          </h1>
          <p className="mt-4 text-sm text-black/50 max-w-xl mx-auto leading-relaxed">
            Top up credits to keep generating exam-focused notes, charts, and
            quick-revision material.
          </p>
        </motion.section>

        <div className="mt-10 w-fit mx-auto border border-black/10 rounded-full px-6 py-3 bg-white text-[11px] font-medium tracking-wide">
          Current Balance: <span className="font-bold">{credits} Credits</span>
        </div>

        <section className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 }}
              className={`rounded-3xl p-8 border ${
                plan.featured
                  ? "bg-black text-white border-black shadow-xl"
                  : "bg-white text-black border-black/[0.06] shadow-sm"
              }`}
            >
              <p
                className={`text-[10px] font-bold uppercase tracking-[0.22em] ${
                  plan.featured ? "text-white/60" : "text-black/35"
                }`}
              >
                {plan.name}
              </p>
              <h2 className="mt-4 text-4xl font-medium tracking-tight">
                {plan.price}
              </h2>
              <p
                className={`mt-2 text-xs ${
                  plan.featured ? "text-white/70" : "text-black/55"
                }`}
              >
                {plan.credits} Credits
              </p>
              <p
                className={`mt-6 text-sm leading-relaxed ${
                  plan.featured ? "text-white/75" : "text-black/55"
                }`}
              >
                {plan.detail}
              </p>

              <button
                className={`mt-8 w-full py-3 rounded-xl text-[10px] uppercase tracking-[0.2em] font-bold transition-colors ${
                  plan.featured
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-black text-white hover:bg-black/85"
                }`}
              >
                Buy Credits
              </button>
            </motion.article>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
