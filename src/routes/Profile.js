import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authService, dbService } from '../fireB';

const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayname);

  const onLogOutClick = () => {
    authService.signOut();
    useHistory.push("/");
  };
  const getMyMongs = async () => {
    // 이 아이디와 일치하는 mongs을 필터링해서 가지고 오기
    const mongs = await dbService.collection("mongs").where("creatorId", "==", userObj.uid).orderBy("createdAt", "desc").get();
  };
  useEffect(() => {
    getMyMongs();
  },[])
  const onChange = (event) => {
    const { target: { value } } = event;
    setNewDisplayName(value);
  }
  const onSubmit = async event => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName
      });
      refreshUser();
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Display name" onChange={onChange} value={newDisplayName} />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
}

export default Profile;