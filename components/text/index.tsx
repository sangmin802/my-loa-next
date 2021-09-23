import React, { HTMLAttributes, PropsWithChildren } from "react";
import * as Styled from "./index.style";

export interface IText extends HTMLAttributes<HTMLDivElement> {
  type: string;
  color: string;
}

const Text = ({ children, ...props }: PropsWithChildren<Partial<IText>>) => (
  <Styled.Text className="text" {...props}>
    {children}
  </Styled.Text>
);

export default Text;
