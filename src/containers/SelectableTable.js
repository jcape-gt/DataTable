import React from 'react';
import { useTable, useRowState } from 'react-table'

const setRowStyle = (row) => {
  if(row.state.editing) {
    return {backgroundColor: 'white'}
  }
  else {
    return {backgroundColor: 'black'}
  }
}

const printRowState = (row) => {
  console.log(row);
  row.setState((s) => {return {...s, ...{editing: !s.editing}}});
  console.log(row);
  return row;
}

export default function SelectableTable(props) {
   const data = React.useMemo(
     () => [
       {
         col1: 'Hello',
         col2: 'World',
       },
       {
         col1: 'react-table',
         col2: 'rocks',
       },
       {
         col1: 'whatever',
         col2: 'you want',
       },
     ],
     []
   )
 
   const columns = React.useMemo(
     () => [
       {
         Header: 'Column 1',
         accessor: 'col1', // accessor is the "key" in the data
       },
       {
         Header: 'Column 2',
         accessor: 'col2',
       },
     ],
     []
   )


  const initialRowStates = (row) => {
    return {editing: false};
  }
 
   const {
     getTableProps,
     getTableBodyProps,
     headerGroups,
     rows,
     prepareRow,
     setRowState,
   } = useTable({ 
      columns, 
      data, 
      initialRowStateAccessor: initialRowStates 
      }, useRowState
    )
 
   return (
     <table {...getTableProps()}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
               >
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
             <tr {...row.getRowProps()} style={setRowStyle(row)}>
               <td>
                 <button onClick={(e) => {console.log('clicked'); printRowState(row);}}>
                   State
                </button> 
               </td>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                   >
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