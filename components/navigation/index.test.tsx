import React from "react";
import { fireEvent, render, screen } from "utils/test";
import { Item } from "./index";

describe("Navigation", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("네비게이션 선택 이벤트", () => {
    const setNav = jest.fn();
    render(<Item navName="메뉴1" setNav={setNav} selectedSub={0} i={0} />);

    fireEvent.click(screen.getByRole("button"));

    expect(setNav).toBeCalledTimes(1);
    expect(setNav).toBeCalledWith(0);
  });

  it("선택된 네비게이션 스타일", () => {
    render(<Item navName="메뉴1" setNav={null} selectedSub={0} i={0} />);

    expect(screen.getByRole("button").children[0].getAttribute("color")).toBe(
      "white"
    );
  });
});
