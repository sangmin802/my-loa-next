import React, { ReactElement, useMemo } from "react";
import {
  DoubleListContainer,
  ListItem,
  DetailContent,
  Quality,
  MapContainer,
  Characteristic,
  Engrave,
} from "components/";
import * as Styled from "./index.style";

interface IUserData {
  abilityInfo: {
    characteristicInfo: { battle; basic; engrave };
    equipInfo: { equipment; avatar; badge; gem };
    engrave;
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
}: IAbilityContainer<IUserData>) => {
  const {
    characteristicInfo,
    equipInfo: { equipment, avatar, badge, gem },
    engrave,
  } = userData.abilityInfo;
  const { battle, basic } = characteristicInfo;
  const sortedEngrave = useMemo(
    () =>
      [...engrave.values()]
        .filter(e => e.size >= 5)
        .sort((a, b) => {
          if (a.size > b.size) return -1;
          return 0;
        }),
    [engrave]
  );
  const memoized = useMemo(() => {
    return [
      <DoubleListContainer data={Object.values(equipment)} divideType="equip">
        <ListItem setDialog={setDialog}>
          <DetailContent>
            <Quality />
          </DetailContent>
        </ListItem>
      </DoubleListContainer>,
      <DoubleListContainer data={Object.values(avatar)} divideType="inner">
        <ListItem setDialog={setDialog}>
          <DetailContent />
        </ListItem>
      </DoubleListContainer>,
      <>
        <Styled.ContainerMargin>
          <DoubleListContainer
            data={sortedEngrave}
            lt="증가 능력"
            rt="감소 능력"
            divideType="buff"
          >
            <Engrave />
          </DoubleListContainer>
        </Styled.ContainerMargin>
        <MapContainer data={[basic, battle]}>
          <Characteristic />
        </MapContainer>
      </>,
      <DoubleListContainer data={Object.values(gem)}>
        <ListItem setDialog={setDialog}>
          <DetailContent />
        </ListItem>
      </DoubleListContainer>,
    ];
  }, [equipment, avatar, basic, battle, setDialog, sortedEngrave]);

  return <>{memoized[subNav]}</>;
};

export default React.memo(AbilityContainer);
