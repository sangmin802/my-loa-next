import React from "react";
import Nav from "./index";

export default {
  title: "Nav",
  component: Nav,
};

const Template = args => <Nav {...args} />;

export const Main = Template.bind({});
export const Sub = Template.bind({});

Main.args = {
  navType: "main",
  arr: ["main1", "main2", "main3"],
  isShow: true,
  selectedNav: 1,
  setNav: () => {},
};

Sub.args = {
  navType: "sub",
  arr: ["sub1", "sub2", "sub3", "sub4", "sub5"],
  isShow: true,
  selectedNav: 2,
  setNav: () => {},
};
