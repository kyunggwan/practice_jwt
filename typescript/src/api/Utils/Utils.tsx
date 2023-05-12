import React from "react";
import axios from "axios";

export default function Utils() {
  return <div>Utils</div>;
}

export function setAuthorizationToken(token: string) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Autorization"];
  }
}
