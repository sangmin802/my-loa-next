import { useCallback, useEffect, useMemo, useState } from "react";
import { interval } from "utils/events/interval";
import { addZero } from "utils/util";

export const useTimer = (time, calcTimer) => {
  const [timer, setState] = useState(null);

  const setTimer = useCallback(
    time => {
      const gap = calcTimer(time);
      if (gap === null) return setState("종료");
      const _sec = 1000;
      const _min = _sec * 60;
      const _hour = _min * 60;
      const hour = Math.floor(gap / _hour);
      const min = Math.floor((gap % _hour) / _min);
      const sec = Math.floor((gap % _min) / _sec);

      setState(`${addZero(hour)}:${addZero(min)}:${addZero(sec)}`);
    },
    [setState, calcTimer]
  );

  const { startInterval, endInterval } = useMemo(() => {
    return interval(1, setTimer);
  }, [setTimer]);

  useEffect(() => {
    startInterval(time);
    return () => {
      endInterval();
    };
  }, [time, startInterval, endInterval]);

  return timer;
};
