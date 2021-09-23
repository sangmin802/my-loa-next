import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";
import * as Styled from "./index.style";

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ children, ...props }: PropsWithChildren<IButton>) => (
  <Styled.Button {...props}>{children}</Styled.Button>
);

export default Button;
