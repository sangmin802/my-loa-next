import { returnBody } from "../utils/parse-string";
import { CALENDAR_ISLAND } from "../json/timer";
import { addZero } from "utils/util";

export interface Calendar {
  name: string;
  src: string;
  lv: number;
  position: string;
  contType: string;
  time: string[];
  endTime: string;
}

interface Props {
  calendar: Calendar[][];
}

export default class CalendarData implements Props {
  calendar: Calendar[][];

  constructor(calendar: string) {
    // 캘린더섬
    this.setCalendar(returnBody(calendar));
  }

  setCalendar(raw: Element) {
    const timerList: Element[] = [...raw.getElementsByClassName("info")];
    const week = {};
    const holiday = {};
    const _ = new Date();
    const today = this.getToday(_);

    timerList.forEach(timer => {
      const name = timer.getElementsByClassName("npcname")[0].textContent;
      const target = CALENDAR_ISLAND[name];
      const day = _.getDay();

      if (!target) return;
      if (!timer.textContent.includes(today)) return;
      // 월,화,수,목,금
      if (6 > day && day > 0)
        return (week[name] = {
          ...target,
          time: ["11:00", "13:00", "19:00", "21:00"],
          endTime: "21:00",
        });

      // 토, 일
      const genTime = Number(
        timer
          .getElementsByClassName("gentime")[0]
          .textContent.replace(/[0-9]{4}-[0-9]{2}-[0-9]{2}[ ]{1}/gi, "")
          .replace(":", "")
      );

      if (genTime < 1400)
        return (holiday[name] = {
          ...target,
          time: ["09:00", "11:00", "13:00"],
          endTime: "13:00",
        });

      return (holiday[name] = {
        ...target,
        time: ["19:00", "21:00", "23:00"],
        endTime: "23:00",
      });
    });

    this.calendar = [Object.values(week), Object.values(holiday)];
  }

  getToday(date) {
    return `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(
      date.getDate()
    )}`;
  }
}
