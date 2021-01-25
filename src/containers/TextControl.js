import PropTypes from 'prop-types';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

// Ability to change value and callback for value changed? 
function TextControl(props) {
  const { onChange, value } = props;
  const [editValue, setNewValue] = useState(value);

  const onLocalChange = (value) => {
    setNewValue(value);
    onChange(value);
  }

  return (
    <TextField value={editValue} onChange={(event) => onLocalChange(event.target.value)} />
  )
}

TextControl.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
}

export default TextControl;