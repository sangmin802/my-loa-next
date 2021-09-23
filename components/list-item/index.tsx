import React, { cloneElement, ReactElement, useCallback } from "react";
import { Image, Text, MapContainer } from "components/";
import * as Styled from "./index.style";

interface IDetail {
  src?: string;
  grade?: string;
  subTitle: string[];
  title: string;
  hover: boolean;
}

interface IData {
  backSrc?: string;
  type?: string;
  detail: IDetail;
}

interface IListItem {
  children: ReactElement;
  setDialog: (T: ReactElement) => void;
  data: IData;
}

const ListItem = ({ data, children, setDialog }: Partial<IListItem>) => {
  const { backSrc, detail } = data;

  const setDialogHandler = useCallback(() => {
    if (!detail?.hover) return;
    setDialog?.(children && cloneElement(children, { data }));
  }, [children, data, setDialog, detail]);

  return (
    <Styled.Container
      data-testid="list-item"
      hover={detail?.hover}
      onClick={setDialogHandler}
      type={data.type}
    >
      <Image src={detail?.src ?? backSrc} color={`gradient${detail?.grade}`} />
      <Styled.Desc type={data.type}>
        <MapContainer data={detail?.subTitle} dataKey="children">
          <Text
            color={detail?.grade ? `color${detail?.grade}` : "white"}
            type="small"
          />
        </MapContainer>
        <Text type="subTitle">{detail?.title}</Text>
      </Styled.Desc>
    </Styled.Container>
  );
};

export default React.memo(ListItem);
