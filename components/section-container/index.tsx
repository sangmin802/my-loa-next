import React, { PropsWithChildren } from "react";
import * as Styled from "./index.style";
import { Text } from "components/";

interface ISectionContainer {
  title: string;
}

const SectionContainer = ({
  children,
  title,
}: PropsWithChildren<ISectionContainer>) => {
  return (
    <article>
      <Styled.Title>
        <Text>{title}</Text>
      </Styled.Title>
      <>{children}</>
    </article>
  );
};

export default React.memo(SectionContainer);
