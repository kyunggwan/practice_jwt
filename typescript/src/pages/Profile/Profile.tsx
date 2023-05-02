import React,{useState, useEffect} from 'react'
import Authentication from '../Authentication/Authentication';
import ProfileDetail from './ProfileDetail/ProfileDetail';
import { useUserStore } from '../../stores';

export default function Profile() {
const { user } = useUserStore();


  return (
    <div>
      profile 로그인을 해야 볼 수 있는 게시판이다.
      {user ? <ProfileDetail /> : <Authentication />}
    </div>
  );
}
