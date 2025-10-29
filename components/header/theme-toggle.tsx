// "use client";

// import { useEffect, useState } from "react";
// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "next-themes";
// import { motion } from "motion/react";

// import { Button } from "@/components/ui/button";

// const sunRotation = {
//   initial: { rotate: 0 },
//   animate: { rotate: 45 },
// };

// const moonRotation = {
//   initial: { rotate: 0 },
//   animate: { rotate: 30 },
// };

// const MotionButton = motion(Button);

// function ThemeToggle() {
//   const [mounted, setMounted] = useState(false);
//   const { resolvedTheme, setTheme } = useTheme();

//   const toggleTheme = () => {
//     setTheme(resolvedTheme === "light" ? "dark" : "light");
//   };

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return null;
//   }

//   return (
//     <MotionButton
//       onClick={toggleTheme}
//       variant='ghost'
//       size='icon'
//       className='text-muted-foreground [&_svg]:size-6 p:0 rounded-full hover:[svg]:rotate-180 transition-all'
//       whileHover='animate'
//       whileTap='animate'
//     >
//       {resolvedTheme === "dark" ? (
//         <motion.div variants={sunRotation} transition={{ duration: 0.5 }}>
//           <Sun />
//         </motion.div>
//       ) : (
//         <motion.div variants={moonRotation} transition={{ duration: 0.5 }}>
//           <Moon />
//         </motion.div>
//       )}
//     </MotionButton>
//   );
// }

// export default ThemeToggle;

"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "motion/react";

import { Button } from "@/components/ui/button";

const buttonAnimations = {
  initial: { rotate: 0 },
  hover: { rotate: 30 },
  tap: { rotate: 30 },
};

const iconAnimations = {
  exit: {
    scale: 0,
    rotate: -90,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  enter: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const MotionButton = motion(Button);

function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <MotionButton
      onClick={toggleTheme}
      variant='ghost'
      size='icon'
      className='text-muted-foreground [&_svg]:size-6 p-0 rounded-full relative overflow-visible'
      variants={buttonAnimations}
      initial='initial'
      whileHover='hover'
      whileTap='tap'
      transition={{ duration: 0.2 }}
    >
      <AnimatePresence mode='wait' initial={false}>
        <motion.div
          key={resolvedTheme}
          variants={iconAnimations}
          initial='exit'
          animate='enter'
          exit='exit'
          className='absolute inset-0 flex items-center justify-center'
        >
          {resolvedTheme === "dark" ? <Sun /> : <Moon />}
        </motion.div>
      </AnimatePresence>
    </MotionButton>
  );
}

export default ThemeToggle;
