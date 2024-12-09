import React from "react";
import { motion } from "framer-motion";

import { animations } from "@/lib/animations";

interface AnimatedWrapperProps {
  children: React.ReactNode;
  animation:
    | "fadeIn"
    | "slideInFromTop"
    | "slideInFromBottom"
    | "zoomIn"
    | "fadeOut"
    | "slideOutToLeft"
    | "slideOutToRight"
    | "zoomOut"
    | "hoverGrow"
    | "hoverShrink"
    | "hoverRotate"
    | "hoverColorChange"
    | "tapScale"
    | "tapRotate"
    | "tapColorChange"
    | "scrollFadeIn"
    | "scrollSlideInFromLeft"
    | "scrollSlideInFromRight"
    | "scrollZoomIn"
    | "horizontalScrollSlideIn"
    | "horizontalScrollFadeIn"
    | "fadeInBlur"
    | "elasticScale"
    | "rotateInFadeIn"
    | "slideAndFlip"
    | "staggerChildren"
    | "pulseAndGrow"
    | "typewriter"
    | "morphShape"
    | "glitchEffect"
    | "floatingBubble";
  duration?: number;
  delay?: number;
  scale?: number;
  stiffness?: number;
  rotation?: number;
  color?: string;
  backgroundColor?: string;
  x?: number | string;
  y?: number | string;
  opacity?: number;
  blur?: number;
  skew?: number;
  [key: string]: any;
}

const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
  children,
  animation,
  ...props
}) => {
  const animationParams = {
    duration: props.duration,
    delay: props.delay,
    scale: props.scale,
    stiffness: props.stiffness,
    rotation: props.rotation,
    color: props.color,
    backgroundColor: props.backgroundColor,
    x: props.x,
    y: props.y,
    opacity: props.opacity,
    blur: props.blur,
    skew: props.skew,
  };

  const selectedAnimation = animations[animation](animationParams);

  return (
    <div>
      <motion.div
        initial="hidden"
        variants={selectedAnimation}
        viewport={{ once: false, amount: 0.5 }}
        whileInView="visible"
        {...props}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AnimatedWrapper;
