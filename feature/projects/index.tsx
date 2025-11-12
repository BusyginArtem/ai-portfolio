import React from "react";
import StackedCards from "./stacked-cards";

export default function Projects() {
  return (
    <div
      id="projects"
      className="min-h-screen py-8 pt-20 md:pt-32 transition-colors"
    >
      <h2 className="text-5xl md:text-[6vw] leading-none max-w-[80%] pb-10 md:pb-20">
        Some Projects
      </h2>

      <StackedCards />
    </div>
  );
}
