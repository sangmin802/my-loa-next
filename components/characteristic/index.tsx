import React from "react";
import { DangerousHTML, Text, MapContainer } from "../";
import * as Styled from "./index.style";

interface IContent {
  title: string[];
  desc: string;
}

interface IData {
  title: string;
  content: IContent[];
}

interface ICharacteristic<T> {
  data?: T;
}

const Chararteristic = <T extends IData>({ data }: ICharacteristic<T>) => {
  return (
    <Styled.Container key={data.title}>
      <Styled.Title>
        <Text type="title">{data.title}</Text>
      </Styled.Title>
      <MapContainer data={data.content}>
        <Item />
      </MapContainer>
    </Styled.Container>
  );
};

interface IItem<T> {
  data?: T;
}

const Item = <T extends IContent>({ data }: IItem<T>) => {
  return (
    <Styled.Item key={data.title[0]}>
      <Styled.Title type="itemTitle">
        <Text>
          {data.title[0]} {data.title[1]}
        </Text>
      </Styled.Title>
      <DangerousHTML html={data.desc} />
    </Styled.Item>
  );
};

export default React.memo(Chararteristic);
