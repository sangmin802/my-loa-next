import React, { useRef, useCallback } from "react";
import { useRouter } from "next/router";
import * as Styled from "./index.style";
import { Input, Button, Text } from "components/";
import Lodash from "lodash";
import { useQueryErrorResetBoundary } from "react-query";

const Header = () => {
  const { reset } = useQueryErrorResetBoundary();
  const textInput = useRef(null);
  const history = useRouter();
  const handleSubmit = useCallback(
    e => {
      const name = textInput?.current?.value;
      const isEmpty = name.replace(/ /gi, "") === "";

      e.preventDefault();
      reset();

      textInput.current.value = null;

      if (isEmpty) return;
      history.replace(`/userInfo/${name}`);
    },
    [textInput, history, reset]
  );

  const handleGoHome = useCallback(
    e => {
      e.preventDefault();
      reset();
      history.replace(`/`);
    },
    [reset, history]
  );

  return (
    <Styled.Container>
      <Button onClick={handleGoHome}>
        <Styled.Background data-testid="go-home" />
      </Button>
      <Styled.Form
        data-testid="submit-form"
        className="submit-area"
        onSubmit={handleSubmit}
      >
        <Styled.InputText>
          <Input
            data-testid="search-area"
            className="search-area"
            type="text"
            ref={textInput}
            autoComplete="off"
          />
        </Styled.InputText>
        <Styled.InputSubmit>
          <Button>
            <Text>검색</Text>
          </Button>
        </Styled.InputSubmit>
      </Styled.Form>
    </Styled.Container>
  );
};

export default React.memo(Header, (left, right) => Lodash.isEqual(left, right));
