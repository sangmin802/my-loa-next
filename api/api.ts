import { PROXY } from "proxy";
import axios from "axios";
import UserInfo from "models/userInfo";
import UserCollectionInfo from "models/collectionInfo";
import EventData from "models/eventData";
import CalenderData from "models/calendarData";

const CancelToken = axios.CancelToken;

let cancelFetchEvent;
let cancelFetchCalendar;
let cancelFetchUserCollection;

export const getUserData = async (name): Promise<UserInfo> => {
  cancelFetchEvent?.();
  cancelFetchCalendar?.();
  cancelFetchUserCollection?.();

  try {
    const { data } = await axios({
      url: `${PROXY}loa-hands/userInfo`,
      method: "post",
      data: { name },
    });

    const user: UserInfo = new UserInfo(data);
    return user;
  } catch (err) {
    const message = err?.response?.data?.message ?? "네트워크 에러입니다.";
    throw new Error(message);
  }
};

export const getUserCollection = async (
  member
): Promise<UserCollectionInfo> => {
  try {
    const { data } = await axios({
      url: `${PROXY}loa-hands/userCollection`,
      method: "post",
      data: { member },
      cancelToken: new CancelToken(c => (cancelFetchUserCollection = c)),
    });
    const userCollectionInfo: UserCollectionInfo = new UserCollectionInfo(data);
    return userCollectionInfo;
  } catch (err) {
    const message = err?.response?.data?.message ?? "네트워크 에러입니다.";
    throw new Error(message);
  }
};

export const getEventData = async (): Promise<EventData> => {
  try {
    const { data } = await axios({
      url: `${PROXY}loa-hands/event`,
      method: "get",
      cancelToken: new CancelToken(c => (cancelFetchEvent = c)),
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
      cancelToken: new CancelToken(c => (cancelFetchCalendar = c)),
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

      const user: UserInfo = new UserInfo(data);
      return user;
    } catch (err) {
      const message = err?.response?.data?.message ?? "네트워크 에러입니다.";
      throw new Error(message);
    }
  },
};
