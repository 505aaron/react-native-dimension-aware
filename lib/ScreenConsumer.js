import React from "react";
import PropTypes from "prop-types";
import DimensionConsumer from "./DimensionContext";
import { getScreenWidth, getScreenHeight } from "./selectors";

const ScreenConsumer = ({ children }) => {
  return (
    <DimensionConsumer>
      {dimensions =>
        children(getScreenWidth(dimensions), getScreenHeight(dimensions))
      }
    </DimensionConsumer>
  );
};

ScreenConsumer.propTypes = {
  children: PropTypes.func.isRequired
};

export default ScreenConsumer;
