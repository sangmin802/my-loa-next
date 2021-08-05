import React, { PropsWithChildren, ReactElement, ReactNode } from "react";
import { useQueryErrorResetBoundary } from "react-query";
import { ErrorBoundary, CustomSuspense } from "components/";
import Lodash from "lodash";

interface IAsyncBoundary {
  suspenseFallback: ReactNode;
  errorFallback: ReactElement;
  children: ReactElement;
  keys?: any;
}

const AsyncBoundary = ({
  suspenseFallback,
  errorFallback,
  children,
  keys,
}: PropsWithChildren<IAsyncBoundary>) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary resetQuery={reset} errorFallback={errorFallback} keys={keys}>
      <CustomSuspense fallback={suspenseFallback}>{children}</CustomSuspense>
    </ErrorBoundary>
  );
};

export default React.memo(AsyncBoundary, (left, right) =>
  Lodash.isEqual(left, right)
);
