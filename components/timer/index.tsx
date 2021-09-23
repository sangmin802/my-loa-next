import React, { PropsWithChildren } from "react";
import { useTimer } from "hooks/use-timer";
import { useTimerType } from "hooks/use-timer-type";
import { Text, Image } from "components/";
import * as Styled from "./index.style";

interface IData {
  name: string;
  src: string;
  lv: string;
  time: string;
  endTime: string;
  position: string;
  endPosition: string;
}

interface ITimer<T> {
  setTime: (T: string) => void;
  data?: T;
}

const Timer = ({ setTime, data }: PropsWithChildren<ITimer<IData>>) => {
  const { name, src, lv, time, endTime, position, endPosition } = data;
  const pos =
    typeof position !== "string" ? position[0] || endPosition : position;
  const {
    timerVariable: { borderColor, contentAlert, endTimeBg },
    calcTimer,
  } = useTimerType(time, endTime, setTime);

  const timeOut = useTimer(time, calcTimer);

  return (
    <Styled.Container
      role="timer-border"
      data-border={borderColor}
      borderColor={borderColor}
    >
      <Styled.Background isShow={endTimeBg}></Styled.Background>
      <Styled.Title>
        <Text type="desc">{name}</Text>
      </Styled.Title>
      <Styled.Content>
        <Styled.TimerImg>
          <Image src={src} />
          <Styled.Lv>
            <Text type="small">{lv}</Text>
          </Styled.Lv>
        </Styled.TimerImg>
        <Styled.Time>
          <Text type="subTitle" role="timer-alert">
            {contentAlert}
          </Text>
          <Text type="subTitle" role="timeout" color="timeOut">
            {timeOut}
          </Text>
        </Styled.Time>
      </Styled.Content>
      <Styled.Position role="position">
        <Text type="desc">{pos}</Text>
      </Styled.Position>
    </Styled.Container>
  );
};

export default Timer;
