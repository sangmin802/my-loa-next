import { useCalendar } from "hooks/use-calendar";
import { useMemo } from "react";
import { SectionContainer, TimerContainer } from "components/";
import * as Styled from "styles/home.style";

const FetchCalendar = ({ isMidnight, initialData }) => {
  const yoil = isMidnight.getDay();
  const calendarData = useCalendar(isMidnight.getDate(), initialData);
  const isWeek = 6 > yoil && yoil > 0;
  const title = useMemo(() => {
    if (isWeek) return "11:00 ~ 21:00";
    return "09:00 ~ 23:00";
  }, [yoil, isWeek]);

  return (
    <Styled.Section>
      <SectionContainer title={title}>
        <TimerContainer
          data={
            isWeek ? calendarData.calendar[0] : calendarData.calendar[1] ?? []
          }
          rerenderKey={isMidnight}
        />
      </SectionContainer>
    </Styled.Section>
  );
};

export default FetchCalendar;
