import { useState } from "react";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { signInApi } from "../../../API/Index";
import { useCookies } from "react-cookie";
import { useUserStore } from "../../../Stores";

const { Text } = Typography;


export default function SignIn(props) {
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();
  const [cookies, setCookies] = useCookies();
  const {user, setUser, removeUser} = useUserStore();


  const { setAuthView } = props;

  // 콘솔 출력용
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
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

    const { token, exprTime, user } = signInResponse.data; // 쿠키에 토큰, exprTime을 저장하고, user정보를 저장한다.(리덕스, zustand등 많으며 이번엔 zustand)
    
    // 쿠키에 토큰 정보 저장
    const expires = new Date(); // 쿠키 옵션 세팅
    expires.setMilliseconds(expires.getMilliseconds() + exprTime);
    setCookies("token", token, { expires }); // 쿠키에 입력
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
            onChange={(e) => setUserEmail(e.target.value)}
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your useremail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            onChange={(e) => setUserPassword(e.target.value)}
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
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
            <Text type="secondary"> 등록 하시겠습니까? </Text>
            <Text strong onClick={() => setAuthView(true)}>
              {" "}
              회원가입{" "}
            </Text>
          </Form.Item>
        </Form>
      </div>
      {/* <Input
            prefix={<LockOutlined className={"site-form-item-icon"} />}
            type={"password"}
            placeholder={"Password"}
          />/>; */}
    </>
  );
}