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

export const Notification = styled.div`
  width: fit-content;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.2rem 0.4rem;

  ${({ theme }) => theme.contentBox};
  background: ${({ theme }) => theme.backgroundColor.darkDeep};
  border-radius: 3px 3px 3px 0;
`;
