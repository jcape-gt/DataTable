import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import DataControl from './DataControl';

function EditControl(props) {
  return (
    <KeyboardDatePicker 
      format='MM/dd/yyyy' 
      value={props.value} 
      onChange={(date) => props.onChange(date)} 
      fullWidth={true} 
    />
  )
}

function DataDateControl(props) {
  const { value, editing, onChange } = props;
  const [ editValue, setNewValue ] = useState(value);

  const onLocalChange = (value) => {
    setNewValue(value);
    onChange(value);
  }

  return (
    <DataControl 
      editing={editing}
      viewControl={(value)}
      editControl={<EditControl value={editValue} onChange={onLocalChange} />}
    />
  )
}

DataDateControl.propTypes = {
  value: PropTypes.any.isRequired,
  editing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default DataDateControl;