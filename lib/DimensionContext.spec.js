import React from "react";
import { View, Dimensions, Text } from "react-native";
import TestRenderer from "react-test-renderer";
import DimensionConsumer, { DimensionProvider } from "./DimensionContext";
import { getWindowWidth, getWindowHeight } from "./selectors";

describe("DimensionContext", () => {
  let component;

  beforeEach(() => {
    component = (
      <DimensionProvider>
        <DimensionConsumer>
          {dimensions => (
            <View>
              <Text>Width {getWindowWidth(dimensions)}</Text>
              <Text>Height {getWindowHeight(dimensions)}</Text>
            </View>
          )}
        </DimensionConsumer>
      </DimensionProvider>
    );
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
