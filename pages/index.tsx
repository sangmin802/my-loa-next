// import { GetStaticProps } from "next";
// import { wrapper } from '../store'
// import { useDispatch, useSelector } from 'react-redux'
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  DAILY_ISLAND,
  FIELD_BOSS,
  CHAOS_GATE,
  OCEAN_ACT,
  PHANTOM_SHIP,
} from "json/json";
import {
  FetchEvent,
  FetchCalendar,
  SectionContainer,
  TimerContainer,
  LoadingSpinner,
  AsyncBoundary,
  ErrorFallback,
} from "components/";
import Layout from "layout/index";
import { interval } from "utils/events/interval";
import * as Styled from "../styles/home.style";
import { getCalendarData, getEventData } from "api/api";
import { useRouter } from "next/router";

const Home = ({ eventData, calendarData }) => {
  const [isMidnight, setMidnight] = useState(new Date());
  const [isSix, setSix] = useState(new Date());
  const history = useRouter();

  const updateTime = useCallback(arr => {
    const [setMidnight, setSix] = arr;
    const now = new Date();
    const hour = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();
    if (hour === 0 && min === 0 && sec === 0) {
      setMidnight(now);
    }
    if (hour === 6 && min === 0 && sec === 0) {
      setSix(now);
    }
  }, []);

  const { startInterval, endInterval } = useMemo(
    () => interval(1, updateTime),
    [updateTime]
  );

  useEffect(() => {
    startInterval([setMidnight, setSix]);
    return () => {
      endInterval();
    };
  }, [endInterval, startInterval, setMidnight, setSix]);

  useEffect(() => {
    (function (l) {
      if (l.search[1] === "/") {
        var decoded = l.search
          .slice(1)
          .split("&")
          .map(function (s) {
            return s.replace(/~and~/g, "&");
          })
          .join("?");

        history.replace(decoded + l.hash);
      }
    })(window.location);
  }, [history]);

  return (
    <Layout page="/">
      <Styled.Container>
        <Styled.Section>
          <SectionContainer title="진행중인 이벤트">
            <AsyncBoundary
              suspenseFallback={<LoadingSpinner />}
              errorFallback={<ErrorFallback />}
            >
              <FetchEvent initialData={eventData} />
            </AsyncBoundary>
          </SectionContainer>
        </Styled.Section>
        <Styled.Section>
          <SectionContainer title="오늘의 캘린더섬">
            <AsyncBoundary
              suspenseFallback={<LoadingSpinner />}
              errorFallback={<ErrorFallback />}
            >
              <FetchCalendar
                isMidnight={isMidnight}
                initialData={calendarData}
              />
            </AsyncBoundary>
          </SectionContainer>
        </Styled.Section>
        <Styled.Section>
          <SectionContainer title="오늘의 모험섬">
            <TimerContainer data={DAILY_ISLAND} />
          </SectionContainer>
        </Styled.Section>
        <Styled.Section>
          <SectionContainer title="오늘의 필드보스">
            <TimerContainer
              data={FIELD_BOSS[isSix.getDay()]}
              rerenderKey={isSix}
            />
          </SectionContainer>
        </Styled.Section>
        <Styled.Section>
          <SectionContainer title="오늘의 카오스 게이트">
            <TimerContainer
              data={CHAOS_GATE[isSix.getDay()]}
              rerenderKey={isSix}
            />
          </SectionContainer>
        </Styled.Section>
        <Styled.Section>
          <SectionContainer title="오늘의 유령선">
            <TimerContainer
              data={PHANTOM_SHIP[isSix.getDay()]}
              rerenderKey={isSix}
            />
          </SectionContainer>
        </Styled.Section>
        <Styled.Section>
          <SectionContainer title="오늘의 항해">
            <TimerContainer
              data={OCEAN_ACT[isSix.getDay()]}
              rerenderKey={isSix}
            />
          </SectionContainer>
        </Styled.Section>
      </Styled.Container>
    </Layout>
  );
};

export async function getStaticProps() {
  try {
    const eventData = JSON.stringify(await getEventData());
    const calendarData = JSON.stringify(await getCalendarData());
    return { props: { eventData, calendarData } };
  } catch {
    return { props: { eventData: null, calendarData: null } };
  }
}

// pre-rendering을 위해, homeData를 받아올 때 서버에서는 DOMParser를 인식하지 못함
//  왜냐, 정적생성을 할 때에는 DOM을 구성하기 전에 서버에서 실행되기 때문
//  따라서, useEffect로 일단 돔이 한번 생성되도록 하고, 그 이후에 homeData를 DOMParser로 가공

// 1. node.js express(던파유저랭크)에서 DOMParser가 작동되는지 확인해보자
//      ㅇㅇ DOMParser 없음 따라서 jsdom 모듈을 사용하는데, child_proecss를 찾을수 없다 에러가 뜸
//      알아보니, Next.js는 번들링과정을 클라이언트 한번, 서버 한번 총 2번 하는데 jsdom모듈은 서버에서 사용하는 모듈이라, 해당 모듈에서 사용하는 외부모듈들은
//      클라이언트에서 인식하지 못하는 모듈이라 발생하는 에러였다. 실제로, 터미널에 출력되는부분을 보면 서버에서 작동하는 번들링은 잘 진행되지만, 클라이언트쪽 번들링만 에러가 발생함을 알 수 있었다
//      커스텀 웹팩으로 클라이언트에서 번들링을 진행할 때, 해당 모듈들을 실행시키지 않도록 하니 정상작동되었다.

// export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
//   async ({ store, preview }) => {
//     const homeData = await JSON.stringify(await API.getHomeData());
//     store.dispatch({ type: "SET_HOME_DATA", loadingPop: false, homeData });
//   }
// );

export default React.memo(Home, () => true);
