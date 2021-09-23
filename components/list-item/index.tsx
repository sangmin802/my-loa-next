import React, {
  cloneElement,
  PropsWithChildren,
  ReactElement,
  useCallback,
} from "react";
import { Image, Text, ConditionalContainer, MapContainer } from "components/";
import * as Styled from "./index.style";
import Lodash from "lodash";

interface IDetail {
  src?: string;
  grade?: string;
  subTitle: string[];
  title: string;
  hover: boolean;
}

interface IData<T> {
  backSrc?: string;
  type?: string;
  detail: T;
}

interface IListItem<T> {
  children: ReactElement;
  setDialog: (T: ReactElement) => void;
  data: T;
}

const ListItem = ({
  data,
  children,
  setDialog,
}: PropsWithChildren<Partial<IListItem<IData<IDetail>>>>) => {
  const { backSrc, detail } = data;

  const setDialogHandler = useCallback(() => {
    if (!detail?.hover) return;
    const dialog = cloneElement(children, { data });
    setDialog(dialog);
  }, [children, data, setDialog, detail]);

  return (
    <Styled.Container
      data-testid="list-item"
      hover={detail?.hover}
      onClick={setDialogHandler}
      type={data.type}
    >
      <Image src={detail?.src ?? backSrc} color={`gradient${detail?.grade}`} />
      <ConditionalContainer isRender={detail !== null}>
        <Styled.Desc type={data.type}>
          <MapContainer data={detail?.subTitle} dataKey="children">
            <Text
              color={detail?.grade ? `color${detail?.grade}` : "white"}
              type="small"
            />
          </MapContainer>
          <Text type="subTitle">{detail?.title}</Text>
        </Styled.Desc>
      </ConditionalContainer>
    </Styled.Container>
  );
};

export default React.memo(ListItem, (left, right) =>
  Lodash.isEqual(left, right)
);
