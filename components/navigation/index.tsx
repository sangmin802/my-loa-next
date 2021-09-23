import React, {
  PropsWithChildren,
  ReactElement,
  useCallback,
  useMemo,
} from "react";
import Lodash from "lodash";
import { Button, Text, MapContainer } from "components/";
import * as Styled from "./index.style";

interface IItem {
  setNav: (T: number) => void;
  selectedSub: number;
  i?: number;
  navName?: string | ReactElement;
}

interface INavigation {
  selectedNav: number;
  setNav: (T: number) => void;
  arr?: (string | ReactElement)[];
}

const Navigation = ({
  arr,
  selectedNav,
  setNav,
}: PropsWithChildren<INavigation>) => {
  return (
    <Styled.Container>
      <MapContainer data={arr} dataKey="navName">
        <Item setNav={setNav} selectedSub={selectedNav} />
      </MapContainer>
    </Styled.Container>
  );
};

export const Item = ({
  navName,
  setNav,
  selectedSub,
  i,
}: PropsWithChildren<IItem>) => {
  const handleNavigation = useCallback(() => {
    setNav(i);
  }, [i, setNav]);

  const selected = useMemo(() => selectedSub === i, [selectedSub, i]);

  const fontColor = useMemo(() => (selected ? "white" : "#666"), [selected]);

  return (
    <Button onClick={handleNavigation}>
      <Text color={fontColor}>{navName}</Text>
    </Button>
  );
};

export default React.memo(Navigation, (left, right) =>
  Lodash.isEqual(left, right)
);
