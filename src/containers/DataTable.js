import React from 'react';
import {useTable, useRowState} from 'react-table';
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import DataRow from './DataRow';
import PropTypes from 'prop-types';

/**
 * Renders a data table supporting CRUD functionalities
 * @param {Array} props.data
 * @param {Array} props.columns
 * @param {() => bool)} props.onSave
 * @param {() => bool)} props.onEdit
 * @param {() => bool)} props.onRevert
 * @returns {ReactElement} The data table to be rendered
 */
function DataTable(props) {
  const { 
    data, 
    columns, 
    onSave, 
    onEdit, 
    onRevert,
    initialRowState,
  } = props;
  
  const getInitialRowState = (row) => {
    return { ...initialRowState, className: "" }
  }

  const getInitialCellState = (cell) => {
    return {updatedValue: null}
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ 
    columns, 
    data, 
    initialRowStateAccessor: getInitialRowState,
    initialCellStateAccessor: getInitialCellState,
    }, useRowState
  )
    
  return (
    <MaUTable {...getTableProps()} style={{borderCollapse: 'collapse'}}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            <th>Action</th>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <TableBody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <DataRow 
              row={row} 
              key={row.id} 
              onSave={() => {onSave(row)}} 
              onEdit={() => {onEdit(row)}} 
              onRevert={() => {onRevert(row)}} 
            />
          )
        })}
      </TableBody>
    </MaUTable>
  )
}

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  onSave: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onRevert: PropTypes.func.isRequired,
}

export default DataTable;