import { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions } from "react-native";
import reducer, { DIMENSION_CHANGE, DIMENSION_HYDRATE } from "./reducer";

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
