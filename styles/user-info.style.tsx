import styled, { css } from "styled-components";
import { BACKGROUND } from "constants/index";

const positionX = [
  "718px",
  "673px",
  "767px",
  "787px",
  "652px",
  "627px",
  "741px",
  "696px",
];

export const UserInfo = styled.section`
  padding: 0.5rem;
`;

export const Top = styled.section`
  position: relative;
  border-radius: 3px;
  padding: 1rem 0.5rem 1rem;

  background: ${({ theme }) => theme.backgroundColor.darkDeep};
`;

export const Bottom = styled.section`
  margin-top: 1rem;
`;

export const ButtonContainer = styled.div`
  float: right;
  padding: 0.3rem;

  ${({ theme }) => theme.contentBox}
  background: ${({ theme }) => theme.backgroundColor.darkLow};
`;

export const Container = styled.section`
  padding: 0.5rem;
  border-radius: 0 0 5px 5px;

  background: ${({ theme }) => theme.backgroundColor.darkDeep};
`;

const navigationType = {
  main: css`
    & > article {
      border-radius: 5px 5px 0 0;
    }
  `,
  sub: css<{ isShow: number; selected: number }>`
    & > article {
      width: 100%;
      border-radius: 0 5px 0 0;

      &:nth-of-type(3) {
        & > button {
          flex-grow: 1;
          margin-right: 0;
          border-radius: 3px;

          &:hover {
            background-color: #222;
          }

          ${({ selected }) =>
            `&:nth-of-type(${selected + 1}){background-color : #222;}`}

          & > div {
            width: 20px;
            height: 24px;
            margin: 0 auto;
            background: url("${BACKGROUND}");
            background-size: 1250px 1209px;
          }

          ${() => {
            let styles = "";
            positionX.forEach(
              (p, i) =>
                (styles += `&:nth-of-type(${
                  i + 1
                })  > div {background-position: ${p} 50px;};`)
            );
            return css`
              ${styles}
            `;
          }}
        }
      }
    }

    ${({ isShow }) =>
      css`
        & > article {
          display: none;

          &:nth-of-type(${isShow + 1}) {
            display: ${isShow === 2 ? "flex" : "block"};
          }
        }
      `}
  `,
};

export const Navigation = styled.section<{
  type: string;
  isShow?: number;
  selected?: number;
}>`
  ${({ type }) => navigationType[type]}
`;
