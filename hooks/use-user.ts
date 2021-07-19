import { useMemo } from "react";
import { useQuery, useQueryClient } from "react-query";
import { getUserData } from "api/api";

export function useUser(name) {
  const queryClient = useQueryClient();
  const key = useMemo(() => ["userData", name], [name]);

  const { data: userData } = useQuery(
    key,
    () => {
      queryClient.prefetchQuery(key, () => {
        getUserData(name);
      });

      return getUserData(name);
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return userData;
}
