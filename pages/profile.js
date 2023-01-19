import Image from 'next/image';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';

export default function UserProfile() {
  const { user } = useAuth();
  // search parse date to watever u want it to be
  // const time = user.metadata.lastSignInTime;
  // console.warn('user', time.toISOString()); this is broken! its not a function

  return (
    <div>
      <Image src={user.photoURL} alt="userURL" width="100px" height="100px" />
      <h1>Name: {user.displayName}</h1>
      <h3>Email: {user.email}</h3>
      <h4>Last Login: {user.metadata.lastSignInTime}</h4>
      <Button type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}
