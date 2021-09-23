import { useState, useCallback, useMemo } from "react";

export const useTimerType = (time, endTime, setTime) => {
  const [timerType, setState] = useState("NORMAL");

  const calcTimer = useCallback(
    timeArr => {
      const time = timeArr[0] ?? null;
      if (!time) {
        setState("END");
        return null;
      }
      const now = new Date();
      const [hour, min] = time.split(":");
      const year = now.getFullYear();
      const month = now.getMonth();
      const date = now.getDate();
      const additionalTime = 1000 * 60 * 60 * 24;
      const closeTime = new Date(
        year,
        month,
        date,
        hour,
        min * 1 + 3
      ).getTime(); // 종료 시간 = 시작시간+3
      let gap = Math.ceil((closeTime - now.getTime()) / 1000) * 1000;

      // 자정 이후
      if (gap < -10000) {
        gap =
          Math.ceil((closeTime + additionalTime - now.getTime()) / 1000) * 1000;
      }

      // NORMAL
      if (gap >= 780000) {
        setState("NORMAL");
        return gap - 180000;
      }

      // READY 10분
      if (180000 <= gap && gap < 780000) {
        setState("READY");
        return gap - 180000;
      }

      // START 3분
      if (0 <= gap && gap < 180000) {
        setState("START");
        return gap;
      }

      // 종료
      if (gap < 0) {
        setState("CLOSE");
        setTime(time);
        return gap;
      }
    },
    [setState, setTime]
  );

  const timerVariables = useMemo(
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

  const timerVariable = useMemo(() => timerVariables[timerType], [
    timerType,
    timerVariables,
  ]);

  return { timerVariable, calcTimer };
};
