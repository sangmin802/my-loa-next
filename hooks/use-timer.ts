import { useCallback, useState } from "react";

export function useTimer() {
  const [restTime, setRestTimeProps] = useState(null);

  const calcTimer = useCallback(endTime => {
    return Math.ceil((endTime - new Date().getTime()) / 1000) * 1000;
  }, []);

  const calcRestTimeProps = useCallback(time => {
    const _sec = 1000;
    const _min = _sec * 60;
    const _hour = _min * 60;
    const hour = Math.floor(time / _hour);
    const min = Math.floor((time % _hour) / _min);
    const sec = Math.floor((time % _min) / _sec);

    time !== null
      ? setRestTimeProps({
          hour: addZero(hour),
          min: addZero(min),
          sec: addZero(sec),
        })
      : setRestTimeProps(null);
  }, []);

  return [restTime, calcTimer, calcRestTimeProps];
}

function addZero(num) {
  if (num < 10) {
    return "0" + num;
  }
  return num;
}
