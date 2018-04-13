import React from "react";
import PropTypes from "prop-types";
import DimensionConsumer from "./DimensionContext";
import { getWindowWidth, getWindowHeight } from "./selectors";

const WindowConsumer = ({ children }) => {
  return (
    <DimensionConsumer>
      {dimensions =>
        children(getWindowWidth(dimensions), getWindowHeight(dimensions))
      }
    </DimensionConsumer>
  );
};

WindowConsumer.propTypes = {
  children: PropTypes.func.isRequired
};

export default WindowConsumer;
