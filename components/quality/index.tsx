import React, { PropsWithChildren } from "react";
import * as Styled from "./index.style";
import { Text } from "components/";
import Lodash from "lodash";

interface IData {
  detail: { quality: number };
}

interface IQuality<T> {
  data?: T;
}

const Quality = ({ data }: PropsWithChildren<IQuality<IData>>) => {
  const { quality } = data.detail;

  if (quality === -1) return null;

  let qualityColor = -2;
  if (quality >= 0 && quality < 10) qualityColor = -1;
  if (quality >= 10 && quality < 70) qualityColor = 1;
  if (quality >= 70 && quality < 90) qualityColor = 2;
  if (quality >= 90) qualityColor = 3;
  if (quality === 100) qualityColor = 4;

  return (
    <Styled.Container>
      <Text type="subTitle">품질 {quality}%</Text>
      <Styled.Background
        role="quality-background"
        color={`gradient${qualityColor}`}
        width={String(quality)}
      />
    </Styled.Container>
  );
};

export default React.memo(Quality, (left, right) =>
  Lodash.isEqual(left, right)
);
