import React, { PropsWithChildren } from "react";
import Char from "../char/index";
import * as Styled from "./index.style";
import { Text, MapContainer } from "components/";

interface IData {
  server: string;
  charList: any[];
}

interface IServer<T> {
  data?: T;
}

const Server = ({ data }: PropsWithChildren<IServer<IData>>) => (
  <Styled.Server>
    <Styled.Title>
      <Text>{data.server}</Text>
    </Styled.Title>
    <Styled.InnerContainer>
      <MapContainer data={data.charList}>
        <Char />
      </MapContainer>
    </Styled.InnerContainer>
  </Styled.Server>
);

export default Server;
