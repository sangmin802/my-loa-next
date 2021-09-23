import React, {
  ButtonHTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from "react";
import * as Styled from "./index.style";

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = ({ children, ...props }: PropsWithChildren<IButton>) => (
  <Styled.Button {...props}>{children}</Styled.Button>
);

export default Button;
