import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";

// Dashed ring SVG
function DashedRing({ radius, dashCount, strokeWidth, rotation, opacity, color }: {
  radius: number; dashCount: number; strokeWidth: number; rotation: number; opacity: number; color: string;
}) {
  const circumference = 2 * Math.PI * radius;
  const dashLength = circumference / dashCount / 2;
  return (
    <circle
      cx="50%"
      cy="50%"
      r={radius}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeDasharray={`${dashLength} ${dashLength}`}
      opacity={opacity}
      transform={`rotate(${rotation} 250 250)`}
    />
  );
}

// Small tick marks around a ring
function TickRing({ radius, count, length, rotation, opacity }: {
  radius: number; count: number; length: number; rotation: number; opacity: number;
}) {
  const ticks = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * 360 + rotation;
    const rad = (angle * Math.PI) / 180;
    const x1 = 250 + Math.cos(rad) * radius;
    const y1 = 250 + Math.sin(rad) * radius;
    const x2 = 250 + Math.cos(rad) * (radius + length);
    const y2 = 250 + Math.sin(rad) * (radius + length);
    ticks.push(
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(0,212,255,0.3)" strokeWidth={0.5} opacity={opacity} />
    );
  }
  return <>{ticks}</>;
}

export const ArcReactor: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Core ignites (0-30 frames)
  const coreScale = spring({ frame, fps, config: { damping: 12, stiffness: 80 }, from: 0, to: 1 });
  const coreGlow = interpolate(frame, [0, 20, 30], [0, 1, 0.7], { extrapolateRight: "clamp" });

  // Phase 2: Inner ring expands (10-50 frames)
  const innerRingScale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 15, stiffness: 60 }, from: 0, to: 1 });
  const innerRingRotation = interpolate(frame, [10, 300], [0, 720]);

  // Phase 3: Middle rings appear (20-60 frames)
  const midRingScale = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 18, stiffness: 50 }, from: 0, to: 1 });
  const midRingRotation = interpolate(frame, [20, 300], [0, -540]);

  // Phase 4: Outer ring + ticks (30-70 frames)
  const outerRingScale = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 20, stiffness: 40 }, from: 0, to: 1 });
  const outerRotation = interpolate(frame, [30, 300], [0, 360]);
  const tickRotation = interpolate(frame, [30, 300], [0, -180]);

  // Phase 5: Data arcs (40-80 frames)
  const dataArcProgress = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 25, stiffness: 35 }, from: 0, to: 1 });

  // Continuous pulse on the core
  const pulse = Math.sin(frame * 0.08) * 0.15 + 0.85;

  // Flicker effect (occasional)
  const flicker = frame % 120 > 115 ? 0.6 : frame % 80 > 76 ? 0.7 : 1;

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="500" height="500" viewBox="0 0 500 500" style={{ opacity: flicker }}>
        {/* Outer glow */}
        <defs>
          <radialGradient id="coreGlow">
            <stop offset="0%" stopColor="rgba(0,212,255,0.4)" />
            <stop offset="50%" stopColor="rgba(0,212,255,0.1)" />
            <stop offset="100%" stopColor="rgba(0,212,255,0)" />
          </radialGradient>
          <filter id="blur">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <filter id="glow">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Background glow */}
        <circle cx="250" cy="250" r={200 * coreScale} fill="url(#coreGlow)" opacity={coreGlow * 0.5} />

        {/* Outer ring */}
        <circle
          cx="250" cy="250" r={220 * outerRingScale}
          fill="none" stroke="rgba(0,212,255,0.08)" strokeWidth={1}
          opacity={outerRingScale}
        />

        {/* Tick marks outer */}
        <TickRing radius={200 * outerRingScale} count={72} length={8} rotation={tickRotation} opacity={outerRingScale * 0.6} />

        {/* Data arcs — three partial arcs at different angles */}
        {[0, 120, 240].map((offset, idx) => {
          const arcR = 185;
          const sweep = 60 * dataArcProgress;
          const startAngle = offset + outerRotation * 0.5;
          const endAngle = startAngle + sweep;
          const startRad = (startAngle * Math.PI) / 180;
          const endRad = (endAngle * Math.PI) / 180;
          const x1 = 250 + Math.cos(startRad) * arcR;
          const y1 = 250 + Math.sin(startRad) * arcR;
          const x2 = 250 + Math.cos(endRad) * arcR;
          const y2 = 250 + Math.sin(endRad) * arcR;
          return (
            <path
              key={idx}
              d={`M ${x1} ${y1} A ${arcR} ${arcR} 0 0 1 ${x2} ${y2}`}
              fill="none"
              stroke="rgba(0,212,255,0.25)"
              strokeWidth={2}
              opacity={dataArcProgress}
            />
          );
        })}

        {/* Middle dashed ring */}
        <DashedRing
          radius={160 * midRingScale}
          dashCount={24}
          strokeWidth={1}
          rotation={midRingRotation}
          opacity={midRingScale * 0.5}
          color="rgba(0,212,255,0.3)"
        />

        {/* Middle solid ring */}
        <circle
          cx="250" cy="250" r={140 * midRingScale}
          fill="none" stroke="rgba(0,212,255,0.12)" strokeWidth={0.5}
          opacity={midRingScale}
        />

        {/* Inner dashed ring */}
        <DashedRing
          radius={110 * innerRingScale}
          dashCount={16}
          strokeWidth={1.5}
          rotation={innerRingRotation}
          opacity={innerRingScale * 0.6}
          color="rgba(0,212,255,0.4)"
        />

        {/* Inner ring */}
        <circle
          cx="250" cy="250" r={80 * innerRingScale}
          fill="none" stroke="rgba(0,212,255,0.15)" strokeWidth={1}
          opacity={innerRingScale}
        />

        {/* Tick marks inner */}
        <TickRing radius={75 * innerRingScale} count={36} length={5} rotation={innerRingRotation * 0.5} opacity={innerRingScale * 0.4} />

        {/* Core circle */}
        <circle
          cx="250" cy="250" r={30 * coreScale * pulse}
          fill="rgba(0,212,255,0.05)"
          stroke="rgba(0,212,255,0.5)"
          strokeWidth={1.5}
          filter="url(#blur)"
          opacity={coreScale}
        />

        {/* Core bright dot */}
        <circle
          cx="250" cy="250" r={8 * coreScale * pulse}
          fill="rgba(0,212,255,0.8)"
          filter="url(#glow)"
          opacity={coreScale * coreGlow}
        />

        {/* Core inner dot */}
        <circle
          cx="250" cy="250" r={3 * coreScale}
          fill="rgba(255,255,255,0.9)"
          opacity={coreScale}
        />
      </svg>
    </AbsoluteFill>
  );
};
