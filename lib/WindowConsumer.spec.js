import React from "react";
import { View, Dimensions, Text } from "react-native";
import TestRenderer from "react-test-renderer";
import { DimensionProvider } from "./DimensionContext";
import WindowConsumer from "./WindowConsumer";

describe("WindowConsumer", () => {
  let component;

  beforeEach(() => {
    component = (
      <DimensionProvider>
        <WindowConsumer>
          {(width, height) => (
            <View>
              <Text>Width {width}</Text>
              <Text>Height {height}</Text>
            </View>
          )}
        </WindowConsumer>
      </DimensionProvider>
    );
  });

  describe("lifecyle", () => {
    test("render context", () => {
      Dimensions.set({ window: { width: 200, height: 200 } });

      const testRenderer = TestRenderer.create(component);

      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

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
