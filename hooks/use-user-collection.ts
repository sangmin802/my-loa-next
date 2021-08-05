import { getUserCollection } from "api/api";
import { useQuery } from "react-query";

export function useUserCollection(queryKey, member) {
  const { data: userColection } = useQuery(
    queryKey,
    () => getUserCollection(member),
    {
      refetchOnWindowFocus: false,
      suspense: true,
    }
  );

  return userColection;
}
