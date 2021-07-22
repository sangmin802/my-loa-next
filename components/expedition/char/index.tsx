import React, { PropsWithChildren, useCallback } from "react";
import { Button, Text } from "components/";
import * as Styled from "./index.style";

interface IData {
  lv: string;
  name: string;
}

interface IChar<T> {
  char: T;
}

const Char = ({ char }: PropsWithChildren<IChar<IData>>) => {
  return (
    <Styled.Container>
      <Button aria-label="expedition-char">
        <Text type="desc" data-name={char.name}>
          {char.lv} {char.name}
        </Text>
      </Button>
    </Styled.Container>
  );
};

export default Char;
