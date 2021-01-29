import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';

// Ability to change value and callback for value changed? 
function DateControl(props) {
  const { value, onChange } = props;
  const [ editValue, setNewValue ] = useState(value);

  const onLocalChange = (date, value) => {
    setNewValue(value);
    onChange(value);
  }

  return (
    <KeyboardDatePicker 
      format='MM/dd/yyyy' 
      value={editValue} 
      onChange={(date, value) => onLocalChange(date, value)} 
      fullWidth={true} 
    />
  )
}

DateControl.propTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default DateControl;