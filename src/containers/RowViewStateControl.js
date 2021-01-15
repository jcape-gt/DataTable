import PropTypes from 'prop-types';
import React from 'react';

/**
 * A control containing row actions displayed when row is in view mode
 * @param {() => {}} props.onEditClick
 * @returns {ReactElement} The element to be rendered
 */
function RowViewStateControl(props) {
  const { onEditClick } = props;

  return (
    <button onClick={(e) => { onEditClick() }}>
        Edit
    </button> 
  )
}

RowViewStateControl.propTypes = {
  onEditClick: PropTypes.func.isRequired
}

export default RowViewStateControl;