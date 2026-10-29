import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, desc, center = false }) {
  return (
    <Reveal className={`mb-10 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="mb-3 font-bold text-brand">{eyebrow}</p>}
      <h2 className="text-3xl font-black leading-tight sm:text-5xl">{title}</h2>
      {desc && <p className="mt-4 text-lg text-muted">{desc}</p>}
    </Reveal>
  );
}