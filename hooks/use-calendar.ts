import { getCalendarData } from "api/api";
import { useMemo } from "react";
import { useQuery } from "react-query";

export function useCalendar(rerenderKey, initialData) {
  const option = useMemo(() => {
    const root = { refetchOnWindowFocus: false };

    if (initialData) return { ...root, initialData: JSON.parse(initialData) };
    return root;
  }, [initialData]);

  const { data: calendarData } = useQuery(
    ["fetchCalendarData", rerenderKey],
    () => getCalendarData(),
    option
  );

  return calendarData;
}
