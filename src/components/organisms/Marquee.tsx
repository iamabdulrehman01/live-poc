const logos = [
  "Infosys",
  "TCS",
  "Wipro",
  "Cognizant",
  "Capgemini",
  "HCL",
  "Tech Mahindra",
];

export default function Marquee() {
  return (
    <section className="py-10 border-y border-white/5 bg-white/[0.02]">
      <p className="text-center text-xs uppercase tracking-[0.2em] text-white/50 mb-6">
        Our students are placed at
      </p>
      <div className="relative overflow-hidden">
        <div className="flex gap-14 animate-[marquee_25s_linear_infinite] whitespace-nowrap">
          {[...logos, ...logos].map((l, i) => (
            <span
              key={i}
              className="text-2xl font-bold text-white/40 hover:text-white transition"
            >
              {l}
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
      </div>
    </section>
  );
}
