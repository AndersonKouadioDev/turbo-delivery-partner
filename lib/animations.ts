import { Variants } from "framer-motion";

interface AnimationParams {
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
  staggerChildren?: number;
}

type AnimationFunction = (params?: AnimationParams) => Variants;

export const animations: { [key: string]: AnimationFunction } = {
  // Animations à l'affichage
  fadeIn: ({ duration = 1, delay = 0 }: AnimationParams = {}) => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration, delay, ease: "easeOut" } },
  }),
  slideInFromTop: ({ duration = 1, delay = 0 }: AnimationParams = {}) => ({
    hidden: { y: -100, opacity: 1 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration, delay, type: "spring", stiffness: 70 },
    },
  }),
  slideInFromBottom: ({ duration = 1, delay = 0 }: AnimationParams = {}) => ({
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration, delay, type: "spring", stiffness: 70 },
    },
  }),
  zoomIn: ({ duration = 0.5, delay = 0 }: AnimationParams = {}) => ({
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration, delay, ease: "easeOut" } },
  }),

  // Animations à la disparition
  fadeOut: ({ duration = 1, delay = 0 }: AnimationParams = {}) => ({
    hidden: { opacity: 1 },
    visible: { opacity: 0, transition: { duration, delay, ease: "easeIn" } },
  }),
  slideOutToLeft: ({ duration = 1, delay = 0 }: AnimationParams = {}) => ({
    hidden: { x: 0 },
    visible: {
      x: "-100vw",
      transition: { duration, delay, type: "spring", stiffness: 70 },
    },
  }),
  slideOutToRight: ({ duration = 1, delay = 0 }: AnimationParams = {}) => ({
    hidden: { x: 0 },
    visible: {
      x: "100vw",
      transition: { duration, delay, type: "spring", stiffness: 70 },
    },
  }),
  zoomOut: ({ duration = 0.5, delay = 0 }: AnimationParams = {}) => ({
    hidden: { scale: 1 },
    visible: { scale: 0, transition: { duration, delay, ease: "easeIn" } },
  }),

  // Animations au survol
  hoverGrow: ({ scale = 1.1, stiffness = 300 }: AnimationParams = {}) => ({
    rest: { scale: 1 },
    hover: { scale, transition: { type: "spring", stiffness } },
  }),
  hoverShrink: ({ scale = 0.9, stiffness = 300 }: AnimationParams = {}) => ({
    rest: { scale: 1 },
    hover: { scale, transition: { type: "spring", stiffness } },
  }),
  hoverRotate: ({ rotation = 360, duration = 0.5 }: AnimationParams = {}) => ({
    rest: { rotate: 0 },
    hover: { rotate: rotation, transition: { duration, ease: "easeInOut" } },
  }),
  hoverColorChange: ({
    color = "#f00",
    duration = 0.3,
  }: AnimationParams = {}) => ({
    rest: { color: "#000" },
    hover: { color, transition: { duration, ease: "easeInOut" } },
  }),

  // Animations au clic
  tapScale: ({ scale = 0.9, duration = 0.1 }: AnimationParams = {}) => ({
    rest: { scale: 1 },
    tap: { scale, transition: { duration, ease: "easeOut" } },
  }),
  tapRotate: ({ rotation = 45, duration = 0.2 }: AnimationParams = {}) => ({
    rest: { rotate: 0 },
    tap: { rotate: rotation, transition: { duration, ease: "easeInOut" } },
  }),
  tapColorChange: ({
    backgroundColor = "#f00",
    duration = 0.2,
  }: AnimationParams = {}) => ({
    rest: { backgroundColor: "#fff" },
    tap: { backgroundColor, transition: { duration, ease: "easeInOut" } },
  }),

  // Animations au défilement vertical
  scrollFadeIn: ({ duration = 1, delay = 0 }: AnimationParams = {}) => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration, delay, ease: "easeOut" } },
  }),
  scrollSlideInFromLeft: ({
    duration = 1,
    delay = 0,
  }: AnimationParams = {}) => ({
    hidden: { x: "-100vw" },
    visible: {
      x: 0,
      transition: { duration, delay, type: "spring", stiffness: 70 },
    },
  }),
  scrollSlideInFromRight: ({
    duration = 1,
    delay = 0,
  }: AnimationParams = {}) => ({
    hidden: { x: "100vw" },
    visible: {
      x: 0,
      transition: { duration, delay, type: "spring", stiffness: 70 },
    },
  }),
  scrollZoomIn: ({ duration = 0.5, delay = 0 }: AnimationParams = {}) => ({
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration, delay, ease: "easeOut" } },
  }),

  // Animations au défilement horizontal
  horizontalScrollSlideIn: ({
    duration = 1,
    delay = 0,
  }: AnimationParams = {}) => ({
    hidden: { x: "100vw" },
    visible: {
      x: 0,
      transition: { duration, delay, type: "spring", stiffness: 70 },
    },
  }),
  horizontalScrollFadeIn: ({
    duration = 1,
    delay = 0,
  }: AnimationParams = {}) => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration, delay, ease: "easeOut" } },
  }),
  fadeInBlur: ({
    duration = 1,
    delay = 0,
    blur = 10,
  }: AnimationParams = {}) => ({
    hidden: { opacity: 0, filter: `blur(${blur}px)` },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration, delay, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  }),

  elasticScale: ({
    duration = 0.8,
    delay = 0,
    scale = 0.5,
  }: AnimationParams = {}) => ({
    hidden: { scale: scale },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        duration,
        delay,
        bounce: 0.5,
      },
    },
  }),

  rotateInFadeIn: ({
    duration = 1,
    delay = 0,
    rotation = 180,
  }: AnimationParams = {}) => ({
    hidden: { opacity: 0, rotate: rotation },
    visible: {
      opacity: 1,
      rotate: 0,
      transition: { duration, delay, ease: [0.6, 0.01, -0.05, 0.95] },
    },
  }),

  slideAndFlip: ({
    duration = 1,
    delay = 0,
    x = "-100%",
  }: AnimationParams = {}) => ({
    hidden: { x, rotateY: 90 },
    visible: {
      x: 0,
      rotateY: 0,
      transition: { duration, delay, ease: "easeOut" },
    },
  }),

  staggerChildren: ({
    duration = 0.5,
    staggerChildren = 0.1,
  }: AnimationParams = {}) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: duration,
      },
    },
  }),

  pulseAndGrow: ({ duration = 2, scale = 1.05 }: AnimationParams = {}) => ({
    hidden: { scale: 1, opacity: 0.5 },
    visible: {
      scale: [1, scale, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }),

  typewriter: ({ duration = 2 }: AnimationParams = {}) => ({
    hidden: { width: "0%", opacity: 0 },
    visible: {
      width: "100%",
      opacity: 1,
      transition: { duration, ease: "linear" },
    },
  }),

  morphShape: ({ duration = 2 }: AnimationParams = {}) => ({
    hidden: { borderRadius: "0%" },
    visible: {
      borderRadius: ["0%", "50%", "0%", "25%", "0%"],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }),

  glitchEffect: ({ duration = 0.2 }: AnimationParams = {}) => ({
    hidden: { skew: 0, opacity: 1 },
    visible: {
      skew: [0, 10, -10, 0],
      opacity: [1, 0.8, 0.9, 1],
      transition: {
        duration,
        repeat: Infinity,
        repeatType: "mirror",
      },
    },
  }),

  floatingBubble: ({ duration = 4, y = 20 }: AnimationParams = {}) => ({
    hidden: { y: 0 },
    visible: {
      y: [0, -y, 0],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }),
};
