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

  return (
    <Styled.Container>
      <Button onClick={setUserDataEvent} aria-label="expedition-char">
        <Text type="desc">
          {char.lv} {char.name}
        </Text>
      </Button>
    </Styled.Container>
  );
};

export default Char;
