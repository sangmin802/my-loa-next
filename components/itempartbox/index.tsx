import React from "react";
import { DangerousHTML } from "../";
import * as Styled from "./index.style";

interface IItemPartBox {
  data?: {
    title: string;
    desc: string;
  };
}

const ItemPartBox = ({ data }: IItemPartBox) => {
  return (
    <Styled.Content>
      <DangerousHTML html={data.title} />
      <DangerousHTML html={data.desc} />
    </Styled.Content>
  );
};

export default React.memo(ItemPartBox);
