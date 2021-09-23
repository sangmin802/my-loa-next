import React from "react";
import { Button, Text } from "components/";
import * as Styled from "./index.style";

interface IData {
  lv: string;
  name: string;
}

interface IChar<T> {
  data?: T;
}

const Char = ({ data }: IChar<IData>) => (
  <Styled.Container>
    <Button aria-label="expedition-char">
      <Text type="desc" data-name={data.name}>
        {data.lv} {data.name}
      </Text>
    </Button>
  </Styled.Container>
);

export default Char;
