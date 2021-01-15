import PropTypes from 'prop-types';
import React from 'react';

/**
 * A control containing row actions displayed when row is in edit mode
 * @param {() => {}} props.onSaveClick
 * @param {() => {}} props.onCancelClick
 * @returns {ReactElement} The element to be rendered
 */
function RowEditStateControl(props) {
  const { onSaveClick, onCancelClick } = props;

  return (
    <div>
      <button onClick={(e) => { onSaveClick() }}>
        Save
      </button> 
      <button onClick={(e) => { onCancelClick() }}>
        Cancel
      </button> 
    </div>
  )
}

RowEditStateControl.propTypes = {
  onSaveClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
}

export default RowEditStateControl;