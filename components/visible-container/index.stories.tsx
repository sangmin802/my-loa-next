import React from "react";
import NavContent from "./index";
import styled from "styled-components";

const Content = styled.div`
  color: #fff;
  text-align: center;
`;

export default {
  title: "NavContent",
  component: NavContent,
};

const Template = args => (
  <NavContent {...args}>
    <Content>Content</Content>
  </NavContent>
);

export const Show = Template.bind({});
export const hidden = Template.bind({});

Show.args = {
  type: "main",
  selected: 0,
};

hidden.args = {
  type: "sub",
  selected: 1,
};
