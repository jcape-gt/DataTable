import PropTypes from 'prop-types';
import React from 'react';
import StateControl from './StateControl';
import TextControl from './TextControl';

/**
 * Renders a text control with view and edit mode
 * @param {Object} props.value Control's current data value 
 * @param {(val) => void} props.onChange Control's value change callback
 * @param {bool} props.editing Whether control is in edit mode
 * @returns {ReactElement} StateControl element which handles rendering 
 */
function DataTextControl(props) {
  const {value, onChange, editing} = props;
  
  const stateControlList = [
    {
      id: true,
      render: () => { return <TextControl value={value} onChange={onChange} /> }
    },
    {
      id: false,
      render: () => { return value }
    }
  ];

  return (
    <StateControl stateControlList={stateControlList} state={editing} />
  )
}

DataTextControl.propTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
}

export default DataTextControl;
