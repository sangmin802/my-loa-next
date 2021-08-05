import styled from "styled-components";

export const Alert = styled.article`
  text-align: center;
`;

export const Container = styled.section`
  display: flex;
  flex-wrap: wrap;

  & > article {
    width: calc((100% - 4%) / 3 - 0.01px);
    margin-right: 2%;
    margin-bottom: 2%;

    &:nth-child(3n) {
      margin-right: 0;
    }
  }
`;
