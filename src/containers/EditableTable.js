import React from 'react';
import { useTable, useRowState } from 'react-table';
import useRowEditor from '../hooks/useRowEditor';
import EditableRow from './EditableRow';

export default function SelectableTable(props) {
  const { data, columns, onSave, onEdit, onRevert } = props;
  const [ getRowEditorState, rowEdit, rowSave, rowRevert ] = useRowEditor();
  
  const initialRowState = (row) => {
    //const handlerState = getInitialRowHandlerState();
    const handlerState = {dataState: 'unmodified'};
    const rowEditorState = getRowEditorState();
    return { ...handlerState, ...rowEditorState, updatedValues: {}, className: "" }
  }

  const initialCellState = (cell) => {
    return {updatedValue: null}
  }

  const onRowSave = (row) => {
    onSave(row.state.updatedValues);
    rowSave(row);
  }

  const onRowEdit = (row) => {
    rowEdit(row);
    onEdit(row);
    
  }

  const onRowRevert = (row) => {
    rowRevert(row);
    onRevert(row);
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
    <table {...getTableProps()} style={{borderCollapse: 'collapse'}}>
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
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <EditableRow 
              row={row} 
              key={row.id} 
              onSave={() => {onRowSave(row)}} 
              onEdit={() => {onRowEdit(row)}} 
              onRevert={() => {onRowRevert(row)}} 
            />
          )
        })}
      </tbody>
    </table>
  )
}