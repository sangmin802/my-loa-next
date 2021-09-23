import React from "react";
import { DoubleListContainer } from "components/";
import ListItem from "components/list-item";

interface ICollection {
  data;
  mini: {
    title: string;
    getCount: string;
    totalCount: string;
  };
}

const Collection = ({ data, mini }: ICollection) => {
  const lt = mini.title;
  const rt = `획득 : ${mini.getCount} 총 : ${mini.totalCount}`;
  return (
    <DoubleListContainer lt={lt} rt={rt} divideType="get" data={data}>
      <ListItem />
    </DoubleListContainer>
  );
};

export default React.memo(Collection);
