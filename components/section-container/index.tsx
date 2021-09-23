import React, { PropsWithChildren, ReactElement } from "react";
import Lodash from "lodash";
import * as Styled from "./index.style";
import { Text } from "components/";

interface ISectionContainer {
  children: ReactElement;
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

export default React.memo(SectionContainer, (left, right) =>
  Lodash.isEqual(left, right)
);
