import React from 'react';
import { useTable, useRowState } from 'react-table';
import useRowEditor from '../hooks/useRowEditor';
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
    onRevert 
  } = props;

  const [ 
    getRowEditorState, 
    rowEdit, 
    rowSave, 
    rowRevert 
  ] = useRowEditor(onEdit, onSave, onRevert);
  
  const initialRowState = (row) => {
    const handlerState = {dataState: 'unmodified'};
    const rowEditorState = getRowEditorState();
    return { ...handlerState, ...rowEditorState, dirtyValues: {}, className: "" }
  }

  const initialCellState = (cell) => {
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
    initialRowStateAccessor: initialRowState,
    initialCellStateAccessor: initialCellState,
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
              onSave={() => {rowSave(row)}} 
              onEdit={() => {rowEdit(row)}} 
              onRevert={() => {rowRevert(row)}} 
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