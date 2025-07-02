export const InputAnimation = {
  initial: { opacity: 0, x: -50, scale: 0.8 },
  animate: { opacity: 1, x: 0, scale: 1 },
  transition: {
    duration: 0.5,
    ease: [0.6, 0.01, -0.05, 0.95],
    type: "spring",
    stiffness: 100,
  },
  whileHover: { scale: 1.01 , transition: { duration: 0.2 } },
};

export const IconAnimation = {
  initial: { opacity: 0, scale: 0.5, rotate: -180 },
  animate: { opacity: 1, scale: 1, rotate: 0 },
  transition: {
    duration: 0.6,
    ease: "backOut",
    type: "spring",
    stiffness: 200,
  },
  whileHover: {
    scale: 1.1,
    rotate: 15,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  whileTap: { scale: 0.9 },
};

export const textAnimation = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.5,
    ease: [0.6, 0.01, -0.05, 0.95],
    type: "spring",
    stiffness: 100,
  },
  whileHover: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
};

export const ButtonAnimation = {
    initial:{ opacity: 0, y: 20 },
    animate:{ opacity: 1, y: 0 },
    transition:{ duration: 0.5, ease: 'easeInOut'  },
    whileHover:{ scale: 1.05, transition: { duration: 0.2, ease: 'easeInOut'}}
}