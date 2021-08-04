import UserInfo from "models/userInfo";
// import HomeData from "models/homeData";
import { returnBody } from "utils/parse-string";
import { PROXY } from "proxy";
import axios from "axios";
import EventData from "models/eventData";
import CalenderData from "models/calendarData";

export const getUserData = async (name): Promise<UserInfo> => {
  try {
    const { data } = await axios({
      url: `${PROXY}loa-hands/userInfo`,
      method: "post",
      data: { name },
    });

    const { info, col } = data;
    const body: Element = returnBody(info);
    const expedition: Element = body.getElementsByClassName(
      "myinfo__character--wrapper2"
    )[0];
    const user: UserInfo = new UserInfo(body, expedition, col);
    return user;
  } catch (err) {
    let message = err?.response?.data?.message ?? "네트워크 에러입니다.";
    if (typeof err == "string") message = err;
    throw new Error(message);
  }
};

export const getEventData = async (): Promise<EventData> => {
  try {
    const { data } = await axios({
      url: `${PROXY}loa-hands/event`,
      method: "get",
    });
    return new EventData(data);
  } catch (err) {
    const message = err?.response?.data?.message ?? "네트워크 에러입니다.";
    throw new Error(message);
  }
};

export const getCalendarData = async (): Promise<CalenderData> => {
  try {
    const { data } = await axios({
      url: `${PROXY}loa-hands/calendar`,
      method: "get",
    });
    return new CalenderData(data);
  } catch (err) {
    if (err?.request) throw new Error("네트워크 에러입니다.");
  }
};

export default {
  getHomeData: async (): Promise<any> => {
    const urlList: string[] = ["loa-hands/timer", "loa-hands/homeData"];
    return new Promise((res, rej) => {
      Promise.all(
        urlList.map((url: string) => {
          return fetch(PROXY + url).then((urlRes: Response) => urlRes.text());
        })
      )
        .then((bodys: string[]) => {
          if (bodys[1].includes("서비스 점검")) rej("서비스 점검중입니다.");
          res(null);
        })
        .catch(err => {});
    });
  },
  getUserData: async (name): Promise<UserInfo> => {
    try {
      const { data } = await axios({
        url: `${PROXY}loa-hands/userInfo`,
        method: "post",
        data: { name },
      });

      const { info, col } = data;
      const body: Element = returnBody(info);
      const expedition: Element = body.getElementsByClassName(
        "myinfo__character--wrapper2"
      )[0];
      const user: UserInfo = new UserInfo(body, expedition, col);
      return user;
    } catch (err) {
      const message = err?.response?.data?.message ?? "네트워크 에러입니다.";
      throw new Error(message);
    }
  },
};
