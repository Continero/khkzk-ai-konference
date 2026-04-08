import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Sequence } from "remotion";

const bootLines = [
  { text: "JARVIS SYSTEM v4.2.6", delay: 0 },
  { text: "Neural network calibration .........", delay: 15 },
  { text: "Loading conference database ........", delay: 35 },
  { text: "Biometric scan complete ...........", delay: 55 },
  { text: "All systems operational.", delay: 75 },
];

function BootLine({ text, startFrame }: { text: string; startFrame: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;
  if (localFrame < 0) return null;

  const opacity = spring({ frame: localFrame, fps, config: { damping: 20, stiffness: 100 }, from: 0, to: 1 });
  const charCount = Math.min(Math.floor(localFrame * 1.5), text.length);
  const displayed = text.slice(0, charCount);
  const isComplete = charCount >= text.length;
  const isLast = text.includes("All systems");

  return (
    <div style={{ opacity, fontFamily: "monospace", fontSize: 13, marginBottom: 6, display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ color: isComplete ? (isLast ? "#00d4ff" : "rgba(74, 222, 128, 0.6)") : "rgba(0, 212, 255, 0.5)", width: 14 }}>
        {isComplete ? (isLast ? "▸" : "✓") : "○"}
      </span>
      <span style={{ color: isComplete && isLast ? "#00d4ff" : "rgba(212, 239, 255, 0.6)" }}>
        {displayed}
        {!isComplete && <span style={{ animation: "blink 0.5s step-end infinite", color: "#00d4ff" }}>▌</span>}
      </span>
    </div>
  );
}

function ScanLine() {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [85, 115], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opacity = interpolate(frame, [85, 90, 110, 115], [0, 0.6, 0.6, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{
      position: "absolute",
      left: 0, right: 0,
      top: `${progress}%`,
      height: 2,
      background: "linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.5) 30%, rgba(0,212,255,0.8) 50%, rgba(0,212,255,0.5) 70%, transparent 100%)",
      boxShadow: "0 0 15px rgba(0,212,255,0.4), 0 0 30px rgba(0,212,255,0.1)",
      opacity,
      pointerEvents: "none",
    }} />
  );
}

function StatusBar() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const show = frame > 90;
  if (!show) return null;

  const opacity = spring({ frame: frame - 90, fps, config: { damping: 20, stiffness: 80 }, from: 0, to: 1 });
  const barProgress = interpolate(frame, [90, 130], [0, 100], { extrapolateRight: "clamp" });

  return (
    <div style={{ opacity, marginTop: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      {/* Progress bar */}
      <div style={{ width: 200, height: 2, background: "rgba(0,212,255,0.1)", borderRadius: 1, overflow: "hidden" }}>
        <div style={{ width: `${barProgress}%`, height: "100%", background: "rgba(0,212,255,0.6)", transition: "none" }} />
      </div>
      <span style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(0,212,255,0.4)", letterSpacing: "0.2em" }}>
        SYSTEM READY — {Math.round(barProgress)}%
      </span>
    </div>
  );
}

export const BootSequence: React.FC = () => {
  const frame = useCurrentFrame();

  // Flash at the very start
  const flashOpacity = interpolate(frame, [0, 3, 6], [0.4, 0, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {/* Initial flash */}
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(0,212,255,0.1)",
        opacity: flashOpacity,
        pointerEvents: "none",
      }} />

      {/* Scan line sweep */}
      <ScanLine />

      {/* Boot text */}
      <div style={{ padding: 20 }}>
        {bootLines.map((line) => (
          <BootLine key={line.text} text={line.text} startFrame={line.delay} />
        ))}
        <StatusBar />
      </div>
    </AbsoluteFill>
  );
};
