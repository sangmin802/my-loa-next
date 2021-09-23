import React, { HTMLAttributes, PropsWithChildren, ReactNode } from "react";
import * as Styled from "./index.style";

export interface IText extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  type: string;
  color: string;
}

const Text = ({ children, ...props }: PropsWithChildren<Partial<IText>>) => (
  <Styled.Text {...props}>{children}</Styled.Text>
);

export default Text;
