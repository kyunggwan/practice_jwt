import {useState} from 'react'
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import FindPassword from './FindPassword/FindPassword';
import './index.css';

export default function Authentication() {
  /*  authView가 signup면 SignUp을 실행
      authView가 signin면 SignIn을 실행
      authView가 findpassword면 FindPassword를 실행 */
const [authView, setAuthView] = useState<string>("signin");
  return (
    <div>
      <div className="loginForm">
        {/* {authView ? (
          <SignUp setAuthView={setAuthView} />
        ) : (
          <SignIn setAuthView={setAuthView} />
        )} */}
        {authView === "signup" ? (
          <SignUp setAuthView={setAuthView} />
        ) : authView === "findpassword" ? (
          <FindPassword setAuthView={setAuthView} />
        ) : (
          <SignIn setAuthView={setAuthView} />
        )}
      </div>
    </div>
  );
}
