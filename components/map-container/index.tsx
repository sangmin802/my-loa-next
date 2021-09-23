import React, { cloneElement, PropsWithChildren, ReactElement } from "react";
import Lodash from "lodash";

interface IMapContainer {
  data: any[];
  dataKey?: string;
  children: ReactElement;
}

const MapContainer = ({
  data = [],
  dataKey = "data",
  children,
}: PropsWithChildren<IMapContainer>) => (
  <>
    {data.map((data, i) =>
      cloneElement(children, { [dataKey]: data, key: i, i })
    )}
  </>
);

export default React.memo(MapContainer, (left, right) =>
  Lodash.isEqual(left, right)
);
