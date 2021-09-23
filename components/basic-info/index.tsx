import React from "react";
import { Image, Text } from "../";
import * as Styled from "./index.styles";

interface IUserData {
  basicInfo: { [key: string]: string };
  expeditionInfo: { [key: string]: string };
}

interface IBasicInfo<T> {
  userData: T;
}

const BasicInfo = <T extends IUserData>({ userData }: IBasicInfo<T>) => {
  const { basicInfo, expeditionInfo } = userData;
  const {
    className,
    classSrc,
    curBigLv,
    curSmallLv,
    expeditionLv,
    garden,
    guild,
    pvp,
    reachBigLv,
    reachSmallLv,
    title,
  } = basicInfo;
  const { name, server, Lv } = expeditionInfo;

  return (
    <>
      <Styled.Container>
        <Styled.Content type="title">
          <Text type="desc">클래스</Text>
        </Styled.Content>
        <Styled.Content>
          <Image src={classSrc} />
          <Text type="desc">{className}</Text>
        </Styled.Content>
      </Styled.Container>
      <Styled.Container>
        <Styled.InnerContainer>
          <Styled.Content type="title">
            <Text type="desc">이름</Text>
          </Styled.Content>
          <Styled.Content>
            <Text type="desc">
              {Lv} {name}
            </Text>
          </Styled.Content>
        </Styled.InnerContainer>
        <Styled.InnerContainer>
          <Styled.Content type="title">
            <Text type="desc">원정대 레벨</Text>
          </Styled.Content>
          <Styled.Content>
            <Text type="desc">
              {server} Lv {expeditionLv}
            </Text>
          </Styled.Content>
        </Styled.InnerContainer>
      </Styled.Container>
      <Styled.Container>
        <Styled.InnerContainer>
          <Styled.Content type="title">
            <Text type="desc">현재 아이템 레벨</Text>
          </Styled.Content>
          <Styled.Content>
            <Text type="desc">
              {curBigLv} <small>{curSmallLv}</small>
            </Text>
          </Styled.Content>
        </Styled.InnerContainer>
        <Styled.InnerContainer>
          <Styled.Content type="title">
            <Text type="desc">달성 아이템 레벨</Text>
          </Styled.Content>
          <Styled.Content>
            <Text type="desc">
              {reachBigLv} <small>{reachSmallLv}</small>
            </Text>
          </Styled.Content>
        </Styled.InnerContainer>
      </Styled.Container>
      <Styled.Container>
        <Styled.InnerContainer>
          <Styled.Content type="title">
            <Text type="desc">영지</Text>
          </Styled.Content>
          <Styled.Content>
            <Text type="desc">{garden}</Text>
          </Styled.Content>
        </Styled.InnerContainer>
        <Styled.InnerContainer>
          <Styled.Content type="title">
            <Text type="desc">PVP</Text>
          </Styled.Content>
          <Styled.Content>
            <Text type="desc">{pvp}</Text>
          </Styled.Content>
        </Styled.InnerContainer>
      </Styled.Container>
      <Styled.Container>
        <Styled.InnerContainer>
          <Styled.Content type="title">
            <Text type="desc">칭호</Text>
          </Styled.Content>
          <Styled.Content>
            <Text type="desc">{title}</Text>
          </Styled.Content>
        </Styled.InnerContainer>
        <Styled.InnerContainer>
          <Styled.Content type="title">
            <Text type="desc">길드</Text>
          </Styled.Content>
          <Styled.Content>
            <Text type="desc">{guild}</Text>
          </Styled.Content>
        </Styled.InnerContainer>
      </Styled.Container>
    </>
  );
};

export default React.memo(BasicInfo);
