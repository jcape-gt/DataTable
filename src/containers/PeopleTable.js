import React from 'react';
import useRowEditor from '../hooks/useRowEditor';
import DataTable from './DataTable';
import DataTextControl from './DataTextControl';
import DataDateControl from './DataDateControl';
import withEditing from '../hocs/withEditing';

export default function PeopleTable(props) {
  const [data, setData] = React.useState(
    [
      { id: 1, name: 'Jesse', birthday: '10/27/1988' },
      { id: 2, name: 'Brittany', birthday: '11/23/1989', },
      { id: 3, name: 'Molli', birthday: '04/06/2018', },
    ]
  );

  /**
   * Handles save logic for the updated data
   * @param {Object} updatedData Updated object to be saved 
   */
  const onSave = (row) => {
    const updatedData = row.state.dirtyValues;
    setData([...data].map(o => {
      if(o.id === updatedData.id) {
        return {...o, ...updatedData}
      }
      else return o
    }))
  }

  const onEdit = (row) => {
    row.setState((prevState) => {
      return {...prevState, ...{className: 'Mui-selected'}}
    })
    console.log('Editing..');
  }

  const onRevert = (row) => {
    row.setState((prevState) => {
      return {...prevState, ...{className: 'row-read'}}
    })
    console.log('onRevert..');
  }

  const [ 
    initialRowEditState, 
    rowEdit, 
    rowSave, 
    rowRevert 
  ] = useRowEditor(onEdit, onSave, onRevert);

  const EditableCell = withEditing(DataTextControl);
  const EditableDateCell = withEditing(DataDateControl);

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
      Cell: (cell) => {
        return (
          <EditableCell 
            value={cell.value} 
            accessor='name'
            row={cell.row} 
          />
        )
      }
    },
    {
      Header: 'Birthday',
      accessor: 'birthday',

      Cell: (cell) => {
        return (
          <EditableDateCell 
            row={cell.row} 
            accessor='birthday' 
            value={cell.value} 
          />
        )
      }
    },
    {
      accessor: 'id',
      Cell: (cell) => {
        return(<div></div>);
      }
    },
  ]

  return (
    <DataTable 
      data={data} 
      columns={columns} 
      onSave={rowSave} 
      onEdit={rowEdit}
      onRevert={rowRevert}
      initialRowState={initialRowEditState}
    />
  )
}