import React from "react";
import Detail from "./index";
import { USER_DATA } from "constants/index";

export default {
  title: "Detail",
  component: Detail,
};

const Template = args => (
  <Detail {...args}>
    <>Children Content</>
  </Detail>
);

export const Equipment = Template.bind({});
export const Avatar = Template.bind({});
export const Skill = Template.bind({});

Equipment.args = {
  data: USER_DATA.abilityInfo.equipInfo.equipment["000_weapon"],
};
Avatar.args = {
  data: USER_DATA.abilityInfo.equipInfo.avatar["012_av_weapon"],
};
Skill.args = {
  data: USER_DATA.skillInfo.battleSkill.skills[0],
};
