import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

// Humanoid robot parts — each flies in from a direction and locks into place
// Inspired by Unitree G1 proportions + Iron Man armor assembly
const parts: {
  d: string;
  fill?: string;
  fromX: number;
  fromY: number;
  delay: number;
  label: string;
  labelPos?: { x: number; y: number };
}[] = [
  // === HEAD — drops from top ===
  {
    d: "M 388 95 C 388 75, 412 60, 420 60 C 428 60, 452 75, 452 95 L 452 115 C 452 125, 445 132, 420 132 C 395 132, 388 125, 388 115 Z",
    fill: "rgba(0,212,255,0.06)",
    fromX: 0, fromY: -120, delay: 0,
    label: "HEAD_UNIT",
    labelPos: { x: 520, y: 90 },
  },
  // Visor / eye band
  {
    d: "M 395 95 Q 420 88, 445 95 Q 420 102, 395 95",
    fill: "rgba(0,212,255,0.15)",
    fromX: 0, fromY: -120, delay: 3,
    label: "OPTICS_SYS",
    labelPos: { x: 520, y: 105 },
  },
  // === NECK — drops from top ===
  {
    d: "M 408 132 L 408 148 C 408 152, 432 152, 432 148 L 432 132",
    fromX: 0, fromY: -80, delay: 8,
    label: "",
  },
  // === TORSO — core, comes from center (scale up) ===
  {
    d: "M 375 148 C 372 148, 368 155, 368 165 L 365 230 C 365 240, 370 248, 380 252 L 385 255 L 455 255 L 460 252 C 470 248, 475 240, 475 230 L 472 165 C 472 155, 468 148, 465 148 Z",
    fill: "rgba(0,212,255,0.05)",
    fromX: 0, fromY: 0, delay: 12,
    label: "CORE_CHASSIS",
    labelPos: { x: 530, y: 195 },
  },
  // Chest arc reactor
  {
    d: "M 420 190 m -14 0 a 14 14 0 1 0 28 0 a 14 14 0 1 0 -28 0",
    fill: "rgba(0,212,255,0.1)",
    fromX: 0, fromY: 0, delay: 18,
    label: "ARC_REACTOR",
    labelPos: { x: 300, y: 195 },
  },
  // Chest panel indicators
  {
    d: "M 415 215 L 418 215 M 421 215 L 424 215 M 427 215 L 430 215",
    fromX: 0, fromY: 0, delay: 20,
    label: "",
  },
  // === WAIST / HIP — from below ===
  {
    d: "M 385 255 C 385 260, 388 268, 395 272 L 400 275 L 440 275 L 445 272 C 452 268, 455 260, 455 255",
    fill: "rgba(0,212,255,0.04)",
    fromX: 0, fromY: 40, delay: 22,
    label: "HIP_SERVO",
    labelPos: { x: 530, y: 265 },
  },
  // === LEFT SHOULDER — flies from left ===
  {
    d: "M 368 148 L 345 152 C 335 155, 328 162, 328 170 C 328 180, 335 186, 345 186 L 368 182",
    fill: "rgba(0,212,255,0.05)",
    fromX: -100, fromY: -30, delay: 16,
    label: "SHOULDER_L",
    labelPos: { x: 240, y: 165 },
  },
  // Left upper arm
  {
    d: "M 340 186 L 335 192 C 332 198, 330 210, 330 225 L 330 248 C 330 252, 334 255, 338 255 L 348 255 C 352 255, 355 252, 355 248 L 355 225 C 355 210, 352 198, 348 192 L 345 186",
    fill: "rgba(0,212,255,0.04)",
    fromX: -80, fromY: -20, delay: 24,
    label: "",
  },
  // Left elbow joint
  {
    d: "M 332 255 C 332 262, 338 268, 345 268 C 352 268, 358 262, 358 255",
    fromX: -60, fromY: 0, delay: 30,
    label: "ELBOW_L",
    labelPos: { x: 240, y: 262 },
  },
  // Left forearm
  {
    d: "M 334 268 L 332 310 C 332 315, 336 318, 340 318 L 350 318 C 354 318, 358 315, 358 310 L 356 268",
    fill: "rgba(0,212,255,0.04)",
    fromX: -50, fromY: 20, delay: 34,
    label: "",
  },
  // Left hand
  {
    d: "M 333 318 L 330 335 C 330 342, 335 348, 342 348 L 348 348 C 355 348, 360 342, 360 335 L 357 318",
    fill: "rgba(0,212,255,0.06)",
    fromX: -40, fromY: 30, delay: 40,
    label: "GRIP_L",
    labelPos: { x: 240, y: 340 },
  },
  // === RIGHT SHOULDER — flies from right ===
  {
    d: "M 472 148 L 495 152 C 505 155, 512 162, 512 170 C 512 180, 505 186, 495 186 L 472 182",
    fill: "rgba(0,212,255,0.05)",
    fromX: 100, fromY: -30, delay: 16,
    label: "SHOULDER_R",
    labelPos: { x: 560, y: 165 },
  },
  // Right upper arm
  {
    d: "M 500 186 L 505 192 C 508 198, 510 210, 510 225 L 510 248 C 510 252, 506 255, 502 255 L 492 255 C 488 255, 485 252, 485 248 L 485 225 C 485 210, 488 198, 492 192 L 495 186",
    fill: "rgba(0,212,255,0.04)",
    fromX: 80, fromY: -20, delay: 24,
    label: "",
  },
  // Right elbow
  {
    d: "M 482 255 C 482 262, 488 268, 495 268 C 502 268, 508 262, 508 255",
    fromX: 60, fromY: 0, delay: 30,
    label: "",
  },
  // Right forearm
  {
    d: "M 484 268 L 482 310 C 482 315, 486 318, 490 318 L 500 318 C 504 318, 508 315, 508 310 L 506 268",
    fill: "rgba(0,212,255,0.04)",
    fromX: 50, fromY: 20, delay: 34,
    label: "",
  },
  // Right hand
  {
    d: "M 483 318 L 480 335 C 480 342, 485 348, 492 348 L 498 348 C 505 348, 510 342, 510 335 L 507 318",
    fill: "rgba(0,212,255,0.06)",
    fromX: 40, fromY: 30, delay: 40,
    label: "GRIP_R",
    labelPos: { x: 560, y: 340 },
  },
  // === LEFT LEG — flies from bottom-left ===
  {
    d: "M 398 275 L 393 280 C 390 285, 388 300, 387 320 L 385 360 C 385 365, 388 370, 393 370 L 407 370 C 412 370, 415 365, 415 360 L 413 320 C 412 300, 410 285, 407 280 L 402 275",
    fill: "rgba(0,212,255,0.04)",
    fromX: -40, fromY: 80, delay: 28,
    label: "LEG_L",
    labelPos: { x: 280, y: 330 },
  },
  // Left knee
  {
    d: "M 384 370 C 384 378, 390 385, 400 385 C 410 385, 416 378, 416 370",
    fromX: -30, fromY: 60, delay: 36,
    label: "",
  },
  // Left shin
  {
    d: "M 386 385 L 384 430 C 384 435, 388 438, 392 438 L 408 438 C 412 438, 416 435, 416 430 L 414 385",
    fill: "rgba(0,212,255,0.04)",
    fromX: -20, fromY: 60, delay: 42,
    label: "",
  },
  // Left foot
  {
    d: "M 380 438 L 376 448 C 376 455, 382 460, 392 460 L 412 460 C 418 460, 420 455, 418 448 L 416 438",
    fill: "rgba(0,212,255,0.06)",
    fromX: -15, fromY: 50, delay: 48,
    label: "FOOT_L",
    labelPos: { x: 280, y: 455 },
  },
  // === RIGHT LEG — flies from bottom-right ===
  {
    d: "M 438 275 L 433 280 C 430 285, 428 300, 427 320 L 425 360 C 425 365, 428 370, 433 370 L 447 370 C 452 370, 455 365, 455 360 L 453 320 C 452 300, 450 285, 447 280 L 442 275",
    fill: "rgba(0,212,255,0.04)",
    fromX: 40, fromY: 80, delay: 28,
    label: "LEG_R",
    labelPos: { x: 560, y: 330 },
  },
  // Right knee
  {
    d: "M 424 370 C 424 378, 430 385, 440 385 C 450 385, 456 378, 456 370",
    fromX: 30, fromY: 60, delay: 36,
    label: "",
  },
  // Right shin
  {
    d: "M 426 385 L 424 430 C 424 435, 428 438, 432 438 L 448 438 C 452 438, 456 435, 456 430 L 454 385",
    fill: "rgba(0,212,255,0.04)",
    fromX: 20, fromY: 60, delay: 42,
    label: "",
  },
  // Right foot
  {
    d: "M 420 438 L 418 448 C 418 455, 422 460, 432 460 L 452 460 C 458 460, 462 455, 460 448 L 456 438",
    fill: "rgba(0,212,255,0.06)",
    fromX: 15, fromY: 50, delay: 48,
    label: "FOOT_R",
    labelPos: { x: 560, y: 455 },
  },
];

