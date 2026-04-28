"use client";

import { useEffect, useState } from "react";

const BACKGROUND_IMAGE_COUNT = 20;
const BACKGROUND_ROTATION_MS = 30000;

export function useBackground() {
  const [background, setBackground] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setBackground(Math.floor(Math.random() * BACKGROUND_IMAGE_COUNT));
    }, BACKGROUND_ROTATION_MS);
    return () => clearInterval(id);
  }, []);
  return String(background).padStart(2, "0");
}
