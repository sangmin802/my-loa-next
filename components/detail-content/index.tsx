import React, {
  cloneElement,
  PropsWithChildren,
  ReactElement,
  useMemo,
} from "react";
import Lodash from "lodash";
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

interface IData<T> {
  backSrc: string;
  detail: T;
}

interface IDetailContent<T> {
  data: T;
  children: ReactElement;
}

const DetailContent = ({
  data,
  children,
}: PropsWithChildren<Partial<IDetailContent<IData<IDetail>>>>) => {
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

export default React.memo(DetailContent, (left, right) =>
  Lodash.isEqual(left, right)
);
