import React from 'react';
import RowEditStateControl from './RowEditStateControl';
import RowViewStateControl from './RowViewStateControl';
import RowStateControl from './RowStateControl';

export default function EditableRow(props) {
  const { row, onEdit, onSave, onRevert } = props;

  const styles = {
    row: {  }
  }

  return (
    <tr {...row.getRowProps()} className={row.state.className} style={styles.row}>
      {console.log(row)}
      <td>
        <RowStateControl 
          editing={row.state.editing}
          editControl={() => 
            <RowEditStateControl 
              row={row} 
              onSaveClick={() => onSave(row)} 
              onCancelClick={() => onRevert(row)} 
            />
          }
          viewControl={() => 
            <RowViewStateControl row={row} 
              onEditClick={() => {onEdit(row)}} 
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
