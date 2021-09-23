import React from "react";
import { DangerousHTML, MapContainer } from "../";
import * as Styled from "./index.style";

interface IData {
  title: string;
  desc: string[];
}

interface IIndengString<T> {
  data?: T;
}

const IntentString = ({ data }: IIndengString<IData>) => {
  return (
    <Styled.Content>
      <DangerousHTML html={data.title} />
      <MapContainer data={data.desc} dataKey="html">
        <DangerousHTML />
      </MapContainer>
    </Styled.Content>
  );
};

export default React.memo(IntentString);
