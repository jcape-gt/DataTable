import React from 'react';
import DataRowEditControl from './DataRowEditControl';
import DataRowViewControl from './DataRowViewControl';
import RowStateControl from './RowStateControl';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';

/**
 * Renders a data table supporting CRUD functionalities
 * @param {Array} props.row The data row to edit 
 * @param {(row) => void)} props.onSave
 * @param {(row) => void)} props.onEdit
 * @param {(row) => void)} props.onRevert
 * @returns {ReactElement} The data row to be rendered
 */
function DataRow(props) {
  const { row, onEdit, onSave, onRevert } = props;

  return (
    <TableRow {...row.getRowProps()} className={row.state.className}>
      <TableCell style={{width: 200}}>
        <RowStateControl 
          editing={row.state.editing}
          editControl={() => 
            <DataRowEditControl 
              row={row} 
              onSaveClick={() => onSave(row)} 
              onCancelClick={() => onRevert(row)} 
            />
          }
          viewControl={() => 
            <DataRowViewControl row={row} 
              onEditClick={() => {onEdit(row)}} 
            />
          }
        />
      </TableCell>
      {row.cells.map(cell => {
        return (
          <TableCell {...cell.getCellProps()}>
            {cell.render('Cell')}
          </TableCell>
        )
      })}
    </TableRow>
  )
}

DataRow.propTypes = {
  row: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onRevert: PropTypes.func.isRequired,
}

export default DataRow;
