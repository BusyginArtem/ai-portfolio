import StackedCards from "./stacked-cards";

export default function Projects() {
  return (
    <section
      id="projects"
      className="mt-20 md:mt-32 transition-colors"
      aria-label="Some Projects section showcasing selected projects with stacked card animations."
    >
      <StackedCards />
    </section>
  );
}
