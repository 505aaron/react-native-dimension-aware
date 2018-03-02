import { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions } from "react-native";

const DIMENSION_CHANGE = "DIMENSION_CHANGE";
const DIMENSION_HYDRATE = "DIMENSION_HYDRATE";
const reducer = (state = {}, action) => {
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

export default class DimensionAware extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      data: reducer({}, { type: DIMENSION_HYDRATE })
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
      data: reducer(data, { type: DIMENSION_CHANGE, window, screen })
    }));
  };

  render() {
    const { render } = this.props;
    const { data } = this.state;

    return render(data);
  }
}
