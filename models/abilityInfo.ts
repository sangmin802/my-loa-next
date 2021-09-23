import EquipInfo from "./equipInfo";
import Characteristic from "./characteristic";
import {
  PARTS_ARR,
  PARTS_IMAGE,
  GEM_ARR,
  BADGE_ARR,
  BADGE_IMAGE,
  GEM_IMAGE,
} from "json/equip";
import { ENGRAVE } from "json/engrave";

interface PartDetail {
  [key: string]: {
    backSrc: string;
    divideType: string;
    detail?: EquipInfo;
  };
}

interface Equip {
  equipment: PartDetail;
  avatar: PartDetail;
  gem: PartDetail;
  badge: PartDetail;
}

interface Props {
  equipInfo: Equip;
  characteristicInfo: Characteristic;
}

export default class AbilityInfo implements Props {
  equipInfo: Equip = {
    equipment: {},
    avatar: {},
    gem: {},
    badge: {},
  };
  characteristicInfo: Characteristic;
  engrave = new Map();
  gem = {};

  constructor(profileObj, raw) {
    PARTS_ARR.forEach((part, index) => {
      if (!part) return;
      let divideType = null;
      let type = index === 26 || index < 12 ? "equipment" : "avatar";

      if (index === 26) divideType = "wristband";
      if (index <= 22) divideType = "outerAv";
      if (index <= 18) divideType = "innerAv";
      if (index === 11) divideType = "stone";
      if (index <= 10) divideType = "acc";
      if (index <= 5) divideType = "equip";
      this.equipInfo[type][part] = {
        backSrc: "//cdn-lostark.game.onstove.com/" + PARTS_IMAGE[index],
        divideType,
      };
    });

    GEM_ARR.forEach(part => {
      this.equipInfo["gem"][part] = {
        backSrc: "//cdn-lostark.game.onstove.com/" + GEM_IMAGE,
        divideType: "gem",
      };
    });

    BADGE_ARR.forEach(part => {
      this.equipInfo["badge"][part] = {
        backSrc: "//cdn-lostark.game.onstove.com/" + BADGE_IMAGE,
        divideType: "badge",
      };
    });

    // 장비정보가 있는경우만
    this.setUserInfoEquip(profileObj?.Equip);

    // 특성설정(각인, 특성)
    const characteristic = raw.querySelector(".profile-char");
    this.setDefaultEngrave(profileObj?.Engrave);
    this.characteristicInfo = new Characteristic(characteristic);
  }

  setUserInfoEquip(equip) {
    if (!equip) return;
    const equipKeyArr = Object.keys(equip);
    equipKeyArr.forEach((key: string) => {
      const num = Number(key.substr(key.length - 3, key.length));
      let type = null;
      let array = PARTS_ARR;
      if (num <= 22) type = "avatar";
      if (num === 26 || num <= 11) type = "equipment";
      if (num >= 27) {
        type = "badge";
        array = BADGE_ARR;
      }
      if (key.includes("Gem")) {
        type = "gem";
        array = GEM_ARR;
      }
      if (!array[num]) return;

      const target = this.equipInfo[type][array[num]];
      target.detail = new EquipInfo(
        equip[key],
        num,
        this.setEngrave.bind(this),
        target.divideType
      );
    });
  }

  setEngrave(name, size) {
    const engrave = this.engrave.get(name);
    const newSize = engrave ? engrave.size + size * 1 : size * 1;
    const grade = this.setEngraveGrade(newSize);
    const detail = ENGRAVE[name];

    this.engrave.set(name, {
      ...engrave,
      ...detail,
      name,
      src: `/img/engrave/${detail.no}.png`,
      size: newSize,
      grade,
    });
  }

  setEngraveGrade(size) {
    if (size < 5) return 0;
    if (size < 10) return 1;
    if (size < 15) return 2;
    return 3;
  }

  setDefaultEngrave(engraves) {
    if (!engraves) return;
    Object.values(engraves).forEach((engrave: any) => {
      const name = engrave.Element_000.value;
      const size = this.engraveExtraction(engrave.Element_002.value);
      this.setEngrave(name, size);
    });
  }

  engraveExtraction(str) {
    const regexp = new RegExp("(.*?'>)(\\d*)(</FONT>만큼 부여합니다.)");
    const [, , size] = str.match(regexp);
    return size;
  }
}
