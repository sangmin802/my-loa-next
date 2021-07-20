import React from "react";
import {
  FetchUserInfo,
  SearchLoading,
  AsyncBoundary,
  ErrorFallback,
} from "components/";
import Layout, { HeaderLayout } from "layout/index";
import { useRouter } from "next/router";

const UserInfo = () => {
  const router = useRouter();
  const { name } = router.query;

  if (!router.isReady) return null;

  return (
    <Layout title={`유저정보 - ${name}`} page="userInfo">
      <AsyncBoundary
        suspenseFallback={<SearchLoading />}
        errorFallback={<HeaderLayout children={<ErrorFallback />} />}
      >
        <HeaderLayout>
          <FetchUserInfo name={name} router={router} />
        </HeaderLayout>
      </AsyncBoundary>
    </Layout>
  );
};

export default React.memo(UserInfo, () => true);
