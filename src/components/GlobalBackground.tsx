const NOISE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")";

/** Full-page aurora wash + film grain that sits behind every section. */
export default function GlobalBackground() {
  return (
    <div className="absolute inset-0 z-[-1] bg-[#0e0e0e] overflow-hidden pointer-events-none min-h-full max-w-full">
      <div className="absolute top-[0%] left-[10%] w-[800px] h-[800px] bg-blue-600/15 rounded-full blur-[120px] mix-blend-screen" />
      <div className="absolute top-[5%] right-[10%] w-[900px] h-[900px] bg-purple-600/10 rounded-full blur-[150px] mix-blend-screen" />
      <div className="absolute top-[30%] right-[5%] w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-[130px]" />
      <div className="absolute top-[45%] left-[-5%] w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[140px]" />
      <div className="absolute top-[70%] left-[15%] w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[5%] right-[10%] w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[150px]" />
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{ backgroundImage: NOISE, backgroundRepeat: "repeat" }}
      />
    </div>
  );
}
