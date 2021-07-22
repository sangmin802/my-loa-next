import React, { PropsWithChildren } from "react";
import ServerChar from "../char/index";
import * as Styled from "./index.style";
import { Text } from "components/";

interface IWrap {
  server: string;
  charList: any[];
}

interface IServer<T> {
  wrap: T;
}

const Server = ({ wrap }: PropsWithChildren<IServer<IWrap>>) => {
  return (
    <>
      <Styled.Title>
        <Text>{wrap.server}</Text>
      </Styled.Title>
      <Styled.InnerContainer>
        {wrap.charList.map((char, charIndex) => {
          return (
            <Styled.Content key={`userExpeditionChar${charIndex}`}>
              <ServerChar char={char} />
            </Styled.Content>
          );
        })}
      </Styled.InnerContainer>
    </>
  );
};

export default Server;
