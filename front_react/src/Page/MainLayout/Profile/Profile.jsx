import React from 'react'
import { useUserStore } from '../../../Stores';

export default function Profile() {
    const { user } = useUserStore();
  return (
    <> 

      <div>Profile Page</div>
      <br />
      <div>userEmail:       {user.userEmail}</div>
      <div>userNickname: {user.userNickname}</div>
      <div>userPhoneNumber: {user.userPhoneNumber}</div>
      <div>userAddress:     {user.userAddress}</div>
      <br />
      

    </>
  );
}
