import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  BasicInfo,
  Expedition,
  Navigation,
  VisibleContainer,
  Dialog,
  Button,
  Text,
  MapContainer,
  ConditionalContainer,
  AbilityContainer,
  SkillContainer,
  AsyncBoundary,
  LoadingSpinner,
  ErrorFallback,
  Collection,
  SearchLoading,
  ErrorBoundary,
} from "components/";
import Layout from "layout/index";
import { useRouter } from "next/router";
import { useUser } from "hooks/use-user";
import { useUserCollection } from "hooks/use-user-collection";
import { useCancelQuery } from "hooks/use-cancel-query";
import * as Styled from "styles/user-info.style";

interface IFetchUserCollection {
  member: string[];
  queryKey: string[];
  subNav: number;
}

const UserInfo = () => {
  const { name } = useRouter().query;
  const [userKey, userCollectionKey] = useMemo(
    () => [
      ["userInfo", name],
      ["userCollection", name],
    ],
    [name]
  );

  useCancelQuery([userCollectionKey]);

  return (
    <Layout title={`유저정보 - ${name}`} page="userInfo">
      <ErrorBoundary errorFallback={<ErrorFallback />} keys={name}>
        <FetchUserInfo
          userKey={userKey}
          userCollectionKey={userCollectionKey}
        />
      </ErrorBoundary>
    </Layout>
  );
};

const FetchUserInfo = ({ userKey, userCollectionKey }) => {
  const history = useRouter();
  const { status, data: userData } = useUser(userKey);
  const [subNav, setSubNav] = useState(0);
  const [mainNav, setMainNav] = useState(0);
  const [dialog, setDialog] = useState(null);

  const subNavs = useMemo(
    () => [
      ["착용 아이템", "착용 아바타", "특성·각인"],
      ["전투스킬", "생활스킬"],
      ["", "", "", "", "", "", "", ""],
    ],
    []
  );

  const mainNavs = useMemo(() => ["능력치", "스킬", "수집형포인트"], []);

  const handleMainNavigation = useCallback(
    index => {
      setMainNav(index);
      setSubNav(0);
    },
    [setMainNav, setSubNav]
  );

  const handleResetState = useCallback(() => {
    setMainNav(0);
    setSubNav(0);
    setDialog(null);
  }, [setMainNav, setSubNav, setDialog]);

  const handleSearchUser = useCallback(
    name => {
      history.push(`/userInfo/${name}`);
      handleResetState();
    },
    [history, handleResetState]
  );

  const expeditionDialog = useMemo(
    () => (
      <Expedition
        userData={userData}
        setUserData={handleSearchUser}
        setDialog={setDialog}
      />
    ),
    [userData, handleSearchUser, setDialog]
  );

  const setExpeditionDialog = useCallback(() => {
    setDialog(expeditionDialog);
  }, [setDialog, expeditionDialog]);

  useEffect(() => {
    return () => {
      handleResetState();
    };
  }, [userKey, handleResetState]);

  if (status === "loading") return <SearchLoading />;

  return (
    <Styled.UserInfo data-testid={userData.expeditionInfo.name}>
      <ConditionalContainer isRender={dialog !== null}>
        <Dialog dialog={dialog} setDialog={setDialog} />
      </ConditionalContainer>
      <Styled.Top>
        <Styled.ButtonContainer>
          <Button onClick={setExpeditionDialog} data-testid="expedition-button">
            <Text>원정대 캐릭터 보기</Text>
          </Button>
        </Styled.ButtonContainer>
        <BasicInfo userData={userData} />
      </Styled.Top>
      <Styled.Bottom>
        <Styled.Navigation type="main">
          <Navigation
            arr={mainNavs}
            selectedNav={mainNav}
            setNav={handleMainNavigation}
          />
        </Styled.Navigation>
        <Styled.Navigation type="sub" isShow={mainNav} selected={subNav}>
          <MapContainer data={subNavs} dataKey="arr">
            <Navigation selectedNav={subNav} setNav={setSubNav} />
          </MapContainer>
        </Styled.Navigation>
        <Styled.Container data-testid="content">
          <VisibleContainer type="main" selected={mainNav}>
            <AbilityContainer
              userData={userData}
              subNav={subNav}
              setDialog={setDialog}
            />
            <SkillContainer
              userData={userData}
              subNav={subNav}
              setDialog={setDialog}
            />
            <AsyncBoundary
              suspenseFallback={<LoadingSpinner />}
              errorFallback={<ErrorFallback />}
              keys={userCollectionKey}
            >
              <FetchUserCollection
                queryKey={userCollectionKey}
                member={userData.memberArr}
                subNav={subNav}
              />
            </AsyncBoundary>
          </VisibleContainer>
        </Styled.Container>
      </Styled.Bottom>
    </Styled.UserInfo>
  );
};

const FetchUserCollection = ({
  queryKey,
  subNav,
  member,
}: PropsWithChildren<IFetchUserCollection>) => {
  const userCollection = useUserCollection(queryKey, member);

  return (
    <VisibleContainer selected={subNav}>
      {userCollection.collectionDetail.map((data, i) => (
        <Collection
          data={data}
          mini={userCollection.collectionMini[i]}
          key={i}
        />
      ))}
    </VisibleContainer>
  );
};

export default UserInfo;
