import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
function Note(props) {
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button
        onClick={() => {
          props.deletePost(props.id);
        }}
      >
        <DeleteIcon/>
      </button>
      <button
        onClick={() => {
          props.fillnotes(props.index, props.id);
        }}
      >
        <EditIcon />
      </button>
    </div>
  );
}

export default Note;
