import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "neutral", // Changed to neutral for a cleaner, black/white look
  themeVariables: {
    primaryColor: "#ffffff",
    primaryTextColor: "#000000",
    primaryBorderColor: "#000000",
    lineColor: "#000000",
    secondaryColor: "#fafafa",
    tertiaryColor: "#ffffff",
  },
});

const cleanMermaidChart = (diagram) => {
  if (!diagram) return "";
  let clean = diagram
    .replace(/\r?\n/g, "\n")
    .replace(/\//g, " ")
    .replace(/\(/g, "")
    .replace(/:/g, "")
    .replace(/,/g, "");

  if (!clean.trim().startsWith("graph")) {
    clean = `graph TD\n${clean}`;
  }

  return clean;
};

const MermaidSetup = ({ diagram }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!diagram || !containerRef.current) return;

    const renderDiagram = async () => {
      try {
        containerRef.current.innerHTML = "";
        const uniqueId = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
        const safeChart = cleanMermaidChart(diagram);

        const { svg } = await mermaid.render(uniqueId, safeChart);
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;

          // Force the SVG to be responsive and fit our aesthetic
          const svgElement = containerRef.current.querySelector("svg");
          if (svgElement) {
            svgElement.style.maxWidth = "100%";
            svgElement.style.height = "auto";
          }
        }
      } catch (error) {
        console.error("Mermaid Render Error:", error);
      }
    };
    renderDiagram();
  }, [diagram]);

  return (
    <div className="my-12 py-10 px-6 bg-white border border-black/[0.03] rounded-3xl group transition-all duration-500 hover:border-black/10">
      {/* Header Label */}
      <div className="flex items-center justify-between mb-8 px-2">
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-black/20 group-hover:text-black/40 transition-colors">
          Visual Logic Synthesis
        </span>
        <div className="h-[1px] w-12 bg-black/[0.05]" />
      </div>

      {/* Diagram Container */}
      <div
        ref={containerRef}
        className="flex justify-center overflow-x-auto p-4 custom-scrollbar"
      />

      {/* Footer Label */}
      <div className="mt-8 text-center">
        <p className="text-[10px] text-black/20 italic font-serif">
          Fig. 1 — Auto-generated concept mapping
        </p>
      </div>
    </div>
  );
};

export default MermaidSetup;
