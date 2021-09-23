import React, { ImgHTMLAttributes, PropsWithChildren } from "react";
import * as Styled from "./index.style";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  color: string;
}

const Image = ({ color, ...props }: PropsWithChildren<Partial<Props>>) => {
  return (
    <div className="img-container">
      <Styled.Image color={color} {...props} />
    </div>
  );
};

export default Image;
