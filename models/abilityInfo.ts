import EquipInfo from "./equipInfo";
import Characteristic from "./characteristic";
import { PARTS_ARR, PARTS_IMAGE } from "../json/json";

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
}

interface Props {
  equipInfo: Equip;
  characteristicInfo: Characteristic;
}

export default class AbilityInfo implements Props {
  equipInfo: Equip = {
    equipment: {},
    avatar: {},
  };
  characteristicInfo: Characteristic;

  constructor(profileObj, raw) {
    PARTS_ARR.forEach((part, index) => {
      if (!part) return;
      const type = index < 12 || index > 22 ? "equipment" : "avatar";
      let divideType = null;

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

    // 장비정보가 있는경우만
    if (profileObj) this.setUserInfoEquip(profileObj.Equip, PARTS_ARR);

    // 특성설정(각인, 특성)
    const characteristic = raw.querySelector(".profile-char");
    this.characteristicInfo = new Characteristic(characteristic);
  }

  setUserInfoEquip(equip, partsArr: string[]) {
    const equipKeyArr = Object.keys(equip);
    equipKeyArr.forEach((key: string) => {
      const num = Number(key.substr(key.length - 3, key.length));
      const type = num < 12 || num > 22 ? "equipment" : "avatar";
      if (partsArr[num]) {
        const target = this.equipInfo[type][partsArr[num]];
        target.detail = new EquipInfo(equip[key], num);
      }
    });
  }
}
