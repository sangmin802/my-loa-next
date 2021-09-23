import React from "react";
import { DangerousHTML, Image } from "../";
import * as Styled from "./index.style";

interface ITripodSkillCustom {
  data?: {
    name: null | string;
    desc: null | string;
    grade: null | string;
    src: null | string;
  };
}

const TripodSkillCustom = ({ data }: ITripodSkillCustom) => {
  const { name = null, desc = null, grade = null, src = null } = data;

  return (
    <Styled.Content src={src}>
      <Image src={src} color={`gradient${grade}`} />
      <>
        <Styled.TextContainer type="title" src={src}>
          <DangerousHTML html={name} />
        </Styled.TextContainer>
        <Styled.TextContainer type="desc" src={src}>
          <DangerousHTML html={desc} />
        </Styled.TextContainer>
      </>
    </Styled.Content>
  );
};

export default React.memo(TripodSkillCustom);
