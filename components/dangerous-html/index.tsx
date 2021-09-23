import React, { PropsWithChildren } from "react";
import * as Styled from "./index.style";

interface IDangerousHTML {
  html?: string;
}

const DangerousHTML = ({ html }: PropsWithChildren<IDangerousHTML>) => {
  return <Styled.Container dangerouslySetInnerHTML={{ __html: html }} />;
};

export default DangerousHTML;
