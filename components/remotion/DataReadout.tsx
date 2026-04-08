import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

function ArcGauge({ progress, radius, color, frame }: { progress: number; radius: number; color: string; frame: number }) {
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);
  // Continuous slow rotation after initial fill
  const rotation = frame > 50 ? (frame - 50) * 0.3 : 0;
  // Subtle pulse on the arc
  const pulse = frame > 50 ? Math.sin(frame * 0.05) * 0.08 + 0.92 : 1;

  return (
    <svg width={radius * 2 + 14} height={radius * 2 + 14} style={{ position: "absolute", top: "50%", left: "50%", transform: `translate(-50%, -50%) rotate(${-90 + rotation}deg)` }}>
      {/* Background ring */}
      <circle cx={radius + 7} cy={radius + 7} r={radius} fill="none" stroke="rgba(46,196,182,0.06)" strokeWidth={1.5} />
      {/* Tick marks */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * 360;
        const rad = (angle * Math.PI) / 180;
        const x1 = (radius + 7) + Math.cos(rad) * (radius - 3);
        const y1 = (radius + 7) + Math.sin(rad) * (radius - 3);
        const x2 = (radius + 7) + Math.cos(rad) * (radius + 1);
        const y2 = (radius + 7) + Math.sin(rad) * (radius + 1);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(46,196,182,0.08)" strokeWidth={0.5} />;
      })}
      {/* Progress arc */}
      <circle
        cx={radius + 7} cy={radius + 7} r={radius}
        fill="none" stroke={color} strokeWidth={2}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        opacity={pulse}
      />
      {/* Glowing dot at end of arc */}
      {progress > 0.05 && (
        <circle
          cx={radius + 7}
          cy={7}
          r={2.5}
          fill={color}
          style={{
            transformOrigin: `${radius + 7}px ${radius + 7}px`,
            transform: `rotate(${progress * 360}deg)`,
          }}
        />
      )}
    </svg>
  );
}

export const DataReadout: React.FC<{
  value: string;
  label: string;
  gaugeProgress?: number;
}> = ({ value, label, gaugeProgress = 0.75 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({ frame, fps, config: { damping: 20, stiffness: 80 }, from: 0, to: 1 });
  const scale = spring({ frame, fps, config: { damping: 15, stiffness: 60 }, from: 0.8, to: 1 });
  const gaugeAnim = interpolate(frame, [10, 50], [0, gaugeProgress], { extrapolateRight: "clamp" });

  // Number counting
  const numMatch = value.match(/(\d+)/);
  const targetNum = numMatch ? parseInt(numMatch[0]) : 0;
  const countProgress = interpolate(frame, [5, 40], [0, 1], { extrapolateRight: "clamp" });
  const currentNum = Math.round(targetNum * countProgress);
  const displayValue = numMatch ? value.replace(/\d+/, String(currentNum)) : value;

  // Scan flash
  const scanFlash = frame > 8 && frame < 12 ? 0.3 : 0;

  // Flicker only during init
  const flicker = frame < 50 ? (frame % 100 > 96 ? 0.7 : 1) : 1;

  // Continuous subtle glow pulse after init
  const glowPulse = frame > 50 ? Math.sin(frame * 0.04) * 0.15 + 0.85 : 1;

  return (
    <AbsoluteFill style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      opacity: opacity * flicker,
      transform: `scale(${scale})`,
    }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(46,196,182,0.1)", opacity: scanFlash }} />

      <ArcGauge progress={gaugeAnim} radius={52} color="rgba(46,196,182,0.4)" frame={frame} />

      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{
          fontFamily: "monospace",
          fontSize: 32,
          fontWeight: 700,
          color: "#2ec4b6",
          textShadow: `0 0 ${8 + glowPulse * 4}px rgba(46,196,182,${0.4 + glowPulse * 0.2}), 0 0 25px rgba(46,196,182,0.1)`,
          lineHeight: 1,
        }}>
          {displayValue}
        </div>
        <div style={{
          fontFamily: "monospace",
          fontSize: 11,
          color: "rgba(46,196,182,0.5)",
          letterSpacing: "0.12em",
          marginTop: 6,
          textTransform: "uppercase",
          maxWidth: 120,
        }}>
          {label}
        </div>
      </div>
    </AbsoluteFill>
  );
};
