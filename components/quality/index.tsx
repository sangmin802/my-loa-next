import React from "react";
import * as Styled from "./index.style";
import { Text } from "components/";

interface IQuality {
  data?: {
    detail: { quality: number };
  };
}

const Quality = ({ data }: IQuality) => {
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

export default React.memo(Quality);
