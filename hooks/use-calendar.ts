import { getCalendarData } from "api/api";
import { useQuery } from "react-query";

export function useCalendar(queryKey) {
  const { data: calendarData } = useQuery(queryKey, () => getCalendarData(), {
    refetchOnWindowFocus: false,
    suspense: true,
  });

  return calendarData;
}
