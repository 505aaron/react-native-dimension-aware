import React from "react";
import { View, Dimensions, Text } from "react-native";
import TestRenderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";
import DimensionAware from "./DimensionAware";
import {
  getWindowWidth,
  getWindowHeight,
  getScreenHeight,
  getScreenWidth
} from "./selectors";

describe("DimensionAware", () => {
  let shallowRenderer;
  let component;

  beforeEach(() => {
    shallowRenderer = new ShallowRenderer();
  });

  test("renders", () => {
    shallowRenderer.render(
      <DimensionAware
        render={dimensions => (
          <View>
            <Text>Width {getWindowWidth(dimensions)}</Text>
            <Text>Height {getWindowHeight(dimensions)}</Text>
          </View>
        )}
      />
    );

    const tree = shallowRenderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });

  describe("lifecyle", () => {
    describe("window", () => {
      beforeEach(() => {
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

      test("should override width", () => {
        const testRenderer = TestRenderer.create(component);

        Dimensions.set({ window: { width: 4000, height: 2000 } });

        testRenderer.update(
          <DimensionAware
            window={{ width: 30 }}
            render={dimensions => (
              <View>
                <Text>Width {getWindowWidth(dimensions)}</Text>
                <Text>Height {getWindowHeight(dimensions)}</Text>
              </View>
            )}
          />
        );

        expect(testRenderer.toJSON()).toMatchSnapshot();
      });

      test("should override height", () => {
        const testRenderer = TestRenderer.create(component);

        Dimensions.set({ window: { width: 4000, height: 2000 } });

        testRenderer.update(
          <DimensionAware
            window={{ height: 30 }}
            render={dimensions => (
              <View>
                <Text>Width {getWindowWidth(dimensions)}</Text>
                <Text>Height {getWindowHeight(dimensions)}</Text>
              </View>
            )}
          />
        );

        expect(testRenderer.toJSON()).toMatchSnapshot();
      });

      test("should override both", () => {
        const testRenderer = TestRenderer.create(component);

        Dimensions.set({ window: { width: 4000, height: 2000 } });

        testRenderer.update(
          <DimensionAware
            window={{ height: 30, width: 60 }}
            render={dimensions => (
              <View>
                <Text>Width {getWindowWidth(dimensions)}</Text>
                <Text>Height {getWindowHeight(dimensions)}</Text>
              </View>
            )}
          />
        );

        expect(testRenderer.toJSON()).toMatchSnapshot();
      });
    });

    describe("screen", () => {
      beforeEach(() => {
        component = (
          <DimensionAware
            render={dimensions => (
              <View>
                <Text>Width {getScreenWidth(dimensions)}</Text>
                <Text>Height {getScreenHeight(dimensions)}</Text>
              </View>
            )}
          />
        );
      });

      test("should re-render the component on updates", () => {
        const testRenderer = TestRenderer.create(component);

        Dimensions.set({ screen: { width: 4000, height: 2000 } });

        testRenderer.update(component);

        expect(testRenderer.toJSON()).toMatchSnapshot();
      });

      test("should remove listeners", () => {
        const testRenderer = TestRenderer.create(component);

        testRenderer.unmount();

        Dimensions.set({ screen: { width: 4000, height: 2000 } });

        expect(testRenderer.toJSON()).toBeNull();
      });

      test("should override width", () => {
        const testRenderer = TestRenderer.create(component);

        Dimensions.set({ screen: { width: 4000, height: 2000 } });

        testRenderer.update(
          <DimensionAware
            screen={{ width: 30 }}
            render={dimensions => (
              <View>
                <Text>Width {getScreenWidth(dimensions)}</Text>
                <Text>Height {getScreenHeight(dimensions)}</Text>
              </View>
            )}
          />
        );

        expect(testRenderer.toJSON()).toMatchSnapshot();
      });

      test("should override height", () => {
        const testRenderer = TestRenderer.create(component);

        Dimensions.set({ screen: { width: 4000, height: 2000 } });

        testRenderer.update(
          <DimensionAware
            screen={{ height: 30 }}
            render={dimensions => (
              <View>
                <Text>Width {getScreenWidth(dimensions)}</Text>
                <Text>Height {getScreenHeight(dimensions)}</Text>
              </View>
            )}
          />
        );

        expect(testRenderer.toJSON()).toMatchSnapshot();
      });

      test("should override both", () => {
        const testRenderer = TestRenderer.create(component);

        Dimensions.set({ screen: { width: 4000, height: 2000 } });

        testRenderer.update(
          <DimensionAware
            screen={{ height: 30, width: 60 }}
            render={dimensions => (
              <View>
                <Text>Width {getScreenWidth(dimensions)}</Text>
                <Text>Height {getScreenHeight(dimensions)}</Text>
              </View>
            )}
          />
        );

        expect(testRenderer.toJSON()).toMatchSnapshot();
      });
    });
  });
});
