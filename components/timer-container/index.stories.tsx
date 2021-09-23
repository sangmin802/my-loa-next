import React from "react";
import TimerContainer from "./index";
import { DAILY_ISLAND } from "json/timer";

export default {
  title: "TimerContainer",
  component: TimerContainer,
};

const Template = args => <TimerContainer {...args} />;

export const Default = Template.bind({});

Default.args = {
  data: DAILY_ISLAND,
};
