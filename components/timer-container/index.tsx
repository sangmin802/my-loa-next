import React, { PropsWithChildren } from "react";
import { useNewTime } from "hooks/use-newtime";
import { Text, Timer, ConditionalContainer, MapContainer } from "components/";
import * as Styled from "./index.style";

interface ITimerContainer {
  data: any[];
  rerenderKey?: null | Date;
}

const TimerContainer = ({
  data,
  rerenderKey,
}: PropsWithChildren<ITimerContainer>) => {
  const { setTime } = useNewTime();
  const date = new Date();
  const isMustUseBefore =
    rerenderKey && date.getDate() !== rerenderKey.getDate() ? true : false;
  const min =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const now = Number(String(date.getHours()) + String(min));

  const replacedData = data
    .map(d => {
      let cachedTime = isMustUseBefore ? [...d.additionalTime] : [...d.time];
      let cachedPosition =
        typeof d.position !== "string" ? [...d.position] : d.position;
      // 앞에서부터 종료된 시간은 제거
      while (Number(replaceColon(cachedTime[0])) + 3 <= now) {
        if (typeof d.position !== "string") cachedPosition.shift();
        cachedTime.shift();

        // 모든 시간이 현재시간보다 작다면, 자정지난 첫 컨텐츠로 실행
        if (!cachedTime.length && !rerenderKey) {
          cachedTime = [...d.time];
          cachedPosition =
            typeof d.position !== "string" ? [...d.position] : d.position;
          break;
        }
        if (!cachedTime.length && d.additionalTime) {
          cachedTime = [...d.additionalTime];
          cachedPosition = d.position;
          break;
        }
      }
      return {
        ...d,
        time: cachedTime,
        position: cachedPosition,
      };
    })
    .sort((a, b) => {
      // 종료시간이 현재시간보다 이전의 시간일 경우 내일의 시간이므로 +2400
      const time_a = beforeCurTime(replaceColon(a.time[0]), now);
      const time_b = beforeCurTime(replaceColon(b.time[0]), now);

      if (time_b !== 0 && !time_b) return -1;
      if (time_a > time_b) return 1;
      if (time_a < time_b) return -1;

      return 0;
    });

  const dataLength = replacedData.length;
  return (
    <>
      <ConditionalContainer isRender={dataLength === 0}>
        <Styled.Alert>
          <Text>다음에 만나요</Text>
        </Styled.Alert>
      </ConditionalContainer>
      <ConditionalContainer isRender={dataLength !== 0}>
        <Styled.Container role="timer-container">
          <MapContainer data={replacedData}>
            <Timer setTime={setTime} />
          </MapContainer>
        </Styled.Container>
      </ConditionalContainer>
    </>
  );
};

function replaceColon(string) {
  return Number(string?.replace(":", ""));
}

function beforeCurTime(time, now) {
  return time + 3 <= now ? (time += 2400) : time;
}

export default React.memo(TimerContainer, (prev, next) => {
  // 리셋타임은 6시
  if (prev.rerenderKey !== next.rerenderKey) return false;
  return true;
});
