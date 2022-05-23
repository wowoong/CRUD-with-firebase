import React from 'react';
import AuthForm from '../components/AuthForm';
import { authService, firebaseInstnace } from '../fireB';



const Auth = () => {
  const onSocialClick = async (event) => {
    const { target: { name } } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstnace.auth.GoogleAuthProvider();
    }
    if (name === "twitter") {
      provider = new firebaseInstnace.auth.TwitterAuthProvider();
    }
    await authService.signInWithPopup(provider);
  } 

  return (
    <div>
      <AuthForm />
      <div>
        <button onClick={onSocialClick} name="google">continue whith Google</button>
        <button onClick={onSocialClick} name="twitter ">continue whith Twitter</button>
      </div>
    </div>
  );
};
export default Auth;