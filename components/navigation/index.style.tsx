import styled from "styled-components";

export const Container = styled.article`
  padding: 0.5rem;
  width: fit-content;
  background: ${({ theme }) => theme.backgroundColor.darkDeep};
  > button {
    width: fit-content;
    margin-right: 1rem;
    color: #666;
  }
`;
