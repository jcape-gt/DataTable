import PropTypes from 'prop-types';
import React from 'react';
import StateControl from './StateControl'

/**
 * Renders edit or view controls based on the current state
 * @param {bool} props.editing
 * @param {() => ReactElement} props.editControl
 * @param {() => ReactElement} props.viewControl
 * @returns {ReactElement} A StateControl element which handles rendering 
 */
function RowStateControl(props) {
  const {editing, editControl, viewControl} = props;
  
  const stateControlList = [
    {
      id: true,
      render: () => { return editControl(editing) }
    },
    {
      id: false,
      render: () => { return viewControl(editing) }
    }
  ];

  return (
    <StateControl stateControlList={stateControlList} state={editing} />
  )
}

RowStateControl.propTypes = {
  editing: PropTypes.bool.isRequired,
  editControl: PropTypes.func.isRequired,
  viewControl: PropTypes.func.isRequired
}

export default RowStateControl;