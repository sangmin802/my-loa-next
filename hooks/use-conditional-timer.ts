import { useState, useCallback, useMemo } from "react";

export function useConditionalTimer(time, endTime, setTime) {
  const [timerType, setTimerType] = useState("NORMAL");

  const calcConditionalRestTime = useCallback(
    (closeTime, now, time) => {
      const additionalTime = 1000 * 60 * 60 * 24;

      // 자정 이후
      if (time < -10000) {
        time =
          Math.ceil((closeTime + additionalTime - now.getTime()) / 1000) * 1000;
      }

      // NORMAL
      if (time >= 780000) {
        setTimerType("NORMAL");
        return time - 180000;
      }

      // READY 10분
      if (180000 <= time && time < 780000) {
        setTimerType("READY");
        return time - 180000;
      }

      // START 3분
      if (0 <= time && time < 180000) {
        setTimerType("START");
        return time;
      }

      // 해당 시간 끝
      if (time < 0) {
        setTimerType("CLOSE");
        setTime(time);
        return null;
      }
    },
    [setTime]
  );

  const timerTypes = useMemo(
    () => ({
      READY: {
        borderColor: "#d333ff",
        endTimeBg: false,
        contentAlert: "컨텐츠 준비중",
      },
      START: {
        borderColor: "#0adb18",
        endTimeBg: false,
        contentAlert: "컨텐츠 진행중",
      },
      CLOSE: {
        borderColor: "#FF6666",
        endTimeBg: false,
        contentAlert: "컨텐츠 종료",
      },
      NORMAL: {
        borderColor: "",
        endTimeBg: false,
        contentAlert: time[0],
      },
      END: {
        borderColor: "",
        endTimeBg: true,
        contentAlert: endTime,
      },
    }),
    [time, endTime]
  );

  const calcCloseTime = useCallback((time, now) => {
    if (!time) return null;
    const [hour, min] = time.split(":");
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    return new Date(year, month, date, hour, min * 1 + 3).getTime();
  }, []);

  return [
    timerTypes[timerType],
    calcConditionalRestTime,
    calcCloseTime,
    setTimerType,
    timerType,
  ];
}
