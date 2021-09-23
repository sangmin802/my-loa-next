import React, { PropsWithChildren, ReactElement } from "react";
import Lodash from "lodash";

interface IConditionalContainer {
  isRender: boolean;
  children: ReactElement;
}

const ConditionalContainer = ({
  isRender,
  children,
}: PropsWithChildren<IConditionalContainer>) => {
  if (!isRender) return null;

  return children;
};

export default React.memo(ConditionalContainer, (left, right) =>
  Lodash.isEqual(left, right)
);
