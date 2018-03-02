# react-native-dimension-aware

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]

A react native library that allows you to easily respond to device dimension changes.

[build-badge]: https://travis-ci.org/505aaron/react-native-dimension-aware.svg?branch=master
[build]: https://travis-ci.org/505aaron/react-native-dimension-aware
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.com/package/react-native-dimension-aware

## Installation

`yarn add react-native-dimension-aware`

Or if you prefer npm:

`npm install --save react-native-dimension-aware`

## Usage

```javascript
import {
  DimensionAware,
  getWindowWidth,
  getWindowHeight
} from "react-native-dimension-aware";

<DimensionAware
  render={dimensions => (
    <View>
      <Text>Width {getWindowWidth(dimensions)}</Text>
      <Text>Height {getWindowHeight(dimensions)}</Text>
    </View>
  )}
/>;
```
