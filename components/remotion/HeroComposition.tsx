import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Sequence } from "remotion";
import { ArcReactor } from "./ArcReactor";

const bootLines = [
  { text: "JARVIS v4.2.6", delay: 0 },
  { text: "Neural network OK", delay: 12 },
  { text: "Database loaded", delay: 28 },
  { text: "Systems operational", delay: 42 },
];

export const HeroComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title — immediate with quick materialize
  const titleOp = spring({ frame, fps, config: { damping: 15, stiffness: 80 }, from: 0, to: 1 });
  const titleBlur = interpolate(frame, [0, 12], [6, 0], { extrapolateRight: "clamp" });
  const titleBright = interpolate(frame, [0, 8, 15], [1.8, 1.2, 1], { extrapolateRight: "clamp" });
  const flicker = frame < 30 ? (frame % 20 > 17 ? 0.7 : 1) : 1;

  // Badge
  const badgeOp = spring({ frame: Math.max(0, frame - 3), fps, config: { damping: 20, stiffness: 80 }, from: 0, to: 1 });

  // Subtitle
  const subOp = interpolate(frame, [10, 25], [0, 1], { extrapolateRight: "clamp" });

  // Divider
  const divOp = interpolate(frame, [8, 20], [0, 1], { extrapolateRight: "clamp" });

  // Info badges + CTA — appear after ~2s
  const infoOp = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 20, stiffness: 60 }, from: 0, to: 1 });
  const ctaOp = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 20, stiffness: 50 }, from: 0, to: 1 });
  const ctaPulse = Math.sin(frame * 0.06) * 0.1 + 0.9;

  return (
    <AbsoluteFill style={{ background: "transparent" }}>
      {/* Arc Reactor behind everything */}
      <Sequence from={0}>
        <ArcReactor />
      </Sequence>

      {/* All content in one centered flex column */}
      <AbsoluteFill style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 20px",
      }}>
        {/* Badge */}
        <div style={{
          fontSize: 16,
          fontFamily: "monospace",
          color: "rgba(0,212,255,0.7)",
          letterSpacing: "0.15em",
          marginBottom: 16,
          padding: "4px 12px",
          border: "1px solid rgba(0,212,255,0.15)",
          textTransform: "uppercase",
          opacity: badgeOp,
        }}>
          KHKZK // Konference_2026
        </div>

        {/* Title */}
        <div style={{
          opacity: titleOp * flicker,
          filter: `blur(${titleBlur}px) brightness(${titleBright})`,
          textAlign: "center",
        }}>
          <div style={{
            fontSize: 140,
            fontWeight: 800,
            lineHeight: 0.92,
            textShadow: "0 0 15px rgba(0,212,255,0.5), 0 0 50px rgba(0,212,255,0.15)",
          }}>
            <span style={{ color: "#00d4ff" }}>AI</span>
            <span style={{ color: "#d4efff" }}> v praxi</span>
          </div>
          <div style={{
            fontSize: 140,
            fontWeight: 800,
            color: "rgba(90,143,170,0.8)",
            lineHeight: 0.92,
            marginTop: 4,
          }}>
            2026
          </div>
        </div>

        {/* Divider */}
        <div style={{
          width: 150,
          height: 1,
          margin: "16px 0",
          background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)",
          opacity: divOp,
          transform: `scaleX(${divOp})`,
        }} />

        {/* Subtitle */}
        <div style={{
          fontSize: 30,
          color: "rgba(90,143,170,0.9)",
          fontWeight: 300,
          textShadow: "0 0 8px rgba(0,212,255,0.3)",
          opacity: subOp,
        }}>
          Od experimentů k reálným výsledkům
        </div>

        {/* Spacer — pushes content up to leave room for HTML overlay badges */}
        <div style={{ height: 180 }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
