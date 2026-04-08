"use client";

import { useRef, useState, useEffect, useMemo, ComponentType } from "react";
import { Player } from "@remotion/player";

interface RemotionInViewProps<T extends Record<string, unknown>> {
  component: ComponentType<T>;
  inputProps: T;
  durationInFrames: number;
  width: number;
  height: number;
  fps?: number;
  loop?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function RemotionInView<T extends Record<string, unknown>>({
  component,
  inputProps,
  durationInFrames,
  width,
  height,
  fps = 30,
  loop = false,
  className,
  style,
}: RemotionInViewProps<T>) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  // Stable inputProps reference
  const stableProps = useMemo(() => inputProps, [JSON.stringify(inputProps)]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed) {
          setVisible(true);
          setHasPlayed(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasPlayed]);

  return (
    <div ref={ref} className={className} style={style}>
      {visible && (
        <Player
          component={component}
          inputProps={stableProps}
          durationInFrames={durationInFrames}
          compositionWidth={width}
          compositionHeight={height}
          fps={fps}
          autoPlay
          loop={loop}
          moveToBeginningWhenEnded={false}
          controls={false}
          style={{ width: "100%", height: "100%", background: "transparent" }}
        />
      )}
    </div>
  );
}
