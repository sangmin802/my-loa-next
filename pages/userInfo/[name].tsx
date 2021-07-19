import React from "react";
import {
  FetchUserInfo,
  SearchLoading,
  AsyncBoundary,
  ErrorFallback,
} from "components/";
import Layout, { HeaderLayout } from "layout/index";
import { useRouter } from "next/router";
import { getUserData } from "api/api";

const UserInfo = ({ userData }) => {
  const history = useRouter();
  const { name } = history.query;

  return (
    <Layout title={`유저정보 - ${name}`} page="userInfo">
      <AsyncBoundary
        suspenseFallback={<SearchLoading />}
        errorFallback={<HeaderLayout children={<ErrorFallback />} />}
      >
        <HeaderLayout>
          <FetchUserInfo name={name} history={history} initialData={userData} />
        </HeaderLayout>
      </AsyncBoundary>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const name = context.query.name;
  try {
    const userData = JSON.stringify(await getUserData(name));
    return { props: { userData } };
  } catch {
    return { props: { userData: null } };
  }
}

export default React.memo(UserInfo, () => false);
