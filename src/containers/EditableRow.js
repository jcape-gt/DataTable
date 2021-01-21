import React from 'react';
import RowEditStateControl from './RowEditStateControl';
import RowViewStateControl from './RowViewStateControl';
import RowStateControl from './RowStateControl';

export default function EditableRow(props) {
  const { row } = props;

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
}
