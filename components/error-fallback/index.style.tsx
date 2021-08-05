import styled from "styled-components";

export const ErrorFallback = styled.section`
  background: ${({ theme }) => theme.backgroundColor.darkDeep};
`;

export const ImageContainer = styled.div`
  width: 40%;
  max-width: 300px;
  margin: 20px auto 40px;
  border-radius: 50%;
  overflow: hidden;
`;

export const TextContainer = styled.div`
  text-align: center;
`;

export const ButtonContainer = styled.div`
  width: fit-content;
  padding: 0.3rem 0.6rem;
  margin: 10px auto 0;
  ${({ theme }) => theme.contentBox}
`;
