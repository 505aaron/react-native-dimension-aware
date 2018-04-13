import React, { Component, createContext } from "react";
import PropTypes from "prop-types";
import { Dimensions } from "react-native";
import reducer, { dimensionHydrate, dimensionChanged } from "./reducer";

const { Provider, Consumer } = createContext(reducer({}, dimensionHydrate()));

export class DimensionProvider extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node)
    ])
  };

  constructor(props) {
    super(props);

    this.state = {
      data: reducer({}, dimensionHydrate())
    };
  }

  componentDidMount() {
    Dimensions.addEventListener("change", this.dimensionHandler);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.dimensionHandler);
  }

  dimensionHandler = ({ window, screen }) => {
    this.setState(({ data }) => ({
      data: reducer(data, dimensionChanged(window, screen))
    }));
  };

  render() {
    const { children } = this.props;
    const { data } = this.state;

    return <Provider value={data}>{children}</Provider>;
  }
}

export default Consumer;
