import { useUser } from "hooks/use-user";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BasicInfo,
  Expedition,
  Nav,
  Collection,
  NavContent,
  DoubleListContainer,
  Quality,
  Rune,
  Characteristic,
  HoverContent,
  ListItem,
  Dialog,
  Button,
  Text,
} from "components/";
import * as Styled from "styles/user-info.style";

const FetchUserInfo = ({ name, history, initialData }) => {
  const userData = useUser(name, initialData);
  const [subNav, setSubNav] = useState(0);
  const [mainNav, setMainNav] = useState(0);
  const [dialog, setDialog] = useState(null);

  const infos = useMemo(() => {
    const {
      characteristicInfo,
      equipInfo: { equipment, avatar },
    } = userData.abilityInfo;
    const { battleSkill = null, lifeSkill } = userData.skillInfo;
    const { collectionDetail } = userData.collectionInfo;
    const { battle, basic, engrave } = characteristicInfo;
    return {
      equipment,
      avatar,
      battleSkill,
      lifeSkill,
      collectionDetail,
      battle,
      basic,
      engrave,
    };
  }, [userData]);

  const collectionNav = useMemo(() => {
    if (!userData) return;
    const collection = userData.collectionInfo.collectionMini;
    return Collection({ collection });
  }, [userData]);

  const subNavs = useMemo(
    () => [
      ["착용 아이템", "착용 아바타", "특성·각인"],
      ["전투스킬", "생활스킬"],
      collectionNav,
    ],
    [collectionNav]
  );

  const mainNavs = useMemo(() => ["능력치", "스킬", "수집형포인트"], []);

  const setMainNavHandler = useCallback(
    index => {
      setMainNav(index);
      setSubNav(0);
    },
    [setMainNav, setSubNav]
  );

  const resetHandler = useCallback(() => {
    setMainNav(0);
    setSubNav(0);
    setDialog(null);
  }, [setMainNav, setSubNav, setDialog]);

  const setUserDataHandler = useCallback(
    name => {
      history.push(`/userInfo/${name}`);
      resetHandler();
    },
    [history, resetHandler]
  );

  const expeditionDialog = useMemo(
    () => (
      <Expedition
        userData={userData}
        setUserData={setUserDataHandler}
        setDialog={setDialog}
      />
    ),
    [userData, setUserDataHandler, setDialog]
  );

  const setExpeditionDialog = useCallback(() => {
    setDialog(expeditionDialog);
  }, [setDialog, expeditionDialog]);

  useEffect(() => {
    return () => {
      resetHandler();
    };
  }, [userData, resetHandler]);

  const {
    equipment,
    avatar,
    battleSkill,
    lifeSkill,
    collectionDetail,
    battle,
    basic,
    engrave,
  } = infos;
  return (
    <Styled.Container>
      <Dialog dialog={dialog} setDialog={setDialog} />
      <Styled.Top>
        <Styled.ButtonContainer>
          <Button onClick={setExpeditionDialog} data-testid="expedition-button">
            <Text>원정대 캐릭터 보기</Text>
          </Button>
        </Styled.ButtonContainer>
        <BasicInfo
          data-testid={userData.expeditionInfo.name}
          userData={userData}
        />
      </Styled.Top>
      <Styled.Bottom>
        <Nav
          arr={mainNavs}
          isShow={true}
          selectedNav={mainNav}
          setNav={setMainNavHandler}
          navType="main"
        />
        {subNavs.map((tab, index) => (
          <Nav
            arr={tab}
            key={`sub${index}`}
            isShow={mainNav === index}
            selectedNav={subNav}
            setNav={setSubNav}
            navType="sub"
          />
        ))}
        <Styled.Content data-testid="content">
          <NavContent type="main" selected={mainNav}>
            <NavContent selected={subNav}>
              <DoubleListContainer
                data={Object.values(equipment)}
                divideType="equip"
              >
                <ListItem setDialog={setDialog}>
                  <HoverContent>
                    <Quality />
                  </HoverContent>
                </ListItem>
              </DoubleListContainer>
              <DoubleListContainer
                data={Object.values(avatar)}
                divideType="inner"
              >
                <ListItem setDialog={setDialog}>
                  <HoverContent />
                </ListItem>
              </DoubleListContainer>
              <Characteristic data={[basic, battle, engrave]} />
            </NavContent>
            <NavContent selected={subNav}>
              <DoubleListContainer
                data={battleSkill.skills}
                lt={`사용 : ${battleSkill.usePoint}`}
                rt={`획득 : ${battleSkill.getPoint}`}
                divideType="leftSkill"
              >
                <ListItem setDialog={setDialog}>
                  <HoverContent>
                    <Rune />
                  </HoverContent>
                </ListItem>
              </DoubleListContainer>
              <DoubleListContainer data={lifeSkill} divideType="leftSkill">
                <ListItem />
              </DoubleListContainer>
            </NavContent>
            <NavContent selected={subNav}>
              {collectionDetail.map((res, index) => (
                <DoubleListContainer
                  key={index}
                  data={res.collection}
                  divideType="get"
                  lt={res.title}
                  rt={`획득 : ${res.getCount} 미획득 : ${res.totalCount}`}
                >
                  <ListItem />
                </DoubleListContainer>
              ))}
            </NavContent>
          </NavContent>
        </Styled.Content>
      </Styled.Bottom>
    </Styled.Container>
  );
};

export default FetchUserInfo;
