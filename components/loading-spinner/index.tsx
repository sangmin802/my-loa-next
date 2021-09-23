import React, { HTMLAttributes, PropsWithChildren } from "react";
import * as Styled from "./index.style";

interface ILoadingSpinner extends HTMLAttributes<HTMLElement> {}

const LoadingSpinner = ({ ...props }: PropsWithChildren<ILoadingSpinner>) => {
  return (
    <Styled.Content {...props}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Styled.Content>
  );
};

export default LoadingSpinner;
