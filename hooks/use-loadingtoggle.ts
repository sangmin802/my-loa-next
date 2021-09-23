import { useSelector } from "react-redux";
import { RootState } from "store/index";
import Lodash from "lodash";

export function useLoadingToggle() {
  const isLoading = useSelector(
    (state: RootState) => state.toggleReducer.isLoading,
    (left, right) => Lodash.isEqual(left, right)
  );

  return { isLoading };
}
