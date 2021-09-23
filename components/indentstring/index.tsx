import React, { PropsWithChildren } from "react";
import Lodash from "lodash";
import { DangerousHTML, MapContainer } from "../";
import * as Styled from "./index.style";

interface IData {
  title: string;
  desc: string[];
}

interface IIndengString<T> {
  data?: T;
}

const IntentString = ({ data }: PropsWithChildren<IIndengString<IData>>) => {
  return (
    <Styled.Content>
      <DangerousHTML html={data.title} />
      <MapContainer data={data.desc} dataKey="html">
        <DangerousHTML />
      </MapContainer>
    </Styled.Content>
  );
};

export default React.memo(IntentString, (left, right) =>
  Lodash.isEqual(left, right)
);
