"use client";

import { useEffect, useState } from "react";

export function useBackground() {
  const [background, setBackground] = useState(0);
  useEffect(() => {
    const id = setTimeout(() => {
      setBackground(Math.floor(Math.random() * 20));
    }, 30000);
    return () => clearTimeout(id);
  }, [background]);
  return String(background).padStart(2, "0");
}
