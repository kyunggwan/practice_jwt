import { useState, useEffect } from "react";
import { signInApi } from "../../../api/SignApi/SignApi";
import { useCookies } from "react-cookie";
import { useUserStore } from "../../../stores";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import "./index.css";
import jwt_decode from "jwt-decode";
const { Text } = Typography;
interface Props {
  // setAuthView: (authView: boolean) => void;
  setAuthView: (authView: string) => void;
}

export default function SignIn(props: Props) {
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  // const [tokenInfo, setTokenInfo] = useState<object>();
  const [cookies, setCookies] = useCookies();
  const { user, setUser } = useUserStore();
  const { setAuthView } = props;

  // 콘솔 출력용
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  // 로그인 버튼 클릭 시, 값 axios로 넘어가서 반응
  const signInHandler = async () => {
    const data = {
      email,
      password,
    };

    const signInResponse = await signInApi(data);
    console.log("로그인 성공, 토큰 값: "+ signInResponse);
    if (!signInResponse) {
      alert("로그인에 실패했습니다.");
      return;
    }
    alert("로그인에 성공했습니다.");

    const { grantType, accessToken, refreshToken, accessTokenExpiresIn } =
      signInResponse; // 쿠키에 토큰, exprTime을 저장하고, user정보를 저장한다.(리덕스, zustand등 많으며 이번엔 zustand)

    // 쿠키에 토큰 정보 저장
    const expires = new Date(); // 쿠키 옵션 세팅
    expires.setMilliseconds(expires.getMilliseconds() + accessTokenExpiresIn);

    setCookies("grantType", grantType);
    setCookies("accessToken", accessToken, { expires });
    setCookies("refreshToken", refreshToken, { expires });
    // alert(cookies.accessToken); //쿠키에 들어갔는지 확인

    // accessToken을 디코드
   
      try {
        // 토큰을 디코드해서 정보를 얻습니다. zustand 저장
        const decodedToken = jwt_decode(accessToken);
        setUser(decodedToken);
        console.log(decodedToken);
        console.log(user);
      } catch (e) {
        console.log(e);
      }
   
  };

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <>
      <div className="signInForm">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 500,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
        >
          <Form.Item
            // label="ID"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your useremail!",
              },
            ]}
          >
            <Input
              prefix={[<MailOutlined />]}
              placeholder="이메일"
              allowClear
              onChange={(e) => setEmail(e.target.value)}
              size="large"
              style={{ width: 400 }}
            />
          </Form.Item>

          <Form.Item
            // label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              prefix={[<LockOutlined />]}
              placeholder="비밀번호"
              allowClear
              size="large"
              style={{ width: 400 }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>로그인 상태 유지</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: 400,
                height: 50,
                fontSize: 20,
                fontWeight: "bold",
              }}
              onClick={() => signInHandler()}
            >
              로그인
            </Button>
            <br />
            <div style={{ width: 400 }}>
              <Text type="secondary"> 등록 하시겠습니까? </Text>
              <Text strong onClick={() => setAuthView("signup")}>
                회원가입
              </Text>
              <Text type="secondary"> | </Text>
              <Text strong onClick={() => setAuthView("findpassword")}>
                비밀번호 찾기
              </Text>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
