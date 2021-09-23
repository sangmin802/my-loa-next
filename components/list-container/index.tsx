import React, { ReactElement } from "react";
import { Text, MapContainer } from "components/";
import * as Styled from "./index.style";

interface IListContainer {
  title: string;
  arr: any[];
  children: ReactElement;
}

const ListContainer = ({ title, arr, children }: IListContainer) => {
  return (
    <>
      <Styled.Title>
        <Text>{title}</Text>
      </Styled.Title>
      <Styled.Content>
        <MapContainer data={arr}>{children}</MapContainer>
      </Styled.Content>
    </>
  );
};

export default React.memo(ListContainer);
