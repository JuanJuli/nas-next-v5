'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '@/store/theme';

interface FloatingBubblesProps {
  count?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  className?: string;
}

interface BubbleConfig {
  id: number;
  startX: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
}

export default function FloatingBubbles({
  count = 10,
  minSize = 20,
  maxSize = 60,
  speed = 12,
  className,
}: FloatingBubblesProps) {
  const color = useThemeStore((s) => s.primaryColor)

  const bubbles = useMemo<BubbleConfig[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      startX: Math.random() * 100,
      size: minSize + Math.random() * (maxSize - minSize),
      duration: speed * 0.7 + Math.random() * (speed * 0.6),
      delay: Math.random() * 10,
      driftX: -40 + Math.random() * 80,
    }));
  }, [count, minSize, maxSize, speed]);

  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    setViewportHeight(window.innerHeight);
  }, []);

  return (
    <div
      className={className}
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          style={{
            position: 'absolute',
            left: `${bubble.startX}%`,
            bottom: 0,
            width: bubble.size,
            height: bubble.size,
            borderRadius: '50%',
            background: `radial-gradient(circle at 30% 30%, ${color}33, ${color}11)`,
            border: `1px solid ${color}22`,
            boxShadow: `inset 0 0 ${bubble.size * 0.15}px ${color}44`,
            willChange: 'transform',
            userSelect: 'none',
          }}
          animate={{
            y: [0, -(viewportHeight + bubble.size * 2)],
            x: [0, bubble.driftX],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
