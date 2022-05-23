import React, { useEffect, useState } from 'react';
import { dbService } from '../fireB';
import Post from '../components/Post';
import MongForm from '../components/MongForm';

const Home = ({userObj}) => {
  const [mongs, setMongs] = useState([]);
  
  useEffect(() => {
    dbService.collection("mongs").orderBy("createdAt", "desc").onSnapshot(snapshot => {
      const mongArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), }));
      setMongs(mongArray);
    })
  }, []);
  

  return (
    <div>
      <MongForm userObj={userObj} />
      <div>
        {mongs.map(mong => (
          <Post key={mong.id} mongObj={mong} isOwner={mong.creatorId === userObj.uid} />
          ))
        }
      </div>
    </div>
  );
}
  
export default Home;