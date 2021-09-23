import React, { cloneElement, ReactElement } from "react";

interface IMapContainer {
  data: any[];
  dataKey?: string;
  children: ReactElement;
}

const MapContainer = ({
  data = [],
  dataKey = "data",
  children,
}: IMapContainer) => (
  <>
    {data.map((data, i) =>
      cloneElement(children, { [dataKey]: data, key: i, i })
    )}
  </>
);

export default React.memo(MapContainer);
