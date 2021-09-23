import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  BasicInfo,
  Expedition,
  Navigation,
  Dialog,
  Button,
  Text,
  MapContainer,
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
import { useNavigation } from "hooks/use-navigation";
import * as Styled from "styles/user-info.style";

interface IFetchUserCollection {
  member: string[];
  queryKey: string[];
  subNav: number;
}

interface IFetchUserInfo {
  userKey: string[];
  userCollectionKey: string[];
}

const UserInfo = () => {
  const { name } = useRouter().query;
  const [userKey, userCollectionKey] = useMemo(
    () => [
      ["userInfo", name as string],
      ["userCollection", name as string],
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

const FetchUserInfo = React.memo(function ({
  userKey,
  userCollectionKey,
}: IFetchUserInfo) {
  const history = useRouter();
  const { status, data: userData } = useUser(userKey);
  const nav = useNavigation();
  const [dialog, setDialog] = useState(null);

  const handleResetState = useCallback(() => {
    nav.handleResetNavigation();
    setDialog(null);
  }, [nav.handleResetNavigation]);

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
    [userData, handleSearchUser]
  );

  const setExpeditionDialog = useCallback(() => {
    setDialog(expeditionDialog);
  }, [expeditionDialog]);

  const memoized = useMemo(() => {
    if (!userData) return [, , ,];
    return [
      <AbilityContainer
        userData={userData}
        subNav={nav.subNav}
        setDialog={setDialog}
      />,
      <SkillContainer
        userData={userData}
        subNav={nav.subNav}
        setDialog={setDialog}
      />,
      <AsyncBoundary
        suspenseFallback={<LoadingSpinner />}
        errorFallback={<ErrorFallback />}
        keys={userCollectionKey}
      >
        <FetchUserCollection
          queryKey={userCollectionKey}
          member={userData.memberArr}
          subNav={nav.subNav}
        />
      </AsyncBoundary>,
    ];
  }, [userData, nav.subNav, userCollectionKey]);

  useEffect(() => {
    return () => {
      handleResetState();
    };
  }, [userKey, handleResetState]);

  if (status === "loading") return <SearchLoading />;

  return (
    <Styled.UserInfo data-testid={userData.expeditionInfo.name}>
      {dialog && <Dialog dialog={dialog} setDialog={setDialog} />}
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
            arr={nav.mainNavs}
            selectedNav={nav.mainNav}
            setNav={nav.handleMainNavigation}
          />
        </Styled.Navigation>
        <Styled.Navigation
          type="sub"
          isShow={nav.mainNav}
          selected={nav.subNav}
        >
          <MapContainer data={nav.subNavs} dataKey="arr">
            <Navigation selectedNav={nav.subNav} setNav={nav.setSubNav} />
          </MapContainer>
        </Styled.Navigation>
        <Styled.Container data-testid="content">
          {memoized[nav.mainNav]}
        </Styled.Container>
      </Styled.Bottom>
    </Styled.UserInfo>
  );
});

const FetchUserCollection = React.memo(function ({
  queryKey,
  subNav,
  member,
}: IFetchUserCollection) {
  const userCollection = useUserCollection(queryKey, member);

  const memoized = useMemo(() => {
    return userCollection.collectionDetail.map((data, i) => (
      <Collection data={data} mini={userCollection.collectionMini[i]} key={i} />
    ));
  }, [userCollection]);

  return <>{memoized[subNav]}</>;
});

export default UserInfo;
