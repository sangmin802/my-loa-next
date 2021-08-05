import React, { Children, PropsWithChildren, ReactElement } from "react";
import Lodash from "lodash";
import * as Styled from "./index.style";

interface IVisibleContainer {
  children: ReactElement | ReactElement[];
  selected: number;
  type?: string;
}

const VisibleContainer = ({
  children,
  selected,
  type = "sub",
}: PropsWithChildren<IVisibleContainer>) => {
  return (
    <>
      {Children.map(children, (component, index) => (
        <Styled.Content
          data-testid={`${type}-content-${index}`}
          data-show={selected === index}
          isShow={selected === index}
        >
          {component}
        </Styled.Content>
      ))}
    </>
  );
};

export default React.memo(VisibleContainer, (left, right) =>
  Lodash.isEqual(left, right)
);
