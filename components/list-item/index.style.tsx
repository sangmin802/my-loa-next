import styled, { css } from "styled-components";

const containerType = {
  normal: css`
    .img-container {
      width: 12%;
      min-width: 40px;
      margin-right: 0.5rem;
      img {
        ${({ theme }) => theme.contentBox}
      }
    }
  `,
  collection: css`
    .img-container {
      display: none;
    }
  `,
};

export const Container = styled.article<{ hover: boolean; type: string }>`
  min-height: 56px;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0.3rem;
  border-radius: 3px;

  cursor: ${({ hover }) => (hover ? "pointer" : "")};
  background: ${({ theme }) => theme.backgroundColor.darkLow};
  ${({ type }) => {
    const index = type === "collection" ? type : "normal";
    return containerType[index];
  }}
`;

const descType = {
  normal: css`
    width: calc(88% - 0.5rem -0.1px);
    min-width: calc(100% - 0.5rem - 40.1px);
  `,
  collection: `
    display: flex;
    div:first-child {
      margin-right: 0.3rem;
    }
  `,
};

export const Desc = styled.div<{ type: string }>`
  ${({ type }) => {
    const index = type === "collection" ? type : "normal";
    return descType[index];
  }}
`;
