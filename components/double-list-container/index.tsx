import React, { PropsWithChildren, ReactElement, useMemo } from "react";
import { ListContainer } from "../";
import Lodash from "lodash";
import * as Styled from "./index.style";

interface IData {
  divideType: string;
}

interface IDoubleListContainer<T> {
  data?: T[];
  divideType: string;
  lt?: null | string;
  rt?: null | string;
  children: ReactElement;
}

const DoubleListContainer = ({
  data,
  divideType,
  lt = null,
  rt = null,
  children,
}: PropsWithChildren<IDoubleListContainer<IData>>) => {
  const [left, right] = useMemo(() => {
    return data.reduce(
      (prev, cur) => {
        if (cur.divideType.includes(divideType)) {
          prev[0].push(cur);
        } else {
          prev[1].push(cur);
        }
        return prev;
      },
      [[], []]
    );
  }, [data, divideType]);

  return (
    <Styled.Container>
      <Styled.Content role="left" type="left" data-size={left.length}>
        <ListContainer title={lt} arr={left}>
          {children}
        </ListContainer>
      </Styled.Content>
      <Styled.Content role="right" type="right" data-size={right.length}>
        <ListContainer title={rt} arr={right}>
          {children}
        </ListContainer>
      </Styled.Content>
    </Styled.Container>
  );
};

export default React.memo(DoubleListContainer, (left, right) =>
  Lodash.isEqual(left, right)
);
