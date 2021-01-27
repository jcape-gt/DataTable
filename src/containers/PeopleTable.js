import React from 'react';
import DataTable from './DataTable';
import DataTextControl from './DataTextControl';
import DataDateControl from './DataDateControl';

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
  const onSave = (updatedData) => {
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

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        Cell: (cell) => {
          const { editing } = cell.row.state;

          const setUpdatedValue = (row, key, value) => {
            const updatedValues = {...row.state.updatedValues, ...{[key]: value}}
            row.setState({...row.state, ...{updatedValues: updatedValues}});
          }

          return (
            <DataTextControl 
              value={cell.value} 
              onChange={
                (val) => {
                  setUpdatedValue(cell.row, 'name', val);
                }
              } 
              editing={editing} 
            />
          )
        }
      },
      {
        Header: 'Birthday',
        accessor: 'birthday',

        Cell: (cell) => {
          const { editing } = cell.row.state;

          const setUpdatedValue = (row, key, value) => {
            const updatedValues = {...row.state.updatedValues, ...{[key]: value.toLocaleDateString('en-US')}}
            row.setState({...row.state, ...{updatedValues: updatedValues}});
          }

          return (
            <DataDateControl 
              value={cell.value} 
              onChange={
                (val) => {
                  setUpdatedValue(cell.row, 'birthday', val);
                }
              } 
              editing={editing} 
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
    ],
    []
  )

  return (
    <DataTable 
      data={data} 
      columns={columns} 
      onSave={onSave} 
      onEdit={onEdit}
      onRevert={onRevert}
    />
  )
}