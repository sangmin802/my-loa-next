import { useEffect } from "react";
import { useQueryClient } from "react-query";

export const useCancelQuery = queryKey => {
  const queryClient = useQueryClient();

  useEffect(() => {
    return () => {
      queryKey.forEach(key => {
        // key의 query 중단
        if (queryClient.isFetching(key)) queryClient.cancelQueries(key);

        // key에 대한 캐싱된 값 초기화
        if (!queryClient.getQueryData(key))
          queryClient.resetQueries(key, { exact: true });
      });
    };
  }, [queryClient, queryKey]);
};
