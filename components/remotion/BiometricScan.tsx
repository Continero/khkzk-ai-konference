import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const BiometricScan: React.FC<{
  status: "confirmed" | "pending";
  speakerId: string;
}> = ({ status, speakerId }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scan line sweeps down
  const scanY = interpolate(frame, [0, 40], [0, 100], { extrapolateRight: "clamp" });
  const scanOpacity = interpolate(frame, [0, 5, 35, 40], [0, 0.8, 0.8, 0], { extrapolateRight: "clamp" });

  // Corner brackets draw in
  const bracketSize = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 15, stiffness: 60 }, from: 0, to: 1 });

  // Status text appears
  const statusOpacity = spring({ frame: Math.max(0, frame - 35), fps, config: { damping: 20, stiffness: 80 }, from: 0, to: 1 });

  // Arc around image
  const arcProgress = interpolate(frame, [10, 50], [0, 1], { extrapolateRight: "clamp" });
  const arcRadius = 70;
  const arcCircumference = 2 * Math.PI * arcRadius;

  // Flicker
  const flicker = frame % 80 > 76 ? 0.6 : frame % 120 > 116 ? 0.7 : 1;

  // ID blink
  const idBlink = frame % 40 > 35 ? 0 : 1;

  const statusColor = status === "confirmed" ? "rgba(74,222,128,0.7)" : "rgba(251,191,36,0.7)";

  return (
    <AbsoluteFill style={{ opacity: flicker }}>
      {/* Scan line */}
      <div style={{
        position: "absolute",
        left: 0, right: 0,
        top: `${scanY}%`,
        height: 2,
        background: `linear-gradient(90deg, transparent 0%, rgba(46,196,182,0.6) 20%, rgba(46,196,182,0.8) 50%, rgba(46,196,182,0.6) 80%, transparent 100%)`,
        boxShadow: "0 0 12px rgba(46,196,182,0.4)",
        opacity: scanOpacity,
        pointerEvents: "none",
      }} />

      {/* Corner brackets */}
      {[
        { top: 4, left: 4, borderTop: true, borderLeft: true },
        { top: 4, right: 4, borderTop: true, borderRight: true },
        { bottom: 4, left: 4, borderBottom: true, borderLeft: true },
        { bottom: 4, right: 4, borderBottom: true, borderRight: true },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...Object.fromEntries(Object.entries(pos).filter(([k]) => ["top", "left", "right", "bottom"].includes(k)).map(([k, v]) => [k, v])),
            width: 16 * bracketSize,
            height: 16 * bracketSize,
            borderColor: "rgba(46,196,182,0.4)",
            borderStyle: "solid",
            borderWidth: 0,
            ...(pos.borderTop ? { borderTopWidth: 1 } : {}),
            ...(pos.borderBottom ? { borderBottomWidth: 1 } : {}),
            ...(pos.borderLeft ? { borderLeftWidth: 1 } : {}),
            ...(pos.borderRight ? { borderRightWidth: 1 } : {}),
          }}
        />
      ))}

      {/* Circular arc */}
      <svg
        width="100%" height="100%"
        viewBox="0 0 160 160"
        style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%) rotate(-90deg)", opacity: 0.5 }}
      >
        <circle
          cx="80" cy="80" r={arcRadius}
          fill="none" stroke="rgba(46,196,182,0.1)" strokeWidth={1}
        />
        <circle
          cx="80" cy="80" r={arcRadius}
          fill="none" stroke="rgba(46,196,182,0.35)" strokeWidth={1.5}
          strokeDasharray={arcCircumference}
          strokeDashoffset={arcCircumference * (1 - arcProgress)}
          strokeLinecap="round"
        />
      </svg>

      {/* Speaker ID */}
      <div style={{
        position: "absolute", bottom: 8, left: 10,
        fontFamily: "monospace", fontSize: 11,
        color: "rgba(46,196,182,0.5)",
        opacity: idBlink,
      }}>
        {speakerId}
      </div>

      {/* Status badge */}
      <div style={{
        position: "absolute", top: 8, right: 8,
        fontFamily: "monospace", fontSize: 11,
        color: statusColor,
        padding: "2px 8px",
        border: `1px solid ${statusColor.replace("0.7", "0.3")}`,
        background: statusColor.replace("0.7", "0.1"),
        opacity: statusOpacity,
        letterSpacing: "0.1em",
      }}>
        {status === "confirmed" ? "CONFIRMED" : "PENDING"}
      </div>
    </AbsoluteFill>
  );
};
