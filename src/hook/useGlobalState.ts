import { createGlobalState } from "react-hooks-global-state";

interface stateType {
  isOpenSidebar: boolean
}

const initialState: stateType = {
  isOpenSidebar: false
};

const { useGlobalState } = createGlobalState(initialState);
export { useGlobalState }