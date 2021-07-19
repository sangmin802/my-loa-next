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
  const history = useRouter();
  const { name } = history.query;

  return (
    <Layout title={`유저정보 - ${name}`} page="userInfo">
      <AsyncBoundary
        suspenseFallback={<SearchLoading />}
        errorFallback={<HeaderLayout children={<ErrorFallback />} />}
      >
        <HeaderLayout>
          <FetchUserInfo name={name} history={history} />
        </HeaderLayout>
      </AsyncBoundary>
    </Layout>
  );
};

export default React.memo(UserInfo, () => true);
