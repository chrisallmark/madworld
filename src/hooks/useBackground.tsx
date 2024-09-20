"use client";

import { useRain } from "@/hooks/useRain";
import { useEffect, useState } from "react";
import styled from "styled-components";

export function useBackground() {
  const [background, setBackground] = useState(0);
  const rain = useRain();
  useEffect(() => {
    const id = setTimeout(() => {
      setBackground(Math.floor(Math.random() * 20));
    }, 30000);
    return () => clearTimeout(id);
  }, [background]);
  return String(background).padStart(2, "0");
}
