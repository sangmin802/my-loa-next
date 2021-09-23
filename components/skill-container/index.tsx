import React, { PropsWithChildren, ReactElement } from "react";
import {
  VisibleContainer,
  DoubleListContainer,
  ListItem,
  DetailContent,
  Rune,
} from "components/";
import Lodash from "lodash";

interface IUserData {
  skillInfo: {
    battleSkill;
    lifeSkill;
  };
}

interface ISkillContainer<T> {
  userData: T;
  subNav: number;
  setDialog(T: ReactElement): void;
}

const SkillContainer = ({
  userData,
  subNav,
  setDialog,
}: PropsWithChildren<ISkillContainer<IUserData>>) => {
  const { battleSkill = null, lifeSkill } = userData.skillInfo;

  return (
    <VisibleContainer selected={subNav}>
      <DoubleListContainer
        lt={`사용 : ${battleSkill.usePoint}`}
        rt={`총 : ${battleSkill.getPoint}`}
        data={battleSkill.skills}
        divideType="leftSkill"
      >
        <ListItem setDialog={setDialog}>
          <DetailContent>
            <Rune />
          </DetailContent>
        </ListItem>
      </DoubleListContainer>
      <DoubleListContainer data={lifeSkill} divideType="leftSkill">
        <ListItem />
      </DoubleListContainer>
    </VisibleContainer>
  );
};

export default React.memo(SkillContainer, (left, right) =>
  Lodash.isEqual(left, right)
);
