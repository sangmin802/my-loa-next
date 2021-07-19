import { getEventData } from "api/api";
import { useMemo } from "react";
import { useQuery } from "react-query";

export function useEvent(initialData) {
  const option = useMemo(() => {
    const root = { refetchOnWindowFocus: false };

    if (initialData) return { ...root, initialData: JSON.parse(initialData) };
    return root;
  }, [initialData]);

  const { data: eventData } = useQuery(
    "fetchEventData",
    () => getEventData(),
    option
  );

  return eventData;
}
