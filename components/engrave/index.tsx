import React from "react";
import { Image, Text, DangerousHTML } from "components/";
import * as Styled from "./index.style";

interface EngraveProps {
  data?: any;
}

const Engrave = ({ data }: EngraveProps) => {
  return (
    <Styled.Engrave className="engrave-item">
      <Image src={data.src} />
      <Styled.Desc>
        <Text>{data.name}</Text>
        <DangerousHTML html={data.options[data.grade - 1]} />
      </Styled.Desc>
    </Styled.Engrave>
  );
};

export default React.memo(Engrave);
