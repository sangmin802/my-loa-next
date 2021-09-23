import React, { cloneElement, ReactElement, useMemo } from "react";
import {
  ItemPartBox,
  IndentString,
  TripodSkillCustom,
  Image,
  Text,
  MapContainer,
} from "..";
import * as Styled from "./index.style";

interface IDetail {
  src: string;
  grade: string;
  title: string;
  subTitle: string[];
  itemPartBox?: [];
  indentStringGroup?: [];
  tripodSkillCustom?: [];
}

interface IData {
  backSrc: string;
  detail: IDetail;
}

interface IDetailContent {
  data: IData;
  children: ReactElement;
}

const DetailContent = ({ data, children }: Partial<IDetailContent>) => {
  const { backSrc, detail } = data;
  const {
    src,
    grade,
    title,
    subTitle,
    itemPartBox,
    indentStringGroup,
    tripodSkillCustom,
  } = detail;

  const titleColor = useMemo(() => (grade ? `color${grade}` : "white"), [
    grade,
  ]);

  const optionalDetail = useMemo(() => {
    if (!children) return null;
    return cloneElement(children, { data });
  }, [children, data]);

  return (
    <>
      <Styled.Top>
        <Styled.Container>
          <Image
            role="gradient"
            src={src ?? backSrc}
            color={`gradient${grade}`}
          />
          <Styled.Desc>
            <MapContainer data={subTitle} dataKey="children">
              <Text type="subTitle" />
            </MapContainer>
            <Text type="title" color={titleColor}>
              {title}
            </Text>
          </Styled.Desc>
        </Styled.Container>
      </Styled.Top>
      <Styled.Children>{optionalDetail}</Styled.Children>
      <MapContainer data={itemPartBox}>
        <ItemPartBox />
      </MapContainer>
      <MapContainer data={indentStringGroup}>
        <IndentString />
      </MapContainer>
      <MapContainer data={tripodSkillCustom}>
        <TripodSkillCustom />
      </MapContainer>
    </>
  );
};

export default React.memo(DetailContent);
