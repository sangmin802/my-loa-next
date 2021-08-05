import styled from "styled-components";
import { BACKGROUND } from "constants/index";

export const Container = styled.div`
  position: relative;
  margin-bottom: 10px;
  padding: 0.5rem;
`;

export const Main = styled.main`
  max-width: 600px;
  min-width: 310px;
  margin: 0 auto;
  border-radius: 3px;

  background: ${({ theme }) => theme.backgroundColor.darkLow};
`;

export const HeaderContainer = styled.div`
  margin-bottom: 1.5rem;
`;

export const InnerHeader = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 0.5rem;
`;

export const Background = styled.div`
  background-image: url("${BACKGROUND}");
  background-position: 403px 3.5px;
  width: 160px;
  margin: 0 auto 10px;
  height: 50px;
  cursor: pointer;
`;

export const Form = styled.form`
  display: flex;
  margin: 0 auto;
  width: 60%;
  height: fit-content;
`;

export const InputText = styled.div`
  width: 80%;
  padding: 0.3rem;
  border-bottom: 1px solid #f0f4f5;

  input {
    font-size: 1rem;
  }
`;

export const InputSubmit = styled.b`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.contentBox}
  border-radius: 3px 3px 3px 0;
`;
