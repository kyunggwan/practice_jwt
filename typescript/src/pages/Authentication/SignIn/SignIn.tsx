import React,{useState} from 'react'
import { signInApi } from '../../../api/SignApi/SignApi';
import { useCookies } from "react-cookie";
import { useUserStore } from '../../../stores';

import { Button, Checkbox, Form, Input, Typography } from "antd";
const { Text } = Typography;
interface Props {
  setAuthView: (authView: boolean) => void;
}

export default function SignIn(props: Props) {
  const [userEmail, setUserEmail] = useState<String>("");
  const [userPassword, setUserPassword] = useState<String>("");
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
      userEmail,
      userPassword,
    };

    const signInResponse = await signInApi(data);
    if (!signInResponse) {
      alert("로그인에 실패했습니다.");
      return;
    }
    if (!signInResponse.result) {
      alert("로그인에 실패했습니다.");
      return;
    }
    alert("로그인에 성공했습니다.");

    const { grantType, accessToken, refreshToken, accessTokenExpiresIn, user } = signInResponse.data; // 쿠키에 토큰, exprTime을 저장하고, user정보를 저장한다.(리덕스, zustand등 많으며 이번엔 zustand)

    // 쿠키에 토큰 정보 저장
    const expires = new Date(); // 쿠키 옵션 세팅
    expires.setMilliseconds(expires.getMilliseconds() + accessTokenExpiresIn);
    // setCookies("grantType", grantType, "accessToken", accessToken, "refreshToken", refreshToken,  { expires }); // 쿠키에 입력
    setCookies("grantType", grantType, { expires });

    setCookies("accessToken", accessToken, { expires });

    setCookies("refreshToken", refreshToken, { expires });
    // alert(cookies.token) 쿠키에 들어갔는지 확인

    // 유저 정보 저장
    setUser(user);
  };
  return (
    <>
      <div className="LoginForm">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your useremail!",
              },
            ]}
          >
            <Input
              onChange={(e) =>
                setUserEmail(e.target.value)
              }
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password onChange={(e) => setUserPassword(e.target.value)} />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => signInHandler()}
            >
              로그인
            </Button>
            <br />
            <Text type="secondary"> 등록 하시겠습니까? </Text>
            <Text strong onClick={() => setAuthView(true)}>
              회원가입
            </Text>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}