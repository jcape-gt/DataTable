import PropTypes from 'prop-types';
import React from 'react';
import DataControl from './DataControl';
import DateControl from '../baseControls/DateControl';

function DataDateControl(props) {
  const { value, editing, onChange } = props;

  return (
    <DataControl 
      editing={editing}
      viewControl={(value)}
      editControl={<DateControl value={value} onChange={onChange} />}
    />
  )
}

DataDateControl.propTypes = {
  value: PropTypes.any.isRequired,
  editing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default DataDateControl;