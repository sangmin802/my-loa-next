import React, { cloneElement, PropsWithChildren, ReactElement } from "react";
import { Text, MapContainer } from "components/";
import * as Styled from "./index.style";
import Lodash from "lodash";

interface IListContainer {
  title: string;
  arr: any[];
  children: ReactElement;
}

const ListContainer = ({
  title,
  arr,
  children,
}: PropsWithChildren<IListContainer>) => {
  return (
    <>
      <Styled.Title>
        <Text>{title}</Text>
      </Styled.Title>
      <Styled.Content>
        <MapContainer data={arr}>{cloneElement(children)}</MapContainer>
      </Styled.Content>
    </>
  );
};

export default React.memo(ListContainer, (left, right) =>
  Lodash.isEqual(left, right)
);
