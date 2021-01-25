import PropTypes from 'prop-types';
import React from 'react';

/**
 * Conditionally renders controls based on the current state
 * @param {{id: string, render: () => JSX}} props.stateControlList
 * @param {object} props.state
 * @returns {ReactElement} The control corresponding to the current state
 */
function StateControl(props) {
  const { stateControlList, state } = props;
  const control = stateControlList.find(e => e.id === state);
  
  return (
    <div>
      { control.render() }
    </div>
  )
}

StateControl.propTypes = {
  stateControlList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any.isRequired,
    render: PropTypes.func.isRequired
  })),
  state: PropTypes.any.isRequired,
};

export default StateControl;