import React from 'react';
import { useTable, useRowState } from 'react-table';
import useRowEditor from '../hooks/useRowEditor';
import RowEditStateControl from './RowEditStateControl';
import RowViewStateControl from './RowViewStateControl';
import RowStateControl from './RowStateControl';

export default function SelectableTable(props) {
  const { data, columns, onSave } = props;
  const [ getRowEditorState, rowEdit, rowSave, rowRevert ] = useRowEditor();
  
  const initialRowState = (row) => {
    //const handlerState = getInitialRowHandlerState();
    const handlerState = {dataState: 'unmodified'};
    const rowEditorState = getRowEditorState();
    return { ...handlerState, ...rowEditorState, updatedValues: {}, }
  }

  const initialCellState = (cell) => {
    return {updatedValue: null}
  }

  const onLocalSave = (row) => {
    onSave(row.state.updatedValues);
    rowSave(row);
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
    <table {...getTableProps()}>
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
            <tr {...row.getRowProps()}>
              {console.log(row.getRowProps())}
              <td>
                <RowStateControl 
                  editing={row.state.editing}
                  editControl={() => 
                    <RowEditStateControl 
                      row={row} 
                      onSaveClick={() => onLocalSave(row)} 
                      onCancelClick={() =>  rowRevert(row)} 
                    />
                  }
                  viewControl={() => 
                    <RowViewStateControl row={row} 
                      onEditClick={() => {rowEdit(row)}} 
                    />
                  }
                />
              </td>
              {row.cells.map(cell => {
                return (
                  <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}