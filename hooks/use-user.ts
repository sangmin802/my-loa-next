import { useQuery } from "react-query";
import { getUserData } from "api/api";

export function useUser(queryKey) {
  const query = useQuery(
    queryKey,
    () => {
      return getUserData(queryKey[1]);
    },
    {
      refetchOnWindowFocus: false,
      suspense: false,
    }
  );

  return query;
}