const diagnostics = [
  { x: 240, y: 90, label: "NEURAL_NET", value: "98.2%", delay: 55 },
  { x: 240, y: 195, label: "POWER_OUT", value: "4.2 kW", delay: 60 },
  { x: 240, y: 262, label: "TORQUE", value: "320 Nm", delay: 65 },
  { x: 560, y: 195, label: "RESPONSE", value: "12 ms", delay: 58 },
  { x: 560, y: 265, label: "BALANCE", value: "STABLE", delay: 63 },
  { x: 560, y: 340, label: "GRIP_F", value: "45 N", delay: 68 },
];

export const RobotSchematic: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = spring({ frame, fps, config: { damping: 20, stiffness: 80 }, from: 0, to: 1 });
  const statusOp = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 20, stiffness: 60 }, from: 0, to: 1 });
  const pulse = frame > 75 ? Math.sin(frame * 0.04) * 0.08 + 0.92 : 1;

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="800" height="520" viewBox="200 40 440 440">
        <defs>
          <filter id="partGlow"><feGaussianBlur stdDeviation="3" /></filter>
          <filter id="softGlow"><feGaussianBlur stdDeviation="1.5" /></filter>
        </defs>

        {/* Title */}
        <text x="420" y="58" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(0,212,255,0.4)" letterSpacing="3" opacity={titleOp}>
          HUMANOID_SCHEMATIC // G1_CLASS
        </text>

        {/* Center line guides — appear first */}
        <line x1="420" y1="65" x2="420" y2="470" stroke="rgba(0,212,255,0.04)" strokeWidth="0.5" strokeDasharray="3 6"
          opacity={interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" })} />

        {/* Robot parts — fly in and assemble */}
        {parts.map((part, i) => {
          const localFrame = Math.max(0, frame - part.delay);
          const arrival = spring({ frame: localFrame, fps, config: { damping: 14, stiffness: 45 }, from: 0, to: 1 });
          const tx = part.fromX * (1 - arrival);
          const ty = part.fromY * (1 - arrival);
          const op = interpolate(localFrame, [0, 8], [0, 1], { extrapolateRight: "clamp" });

          return (
            <g key={i} opacity={op * pulse} transform={`translate(${tx}, ${ty})`}>
              {/* Glow */}
              <path d={part.d} fill="none" stroke="rgba(0,212,255,0.12)" strokeWidth={4} filter="url(#partGlow)" />
              {/* Main */}
              <path d={part.d} fill={part.fill || "none"} stroke="rgba(0,212,255,0.55)" strokeWidth={1.2} strokeLinejoin="round" strokeLinecap="round" />
            </g>
          );
        })}

        {/* Arc reactor glow pulse */}
        {frame > 20 && (
          <circle cx="420" cy="190" r={interpolate(frame, [20, 30], [0, 18], { extrapolateRight: "clamp" })}
            fill="none" stroke="rgba(0,212,255,0.2)" strokeWidth={1}
            opacity={pulse} filter="url(#softGlow)" />
        )}

        {/* Diagnostic readouts */}
        {diagnostics.map((diag, i) => {
          const localFrame = Math.max(0, frame - diag.delay);
          const diagOp = spring({ frame: localFrame, fps, config: { damping: 20, stiffness: 80 }, from: 0, to: 1 });
          const isLeft = diag.x < 400;

          return (
            <g key={`d${i}`} opacity={diagOp}>
              <text x={diag.x} y={diag.y} fontFamily="monospace" fontSize="7" fill="rgba(0,212,255,0.3)" letterSpacing="1" textAnchor={isLeft ? "end" : "start"}>
                {diag.label}
              </text>
              <text x={diag.x} y={diag.y + 12} fontFamily="monospace" fontSize="11" fontWeight="bold" fill="rgba(0,212,255,0.75)" textAnchor={isLeft ? "end" : "start"}>
                {diag.value}
              </text>
              {/* Connecting dot line */}
              <line x1={isLeft ? diag.x + 8 : diag.x - 8} y1={diag.y + 4}
                x2={isLeft ? 370 : 470} y2={diag.y + 4}
                stroke="rgba(0,212,255,0.1)" strokeWidth={0.5} strokeDasharray="2 4" />
            </g>
          );
        })}

        {/* Status */}
        <g opacity={statusOp}>
          <text x="420" y="472" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(74,222,128,0.7)" letterSpacing="2">
            ✓ ASSEMBLY COMPLETE — ALL SYSTEMS NOMINAL
          </text>
          {/* Progress bar */}
          <rect x="340" y="478" width="160" height="2" rx="1" fill="rgba(0,212,255,0.08)" />
          <rect x="340" y="478" width={160 * statusOp} height="2" rx="1" fill="rgba(0,212,255,0.35)" />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
