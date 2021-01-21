import PropTypes from 'prop-types';
import React from 'react';
import StateControl from './StateControl'
import TextControl from './TextControl';

function textEditControl(value, onChange) {
  return (
    <TextControl value={value} onChange={onChange} />
  )
}

/**
 * Renders edit or view controls based on the current state
 * @param {Object} props.value
 * @param {bool} props.editControl
 * @returns {ReactElement} A StateControl element which handles rendering 
 */
function EditableTextControl(props) {
  const {value, onChange, editing} = props;
  
  const stateControlList = [
    {
      id: true,
      render: () => { return textEditControl(value, onChange) }
    },
    {
      id: false,
      render: () => { return value }
    }
  ];

  return (
    <StateControl stateControlList={stateControlList} state={editing}  />
  )
}

EditableTextControl.propTypes = {
  // value: PropTypes.any.isRequired,
  editing: PropTypes.bool.isRequired,
}

export default EditableTextControl;