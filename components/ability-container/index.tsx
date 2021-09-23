import React, { PropsWithChildren, ReactElement } from "react";
import {
  VisibleContainer,
  DoubleListContainer,
  ListItem,
  DetailContent,
  Quality,
  MapContainer,
  Characteristic,
} from "components/";
import Lodash from "lodash";

interface IUserData {
  abilityInfo: {
    characteristicInfo: { battle; basic; engrave };
    equipInfo: { equipment; avatar };
  };
}

interface IAbilityContainer<T> {
  userData: T;
  subNav: number;
  setDialog(T: ReactElement): void;
}

const AbilityContainer = ({
  userData,
  subNav,
  setDialog,
}: PropsWithChildren<IAbilityContainer<IUserData>>) => {
  const {
    characteristicInfo,
    equipInfo: { equipment, avatar },
  } = userData.abilityInfo;
  const { battle, basic, engrave } = characteristicInfo;

  return (
    <VisibleContainer selected={subNav}>
      <DoubleListContainer data={Object.values(equipment)} divideType="equip">
        <ListItem setDialog={setDialog}>
          <DetailContent>
            <Quality />
          </DetailContent>
        </ListItem>
      </DoubleListContainer>
      <DoubleListContainer data={Object.values(avatar)} divideType="inner">
        <ListItem setDialog={setDialog}>
          <DetailContent />
        </ListItem>
      </DoubleListContainer>
      <MapContainer data={[basic, battle, engrave]}>
        <Characteristic />
      </MapContainer>
    </VisibleContainer>
  );
};

export default React.memo(AbilityContainer, (left, right) =>
  Lodash.isEqual(left, right)
);
