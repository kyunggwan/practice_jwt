import { useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Typography
} from "antd";
import { signInApi } from "../../../API/Index";
const { Text, Link } = Typography;


export default function SignIn(props) {
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setuserPassword] = useState();
  const { setAuthView } = props;

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const signUpHandler = async () => {
    const data = {
      userEmail: userEmail,
      userPassword: userPassword,
    };

    const signUpResponse = await signInApi(data);
    if (!signUpResponse) {
      alert("로그인에 실패했습니다.");
      return;
    }
    if (!signUpResponse.result) {
      alert("로그인에 실패했습니다.");
      return;
    }
    alert("로그인에 성공했습니다.");

    setAuthView(false);
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
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
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
              onClick={() => signUpHandler()}
            >
              로그인
            </Button>
            <Text type="secondary"  >      등록 하시겠습니까? </Text>
            <Text strong onClick={() => setAuthView(true)} >      회원가입 </Text>
            
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
