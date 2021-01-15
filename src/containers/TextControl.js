import React, { useState } from 'react';

// Ability to change value and callback for value changed? 
function TextControl(props) {
  const { onChange, value } = props;
  const [editValue, setNewValue] = useState(value);

  const onLocalChange = (value) => {
    setNewValue(value);
    onChange(value);
  }

  return (
    <input value={editValue} onChange={(event) => onLocalChange(event.target.value)} />
  )
}

export default TextControl;