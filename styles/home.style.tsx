import styled, { css } from "styled-components";

const contentType = {
  event: css`
    display: flex;
    flex-wrap: wrap;
  `,
};

export const Home = styled.section`
  padding: 0.5rem;
`;

export const Section = styled.section`
  margin-top: 0.7rem;
`;

export const Content = styled.section<{ type?: string }>`
  ${({ type }) => contentType[type]}

  & > article {
    width: calc((100% - 0.5rem) / 2 - 0.1px);
    margin-right: 0.5rem;
    margin-top: 0.5rem;

    &:nth-child(2n) {
      margin-right: 0;
    }
  }
`;
