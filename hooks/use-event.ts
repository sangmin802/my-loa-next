import { getEventData } from "api/api";
import { useQuery } from "react-query";

export function useEvent(queryKey) {
  const { data: eventData } = useQuery(queryKey, () => getEventData(), {
    refetchOnWindowFocus: false,
    suspense: true,
  });

  return eventData;
}
