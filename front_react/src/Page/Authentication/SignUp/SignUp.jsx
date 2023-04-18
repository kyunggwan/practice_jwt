import { useState } from "react";
import { signUpApi } from "../../../API/Index";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import {
  Button,
  Form,
  Input,
  Typography
} from "antd";
const { Text } = Typography;

export default function SignUp(props) {
  const { setAuthView } = props;
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setuserPassword] = useState();
  const [userPasswordCheck, setuserPasswordCheck] = useState();
  const [userNickname, setuserNickname] = useState();
  const [userPhoneNumber, setuserPhoneNumber] = useState();
  const [userAddress, setuserAddress] = useState();
  const [userAddressDetail, setuserAddressDetail] = useState();

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
      userPasswordCheck: userPasswordCheck,
      userNickname: userNickname,
      userPhoneNumber: userPhoneNumber,
      userAddress: userAddress,
      userAddressDetail: userAddressDetail,
    };

    const signUpResponse = await signUpApi(data);
    if (!signUpResponse) {
      alert("회원가입에 실패했습니다.");
      return;
    }
    if (!signUpResponse.result) {
      alert("회원가입에 실패했습니다.");
      return;
    }
    alert("회원가입에 성공했습니다.");

    setAuthView(false);
  };

  return (
    <>
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
          label="이메일 주소"
          name="username"
          type="email"
          onChange={(e) => setUserEmail(e.target.value)}
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input prefix={<MailOutlined placeholder={"email"} />} />
        </Form.Item>

        <Form.Item
          label="비밀번호"
          name="password"
          onChange={(e) => setuserPassword(e.target.value)}
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
          label="비밀번호 확인"
          name="userPasswordCheck"
          onChange={(e) => setuserPasswordCheck(e.target.value)}
          rules={[
            {
              required: true,
              message: "Please input your userPasswordCheck!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="닉네임"
          name="userNickname"
          onChange={(e) => setuserNickname(e.target.value)}
          rules={[
            {
              required: true,
              message: "Please input your userNickname!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="휴대폰 번호"
          name="phoneNumber"
          onChange={(e) => setuserPhoneNumber(e.target.value)}
          rules={[
            {
              required: true,
              message: "Please input your phoneNumber!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="주소"
          name="userAddress"
          onChange={(e) => setuserAddress(e.target.value)}
          rules={[
            {
              required: true,
              message: "Please input your userAddress!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="상세 주소"
          name="userAddressDetail"
          onChange={(e) => setuserAddressDetail(e.target.value)}
          rules={[
            {
              required: false,
              message: "Please input your userAddressDetail!",
            },
          ]}
        >
          <Input />
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
            variant="contained"
          >
            회원가입
          </Button>

          <Text type="secondary">      이미 계정이 있으신가요? </Text>
          <Text strong onClick={() => setAuthView(false)}>   로그인</Text>
        </Form.Item>
      </Form>
      {/* 
      <Card sx={{ minWidth: 275, maxWidth: "50vw", padding: 5 }}>
        <Box>
          <Typography variant="h5">회원가입</Typography>
        </Box>
        <Box>
          <Button fullWidth onClick={() => signUpHandler()} variant="contained">
            회원가입
          </Button>
        </Box>
        <Box component="div" display="flex" mt={2}>
          <Typography>이미 계정이 있으신가요?</Typography>
          <Typography
            fontWeight={800}
            ml={1}
            onClick={() => setAuthView(false)}
          >
            로그인
          </Typography>
        </Box>
      </Card> */}
    </>
  );
}
