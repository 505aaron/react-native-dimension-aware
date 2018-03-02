import React from "react";
import { View, Dimensions, Text } from "react-native";
import TestRenderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";
import DimensionAware from "./DimensionAware";
import { getWindowWidth, getWindowHeight } from "./selectors";

describe("DimensionAware", () => {
  let shallowRenderer;
  let component;

  beforeEach(() => {
    shallowRenderer = new ShallowRenderer();

    component = (
      <DimensionAware
        render={dimensions => (
          <View>
            <Text>Width {getWindowWidth(dimensions)}</Text>
            <Text>Height {getWindowHeight(dimensions)}</Text>
          </View>
        )}
      />
    );
  });

  test("renders", () => {
    shallowRenderer.render(component);

    const tree = shallowRenderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });

  describe("lifecyle", () => {
    test("should re-render the component on updates", () => {
      const testRenderer = TestRenderer.create(component);

      Dimensions.set({ window: { width: 4000, height: 2000 } });

      testRenderer.update(component);

      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    test("should remove listeners", () => {
      const testRenderer = TestRenderer.create(component);

      testRenderer.unmount();

      Dimensions.set({ window: { width: 4000, height: 2000 } });

      expect(testRenderer.toJSON()).toBeNull();
    });
  });
});
