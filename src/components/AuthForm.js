import React, { useState } from 'react';
import { authService } from '../fireB';

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const onSubmit = async event => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // create account
        data = await authService.createUserWithEmailAndPassword(email, password);
      } else {
        // log in
        data = await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const onChange = event => {
    const { target: { name, value } } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }
  const toggleAccount = () => setNewAccount(prev => !prev);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input name="email" type="email" placeholder='Email' value={email} onChange={onChange} required/>
        <input name="password" type="password" placeholder='PassWard' value={password} onChange={onChange} required/>
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        {error}
      </form>
      <span onClick={toggleAccount}>{newAccount ? "Sign in" : " Create Account"}</span>
    </>
  )
}

export default AuthForm;