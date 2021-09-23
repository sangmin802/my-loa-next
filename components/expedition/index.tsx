import React, { PropsWithChildren, ReactElement, useCallback } from "react";
import Lodash from "lodash";
import Server from "./server/index";
import { Button, Text, MapContainer } from "components/";
import * as Styled from "./index.style";

interface IUserData {
  expeditionInfo: { expeditionUserWrap: any[] };
}

interface IUserExpedition<T> {
  setDialog: (T: ReactElement) => void;
  setUserData: (T: string) => void;
  userData: T;
}

const UserExpedition = ({
  userData,
  setUserData,
  setDialog,
}: PropsWithChildren<IUserExpedition<IUserData>>) => {
  const {
    expeditionInfo: { expeditionUserWrap },
  } = userData;

  const handleExpedition = useCallback(
    e => {
      const type = e.target.dataset;

      if (type.close) return setDialog(null);
      if (type.name) return setUserData(type.name);
    },
    [setDialog, setUserData]
  );

  return (
    <Styled.Container onClick={handleExpedition}>
      <Styled.ButtonContainer>
        <Button>
          <Text data-close>닫기</Text>
        </Button>
      </Styled.ButtonContainer>
      <MapContainer data={expeditionUserWrap}>
        <Server />
      </MapContainer>
    </Styled.Container>
  );
};

export default React.memo(UserExpedition, (left, right) =>
  Lodash.isEqual(left, right)
);
