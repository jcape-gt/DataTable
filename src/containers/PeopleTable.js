import React from 'react';
import EditableTable from './EditableTable';
import EditableTextControl from './EditableTextControl';

export default function PeopleTable(props) {

  const [data, setData] = React.useState(
    [
      { name: 'Jesse', age: '33' },
      { name: 'Brittany', age: '32', },
      { name: 'Molli', age: '3', },
    ]
  );

  const updateData = (rowIndex, key, value) => {
    setData(old => old.map((row, index) => {
      if (index === rowIndex) {
        return {
          ...old[rowIndex],
          [key]: value
        }
      }
      return row;
    }))
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        Cell: (cell) => {
          const { editing } = cell.row.state;
          const index = cell.row.index;
          const key = cell.column.id;

          return (
            // <EditableTextControl value={cell.value} onChange={(val) => {updateData(index, key, val)}} editing={editing} />
            <EditableTextControl value={cell.value} onChange={() => {}} editing={editing} />
          )
        }
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
    ],
    []
  )

  return (
    <EditableTable data={data} columns={columns} />
  )
}