import { createGlobalStyle, css } from "styled-components";

export const THEME = {
  fontColor: {
    color0: "#a19f9f",
    color1: "#4e8d01",
    color2: "#0063aa",
    color3: "#700099",
    color4: "#ff9500",
    color5: "#ff5e00",
    white: "#f0f4f5",
    "#666": "#666",
    timeOut: "#ff9933",
    colorget: "#b3e27a",
    colornoGet: "#e76f6b",
  },
  fontSize: {
    normal: "1rem",
    desc: "0.9rem",
    subTitle: "0.8rem",
    title: "1.2rem",
    small: "0.7rem",
  },
  gradientColor: {
    "gradient-1": "linear-gradient(135deg, #232323, #7a0000)",
    gradient0: "linear-gradient(135deg, #232323, #575757)",
    gradient1: "linear-gradient(135deg, #18220b, #304911)",
    gradient2: "linear-gradient(135deg, #111f2c, #113d5d)",
    gradient3: "linear-gradient(135deg, #261331, #480d5d)",
    gradient4: "linear-gradient(135deg, #362003, #9e5f04)",
    gradient5: "linear-gradient(135deg, #341a09, #a24006)",
  },
  backgroundColor: {
    darkDeep: "#000000",
    darkLow: "#1f222a",
  },
  contentBox: css`
    border-radius: 3px;
    border: 1px solid #f0f4f5;
  `,
  scrollbar: css`
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  isShow: css<{ isShow: boolean }>`
    display: ${({ isShow }) => (isShow ? "block" : "none")};
  `,
  isLoading: css`
    height: 100vh;
    overflow: hidden;
  `,
};

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    font-family: "oneMobile", sans-serif;
  }

  body {
    ${THEME.scrollbar}
    background : ${THEME.backgroundColor.darkDeep};
  }

  @media all and (min-width: 768px) {
    html {
      font-size: 16px;
    }
  }
  @media screen and (max-width: 767px) {
    html {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 400px) {
    html {
      font-size: 10px;
    }
  }
`;
