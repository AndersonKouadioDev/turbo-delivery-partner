"use client";

import React, { MutableRefObject, ReactNode } from "react";
import { motion, Variants } from "framer-motion";

type VariantCreator = (params?: any) => Variants;

interface MotionProps {
  variant?: keyof typeof variantCreators;
  children?: ReactNode;
  className?: string;
  ref?: MutableRefObject<null>;
  animationParams?: AnimationParams;
  viewport?: { once: boolean; amount: number };
}

const Motion: React.FC<MotionProps> = ({
  variant = "fadeIn",
  children,
  className,
  ref,
  animationParams = {},
  viewport = { once: true, amount: 0.5 },
}) => {
  const createVariant = variantCreators[variant] as VariantCreator;
  const variants = createVariant(animationParams);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Motion;

export interface AnimationParams {
  duration?: number;
  delay?: number;
  ease?: string;
  offset?: number;
}

const variantCreators = {
  // Fade In
  fadeIn: ({ duration = 0.8, delay = 0 }: AnimationParams = {}): Variants => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration, delay } },
  }),

  // Slide In Vertical (To or Bottom)
  verticalSlideIn: ({
    duration = 0.8,
    delay = 0,
    ease = "easeOut",
    offset = 50,
  }: AnimationParams = {}): Variants => ({
    hidden: { y: offset, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration, ease, delay } },
  }),

  // Slide In Horizontal (Left or Right)
  horizontalSlideIn: ({
    duration = 0.8,
    delay = 0,
    ease = "easeOut",
    offset = 50,
  }: AnimationParams = {}): Variants => ({
    hidden: { x: offset, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration, ease, delay } },
  }),

  // Rotate In
  rotateIn: ({
    duration = 1,
    ease = "easeOut",
    delay = 0,
  }: AnimationParams = {}): Variants => ({
    hidden: { rotate: -180, opacity: 0 },
    visible: {
      rotate: 0,
      opacity: 1,
      transition: { duration, ease, delay },
    },
  }),
};
