import React, { PropsWithChildren } from "react";
import { DoubleListContainer } from "components/";
import ListItem from "components/list-item";
import Lodash from "lodash";

interface ICollection {
  data;
  mini: {
    title: string;
    getCount: string;
    totalCount: string;
  };
}

const Collection = ({ data, mini }: PropsWithChildren<ICollection>) => {
  const lt = mini.title;
  const rt = `획득 : ${mini.getCount} 총 : ${mini.totalCount}`;
  return (
    <DoubleListContainer lt={lt} rt={rt} divideType="get" data={data}>
      <ListItem />
    </DoubleListContainer>
  );
};

export default React.memo(Collection, (left, right) =>
  Lodash.isEqual(left, right)
);
