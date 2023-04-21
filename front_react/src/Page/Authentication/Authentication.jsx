import React, { useState } from "react";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import "./index.css";

export default function Authentication() {
  // authView가 true면 signUp을 실행
  // authView가 false면 signIn을 실행
  const [authView, setAuthView] = useState(false);

  return (
    <>
      <div className="loginForm">
        {authView ? (
          <SignUp setAuthView={setAuthView} />
        ) : (
          <SignIn setAuthView={setAuthView} />
        )}
      </div>
    </>
  );
}
