import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const SectionActivation: React.FC<{
  sectionId: string;
  title: string;
  subtitle?: string;
}> = ({ sectionId, title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Horizontal scan line
  const scanX = interpolate(frame, [0, 25], [-100, 200], { extrapolateRight: "clamp" });
  const scanOpacity = interpolate(frame, [0, 5, 20, 25], [0, 0.5, 0.5, 0], { extrapolateRight: "clamp" });

  // Section ID appears
  const idOpacity = spring({ frame: Math.max(0, frame - 8), fps, config: { damping: 20, stiffness: 100 }, from: 0, to: 1 });

  // Title materializes with blur
  const titleOpacity = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 18, stiffness: 60 }, from: 0, to: 1 });
  const titleBlur = interpolate(frame, [15, 35], [8, 0], { extrapolateRight: "clamp" });
  const titleBright = interpolate(frame, [15, 25, 40], [2, 1.3, 1], { extrapolateRight: "clamp" });

  // Subtitle
  const subOpacity = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 20, stiffness: 70 }, from: 0, to: 1 });

  // Decorative lines
  const lineScale = interpolate(frame, [20, 45], [0, 1], { extrapolateRight: "clamp" });

  // Flicker on title — only during materialization, then stable
  const flicker = frame < 50 ? (frame % 70 > 66 ? 0.65 : 1) : 1;

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {/* Horizontal scan */}
      <div style={{
        position: "absolute",
        top: "50%", left: `${scanX}%`,
        width: 100, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.6), transparent)",
        boxShadow: "0 0 10px rgba(0,212,255,0.3)",
        opacity: scanOpacity,
        transform: "translateY(-50%)",
      }} />

      {/* Section ID */}
      <div style={{
        fontFamily: "monospace",
        fontSize: 10,
        color: "rgba(0,212,255,0.4)",
        letterSpacing: "0.3em",
        marginBottom: 12,
        opacity: idOpacity,
        textTransform: "uppercase",
      }}>
        ▸ {sectionId}
      </div>

      {/* Title */}
      <div style={{
        fontSize: 48,
        fontWeight: 700,
        color: "#d4efff",
        textShadow: "0 0 10px rgba(0,212,255,0.4), 0 0 30px rgba(0,212,255,0.1)",
        opacity: titleOpacity * flicker,
        filter: `blur(${titleBlur}px) brightness(${titleBright})`,
        textAlign: "center",
        lineHeight: 1.1,
      }}>
        {title}
      </div>

      {/* Decorative line */}
      <div style={{
        width: 120,
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)",
        margin: "14px 0",
        transform: `scaleX(${lineScale})`,
      }} />

      {/* Subtitle */}
      {subtitle && (
        <div style={{
          fontFamily: "monospace",
          fontSize: 13,
          color: "rgba(90,143,170,0.8)",
          opacity: subOpacity,
          textAlign: "center",
        }}>
          {subtitle}
        </div>
      )}
    </AbsoluteFill>
  );
};
