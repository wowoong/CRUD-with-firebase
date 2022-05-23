import React, { useState } from 'react';
import { dbService, storageService } from '../fireB';
import { v4 as uuidv4 } from 'uuid';

const MongForm = ({ userObj }) => {
  const [mong, setMong] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const newMongPosting = {
      text: mong,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl
    }
    await dbService.collection("mongs").add(newMongPosting);
    setMong("");
    setAttachment("");
  }
  const onChange = event => {
    const { target: { value } } = event;
    setMong(value);
  };
  const onFileChange = event => {
    const { target: { files } } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = finishedEvent => {
      const {currentTarget: {result}} = finishedEvent;
      setAttachment(result);
    }
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment("");

  return (
    <form onSubmit={onSubmit}>
      <input value={mong} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Mong" />
      {attachment &&
        <>
        <img src={attachment} width="50px" height="50px" alt='' />
        <button onClick={onClearAttachment}>Clear</button>
        </>}
    </form>
  )
};

export default MongForm;