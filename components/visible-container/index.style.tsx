import styled from "styled-components";

export const Content = styled.article<{ isShow: boolean }>`
  ${({ theme }) => theme.isShow}
`;
