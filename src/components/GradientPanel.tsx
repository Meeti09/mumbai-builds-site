/**
 * The gradient-hairline panel shell the reference reuses for its Partners,
 * Sponsors and highlight blocks.
 */
export default function GradientPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="p-[2px] rounded-[2.5rem] bg-gradient-to-r from-purple-600/30 via-cyan-400/25 to-blue-500/20 shadow-2xl">
      <div
        className={`rounded-[2.5rem] bg-gradient-to-br from-[#0a0d14] via-[#0f1219] to-[#0a0d14] backdrop-blur-xl px-6 py-12 sm:px-10 sm:py-16 md:px-14 md:py-20 relative overflow-hidden ${className}`}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-cyan-400/60 to-transparent" />
        <div className="absolute bottom-0 right-[20%] w-[1px] h-24 bg-gradient-to-t from-purple-500/50 to-transparent" />
        {children}
      </div>
    </div>
  );
}

/** The ambient blurred blobs that sit behind each gradient panel section. */
export function PanelAura() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute left-[20%] top-[10%] w-[50vw] h-[30vw] bg-gradient-to-br from-purple-600/15 via-blue-500/10 to-transparent blur-[160px] animate-pulse" />
      <div
        className="absolute right-[15%] bottom-[20%] w-[40vw] h-[35vw] bg-gradient-to-tl from-cyan-400/12 via-pink-500/8 to-transparent blur-[140px] animate-pulse"
        style={{ animationDelay: "1.2s" }}
      />
    </div>
  );
}

/** Badge + gradient heading + rule + blurb, centred — the panel header. */
export function PanelHeading({
  badge,
  heading,
  children,
}: {
  badge: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 md:mb-20 relative z-10">
      <div className="reveal-heading inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-400/20 mb-4 sm:mb-6">
        <span className="text-xs sm:text-sm text-cyan-300 font-medium tracking-widest uppercase">
          {badge}
        </span>
      </div>
      <h2 className="reveal-heading text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 mb-4 sm:mb-6">
        {heading}
      </h2>
      <div className="reveal-heading w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent rounded-full mx-auto mb-4 sm:mb-6" />
      <p className="reveal-heading text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
        {children}
      </p>
    </div>
  );
}
