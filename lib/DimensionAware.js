import { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions } from "react-native";
import reducer, { dimensionHydrate, dimensionChanged } from "./reducer";

const populateDimensionProp = (propName, destination, override) => {
  if (override != null) {
    // Create a copy of the nested object to avoid state mutations.
    destination[propName] = {
      ...destination[propName]
    };

    if (typeof override.width === "number") {
      destination[propName].width = override.width;
    }
    if (typeof override.height === "number") {
      destination[propName].height = override.height;
    }
  }
};

export default class DimensionAware extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
    screen: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    }),
    window: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    })
  };

  static defaultProps = {
    screen: null,
    window: null
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
    const { render, window, screen } = this.props;
    const { data } = this.state;
    const result = {
      ...data
    };
    populateDimensionProp("window", result, window);
    populateDimensionProp("screen", result, screen);

    return render(result);
  }
}
