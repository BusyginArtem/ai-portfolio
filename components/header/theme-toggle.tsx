"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
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
    <Button onClick={toggleTheme} variant='ghost' size='icon' className='text-muted-foreground [&_svg]:size-6 p:0'>
      {resolvedTheme === "dark" ? <Sun className='w-24 h-24' /> : <Moon className='w-24 h-24' />}
    </Button>
  );
}

export default ThemeToggle;
