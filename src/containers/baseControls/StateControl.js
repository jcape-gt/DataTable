import PropTypes from 'prop-types';
import React from 'react';

/**
 * Conditionally renders controls based on the current state
 * @param {Map} props.stateControlMapping
 * @param {object} props.state
 * @returns {ReactElement} Rendered control for the given state
 */
function StateControl(props) {
  const { stateControlMapping, state } = props;
  const control = stateControlMapping.get(state);
  
  return (
    <div>
      { control }
    </div>
  )
}

StateControl.propTypes = {
  stateControlMapping: PropTypes.object.isRequired,
  state: PropTypes.any.isRequired,
};

export default StateControl;
