import React from 'react'
import { useUserStore } from "../../stores";
import Home from '../../Main/Home/Home';
import Authentication from '../Authentication/Authentication';

export default function Login() {
    const { user } = useUserStore();
  return <div>{user ? <Home /> : <Authentication />}</div>;
}
