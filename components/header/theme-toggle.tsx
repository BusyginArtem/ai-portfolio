"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";

const sunRotation = {
  initial: { rotate: 0 },
  animate: { rotate: 90 },
};

const moonRotation = {
  initial: { rotate: 0 },
  animate: { rotate: -90 },
};
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
    <Button
      onClick={toggleTheme}
      variant='ghost'
      size='icon'
      className='text-muted-foreground [&_svg]:size-6 p:0 rounded-full hover:[svg]:rotate-180 transition-all'
    >
      {resolvedTheme === "dark" ? (
        <motion.div
          initial={{ rotate: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ rotate: 45 }}
          whileTap={{ rotate: 45 }}
        >
          <Sun />
        </motion.div>
      ) : (
        <motion.div
          initial={{ rotate: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ rotate: 30 }}
          whileTap={{ rotate: 30 }}
        >
          <Moon />
        </motion.div>
      )}
    </Button>
  );
}

export default ThemeToggle;
