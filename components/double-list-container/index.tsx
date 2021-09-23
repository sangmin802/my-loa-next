import React, { ReactElement, useMemo } from "react";
import { ListContainer } from "../";
import * as Styled from "./index.style";

interface IDoubleListContainer {
  data?: {
    divideType: string;
  }[];
  divideType?: string;
  lt?: null | string;
  rt?: null | string;
  children: ReactElement;
}

const DoubleListContainer = ({
  data,
  divideType = null,
  lt = null,
  rt = null,
  children,
}: IDoubleListContainer) => {
  const [left, right] = useMemo(() => {
    return data.reduce(
      (prev, cur, i) => {
        const condition = divideType
          ? cur.divideType.includes(divideType)
          : i % 2 === 0;

        if (condition) {
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

export default React.memo(DoubleListContainer);
