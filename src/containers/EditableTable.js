import React from 'react';
import { useTable, useRowState } from 'react-table'
import useRowEditor from '../hooks/useRowEditor';
import RowEditStateControl from './RowEditStateControl';
import RowViewStateControl from './RowViewStateControl';
import RowStateControl from './RowStateControl';

export default function SelectableTable(props) {
  const { data, columns } = props;
  const [ rowEdit, rowSave, rowRevert ] = useRowEditor();
  
  const initialRowState = (row) => {
    return {editing: false};
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
    initialRowStateAccessor: initialRowState
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
              <td>
                <RowStateControl 
                  editing={row.state.editing}
                  editControl={() => 
                    <RowEditStateControl 
                      row={row} 
                      onSaveClick={() => rowSave(row)} 
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