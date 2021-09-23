import { getOnlyText } from "utils/parse-string";

interface ItemPartBox {
  title: string;
  desc: string;
}
interface IndentStringGroup {
  title: string;
  desc: string[];
}
interface TripodSkillCustom {
  name: string;
  desc: string;
  grade: string;
  src: string | null;
}

interface Props {
  hover: boolean;
  title: string;
  subTitle: (string | null)[];
  quality: number;
  src: string;
  grade: number;
  itemPartBox: ItemPartBox[];
  indentStringGroup: IndentStringGroup[];
  tripodSkillCustom: TripodSkillCustom[];
}

export default class EquipInfo implements Props {
  hover: boolean;
  title: string;
  subTitle: (string | null)[] = [];
  quality: number;
  src: string;
  grade: number;
  itemPartBox: ItemPartBox[] = [];
  indentStringGroup: IndentStringGroup[] = [];
  tripodSkillCustom: TripodSkillCustom[] = [];

  constructor(data, num, public setEngrave, type) {
    const v = Object.values(data);
    const NameTagBox = this.findType(v, "NameTagBox"); // 아이템 이름
    const ItemTitle = this.findType(v, "ItemTitle"); // 아이템 세부 설명
    let ItemPartBox = this.filterType(v, "ItemPartBox");
    ItemPartBox = ItemPartBox.length === 0 ? null : ItemPartBox;
    let IndentStringGroup = this.filterType(v, "IndentStringGroup");
    IndentStringGroup =
      IndentStringGroup.length === 0 ? null : IndentStringGroup;
    let TripodSkillCustom = this.filterType(v, "TripodSkillCustom");
    TripodSkillCustom =
      TripodSkillCustom.length === 0 ? null : TripodSkillCustom;

    this.title = getOnlyText(NameTagBox.value) as string;
    let regex = new RegExp(/leftStr[0-9]/g);
    const subTitleArr = Object.keys(ItemTitle.value).filter(res =>
      res.match(regex)
    );
    subTitleArr.forEach(res => {
      let val = ItemTitle.value[res];
      if (val.includes("품질")) return;
      if (val === "") val = "아이템 레벨 -";
      this.subTitle.push(getOnlyText(val) as string);
    });
    this.quality = ItemTitle.value.qualityValue ?? null;
    this.src = ItemTitle.value.slotData.iconPath
      ? "//cdn-lostark.game.onstove.com/" + ItemTitle.value.slotData.iconPath
      : null;
    this.grade = ItemTitle.value.slotData.iconGrade ?? null;
    this.hover = true;

    // 텍스트 그룹 여러개의 구조
    ItemPartBox?.forEach(res => {
      const els: string[] = Object.values(res.value);

      this.itemPartBox.push({
        title: els[0],
        desc: num === 26 ? this.wristbandSrcReaplce(els[1]) : els[1],
      });
    });

    if (type === "acc" || type === "stone") {
      this.engraveExtraction(
        Object.values(ItemPartBox[ItemPartBox.length - 1].value)[1]
      );
    }

    // 텍스트 그룹이 여러개 있고, 각각의 타이틀을 갖고있는 구조
    //  c?Active = 활성화 or 비활성화
    IndentStringGroup?.forEach(res => {
      Object.values(res.value).forEach(({ topStr, contentStr: c1 }) => {
        // 제목
        const title = topStr;
        let desc = [];
        // 값

        Object.values(c1).forEach(({ contentStr: c2 }) => {
          desc.push(c2);
        });

        this.indentStringGroup.push({ title, desc });
      });
    });

    // 이미지와 등급 배경을 갖고있는 구조
    TripodSkillCustom?.forEach(res => {
      const els = Object.values(res.value);
      els.forEach(({ name, desc, slotData }) => {
        this.tripodSkillCustom.push({
          name: name,
          desc: desc,
          grade: slotData?.iconGrade,
          src: slotData?.iconPath
            ? "//cdn-lostark.game.onstove.com/" + slotData?.iconPath
            : null,
        });
      });
    });
  }

  filterType(arr, type) {
    return arr.filter(res => res.type === type);
  }

  findType(arr, type) {
    return arr.find(res => res.type === type);
  }

  wristbandSrcReaplce(str) {
    return str
      .replace(
        /emoticon_tooltip_bracelet_locked/gi,
        "https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/game/ico_tooltip_locked.png"
      )
      .replace(
        /emoticon_tooltip_bracelet_changeable/gi,
        "https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/game/ico_tooltip_changeable.png"
      );
  }

  engraveExtraction(str) {
    const engraves = str.split("<BR>");
    engraves.forEach(str => {
      const regexp = new RegExp("(.*?'>)(.*?)(</FONT>] 활성도 \\+)(\\d*)");
      const [, , name, , size] = str.match(regexp);
      this.setEngrave(name, size);
    });
  }
}
