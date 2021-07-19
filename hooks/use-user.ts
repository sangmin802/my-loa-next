import { useMemo } from "react";
import { useQuery, useQueryClient } from "react-query";
import { getUserData } from "api/api";

export function useUser(name, initialData) {
  const queryClient = useQueryClient();
  const key = useMemo(() => ["userData", name], [name]);
  const option = useMemo(() => {
    const root = { refetchOnWindowFocus: false };
    if (initialData) return { ...root, initialData: JSON.parse(initialData) };
    return root;
  }, [initialData]);

  const { data: userData } = useQuery(
    key,
    () => {
      queryClient.prefetchQuery(key, () => {
        getUserData(name);
      });

      return getUserData(name);
    },
    option
  );

  return userData;
}
