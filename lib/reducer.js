import { Dimensions } from "react-native";

const DIMENSION_CHANGE = "DIMENSION_CHANGE";
export const dimensionChanged = (window, screen) => ({
  type: DIMENSION_CHANGE,
  window,
  screen
});

const DIMENSION_HYDRATE = "DIMENSION_HYDRATE";
export const dimensionHydrate = () => ({
  type: DIMENSION_HYDRATE
});

export default (state = {}, action) => {
  switch (action.type) {
    case DIMENSION_HYDRATE:
      return {
        window: Dimensions.get("window"),
        screen: Dimensions.get("screen")
      };
    case DIMENSION_CHANGE:
      let screen = state.screen;
      let window = state.window;

      // Screen isn't available on all Platforms.
      if (typeof action.screen !== "undefined") {
        screen = action.screen;
      }

      if (typeof action.window !== "undefined") {
        window = action.window;
      }

      return {
        screen,
        window
      };
    default:
      return state;
  }
};
