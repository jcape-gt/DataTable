import { useState } from 'react';

export default function useRowEditor(onEdit, onSave, onRevert) {
  const [rowEditor, setRowEditor] = useState({isEditing: false, snapshot: {}});
  
  const getRowEditorState = () => {
    return {editing: false};
  }

  const rowEdit = (row) => {
    if(!rowEditor.isEditing) {
      onEdit(row);
      setRowEditor({...rowEditor, ...{isEditing: true, snapshot: row}});
      row.setState({...row.state, ...{editing: true, updatedValues: row.values}})
    }
  }

  const rowSave = (row) => {
    if(row.state.editing) {
      onSave(row.state.updatedValues);
      setRowEditor({...rowEditor, ...{isEditing: false, snapshot: {}}});
      row.setState({...row.state, ...{editing: false}})
    }
  }

  const rowRevert = (row) => {
    if(row.state.editing) {
      onRevert(row);
      setRowEditor({...rowEditor, ...{isEditing: false, snapshot: {}}});
      row.setState({...row.state, ...{editing: false}})
    }
  }

  return [getRowEditorState, rowEdit, rowSave, rowRevert];
}
