import React, { useState } from "react";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";

export default function Authentication() {
  // authView가 true면 signUp을 실행
  // authView가 false면 signIn을 실행
  const [authView, setAuthView] = useState(false);

  return (
    <>
      {authView ? (
        <SignUp setAuthView={setAuthView} />
      ) : (
        <SignIn setAuthView={setAuthView} />
      )}
         {/* {authView ? (
        <SignIn setAuthView={setAuthView} />
      ) : (
        <SignUp setAuthView={setAuthView} />
      )} */}
    </>
  );
}
