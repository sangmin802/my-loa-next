import React, { useRef, useCallback, PropsWithChildren } from "react";
import { useRouter } from "next/router";
import * as Styled from "./index.style";
import { Input, Button, Text } from "components/";

interface IHeader {
  resetBoundary?: () => void;
}

const Header = ({ resetBoundary }: PropsWithChildren<IHeader>) => {
  const textInput = useRef(null);
  const router = useRouter();
  const onSubmitHandler = useCallback(
    e => {
      const name = textInput?.current?.value;
      const isEmpty = name.replace(/ /gi, "") === "";

      e.preventDefault();
      resetBoundary?.();

      textInput.current.value = null;

      if (isEmpty) return;

      router.replace(`/userInfo/${name}`);
    },
    [textInput, router, resetBoundary]
  );

  const onHomeHandler = useCallback(
    e => {
      e.preventDefault();
      resetBoundary?.();
      router.replace(`/`);
    },
    [resetBoundary, router]
  );

  return (
    <Styled.Container>
      <Button onClick={onHomeHandler}>
        <Styled.Background data-testid="go-home" />
      </Button>
      <Styled.Form
        data-testid="submit-form"
        className="submit-area"
        onSubmit={onSubmitHandler}
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

export default Header;
