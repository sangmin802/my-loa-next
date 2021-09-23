import React from "react";
import Head from "next/head";
import { Header } from "components/.";
import * as Styled from "./index.style";
import Lodash from "lodash";

function Layout({ children, title = "Loa-Hands", page }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="google-site-verification"
          content="SWvP4IgjDhYd943otN_bOiXQ3UjJsOAh5FE6cpmrkXE"
        />
        <meta name="description" content="Lostark 유저 검색 앱" />
      </Head>
      <Styled.Container>
        <Styled.HeaderContainer>
          <Header />
        </Styled.HeaderContainer>
        <Styled.Main>{children}</Styled.Main>
      </Styled.Container>
    </>
  );
}

export default React.memo(Layout, (left, right) => Lodash.isEqual(left, right));
