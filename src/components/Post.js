import React, { useState } from 'react';
import { dbService, storageService } from '../fireB';

const Post = ({ mongObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newPosting, setNewPosting] = useState(mongObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete?");
    if (ok) {
      // delete
      await dbService.doc(`mongs/${mongObj.id}`).delete();
      await storageService.refFromURL(mongObj.attachmentUrl).delete();
    }
  }
  const toggleEditing = () => setEditing(prev => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`mongs/${mongObj.id}`).update({ text: newPosting });
    setEditing(false);
  };
  const onChange = event => {
    const { target: { value } } = event;
    setNewPosting(value);
  };

  return (
    <div>
      {
        editing ? (
          <>
            {isOwner && (
              <>
                <form onSubmit={onSubmit}>
                  <input type="text" value={newPosting} onChange={onChange} required />
                  <input type="submit" value="Update" />
                </form>
                <button onClick={toggleEditing}>Cancel</button>
              </>
            )}
          </>
        ) : (
          <>
              <h4>{mongObj.text}</h4>
              {mongObj.attachmentUrl && <img src={mongObj.attachmentUrl} alt="" width="50px" height="50px" /> }
            {isOwner && (
              <>
                <button onClick={onDeleteClick}>Delete</button>
                <button onClick={toggleEditing}>Edit</button>
              </>
              )}
          </>)
      }
    </div>
  );
};

export default Post;