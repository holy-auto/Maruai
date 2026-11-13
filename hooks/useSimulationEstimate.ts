import { useState, useEffect, useCallback } from "react";

type Listener = (estimate: number) => void;
const listeners = new Set<Listener>();
let currentEstimate = 75;

export function updateSimulationEstimate(estimate: number) {
  currentEstimate = estimate;
  listeners.forEach((fn) => fn(estimate));
}

export function useSimulationEstimate(): number {
  const [value, setValue] = useState(currentEstimate);

  useEffect(() => {
    const handler: Listener = (v) => setValue(v);
    listeners.add(handler);
    return () => {
      listeners.delete(handler);
    };
  }, []);

  return value;
}