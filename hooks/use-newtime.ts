import { useState, useCallback } from "react";

export function useNewTime() {
  const [, setState] = useState(null);

  const setTime = useCallback((time: string) => {
    setState(time);
  }, []);

  return { setTime };
}
