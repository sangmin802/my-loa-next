import React, {
  PropsWithChildren,
  ReactElement,
  useCallback,
  useEffect,
} from "react";
import * as Styled from "./index.style";
import Lodash from "lodash";

interface IDialog {
  dialog: ReactElement;
  setDialog: (T: null) => void;
}

const Dialog = ({ dialog, setDialog }: PropsWithChildren<IDialog>) => {
  const handleCloseDialog = useCallback(() => {
    setDialog(null);
  }, [setDialog]);

  const fixViewport = useCallback((body, top) => {
    const style = `
    position: fixed;
    top: -${top}px;
    left: 0px;
    right: 0px;
  `;
    body.setAttribute("style", style);
  }, []);

  const resetViewport = useCallback((body, top) => {
    body.setAttribute("style", "");
    window.scrollTo(0, top);
  }, []);

  useEffect(() => {
    const body = document.querySelector("body");
    const top = window.pageYOffset;

    fixViewport(body, top);

    return () => {
      resetViewport(body, top);
    };
  }, [dialog, fixViewport, resetViewport]);

  return (
    <>
      <Styled.Background
        onClick={handleCloseDialog}
        data-testid="close-dialog"
      />
      <Styled.Container data-testid="dialog-content">{dialog}</Styled.Container>
    </>
  );
};

export default React.memo(Dialog, (left, right) => Lodash.isEqual(left, right));
