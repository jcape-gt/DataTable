import PropTypes from 'prop-types';
import React, {useState} from 'react';
import { MenuItem, Select } from '@material-ui/core';

// Ability to change value and callback for value changed? 
function SelectControl(props) {
  const { value, onChange, items } = props;
  const [ editValue, setNewValue ] = useState(value);

  const onLocalChange = (event) => {
    console.log(event.target.value)
    setNewValue(event.target.value);
    onChange(event.target.value);
  }

  return (
    <Select 
      format='MM/dd/yyyy' 
      value={editValue} 
      onChange={event => onLocalChange(event)} 
      fullWidth={true} 
    >
      {items.map(item => {
        return (
          <MenuItem value={item.key}>{item.value}</MenuItem>
        )
      })}
    </Select>
  )
}

export default SelectControl;
