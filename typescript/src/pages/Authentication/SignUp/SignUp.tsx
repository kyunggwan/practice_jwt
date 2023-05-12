import {useState} from 'react'
import { signUpApi } from '../../../api/SignApi/SignApi';
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import './index.css';
const { Text } = Typography;

interface Props {
  // setAuthView: (authView: boolean) => void;
  setAuthView: (authView: string) => void;
}

export default function SignUp(props: Props) {
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  // const [userPasswordCheck, setuserPasswordCheck] = useState<String>("");
  const [nickname, setNickname] = useState<String>("");
  // const [userPhoneNumber, setuserPhoneNumber] = useState<String>("");
  // const [userAddress, setuserAddress] = useState<String>("");
  // const [userAddressDetail, setuserAddressDetail] = useState<String>("");

  const { setAuthView } = props;

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const signUpHandler = async () => {
    const data = {
      email: email,
      password: password,
      // userPasswordCheck: userPasswordCheck,
      nickname: nickname,
      // userPhoneNumber: userPhoneNumber,
      // userAddress: userAddress,
      // userAddressDetail: userAddressDetail,
    };

    const signUpResponse = await signUpApi(data);
    if (!signUpResponse) {
      alert("회원가입에 실패했습니다.");
      return;
    }
    alert(signUpResponse.email+"님의 회원가입에 성공했습니다.");

    setAuthView("signin");
  };

  return (
    <div className="signUpForm">
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
        <Text className="description"> 이메일 </Text>
        <Form.Item
          // label="이메일 주소"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            type="email"
            size="large"
            style={{ width: 400 }}
            allowClear
            onChange={(e) => setEmail(e.target.value)}
            prefix={<MailOutlined />}
            placeholder={"이메일"}
          />
        </Form.Item>

        <Text className="description">비밀번호</Text>
        <Form.Item
          // label="비밀번호"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            size="large"
            style={{ width: 400 }}
            allowClear
            onChange={(e) => setPassword(e.target.value)}
            prefix={<LockOutlined />}
            placeholder={"비밀번호"}
            onBlur={() => {
              // 비밀번호 유효성 검사
              const passwordRegex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\\|\[\]{};:'",.<>\/?])(?=.*[^\s]).{8,}$/;
              const isValidPassword = passwordRegex.test(password as string);

              // 유효성 검사 결과에 따라 동작 수행
              if (isValidPassword) {
                // 유효한 비밀번호일 경우의 동작
                console.log("유효한 비밀번호입니다.");
              } else {
                // 유효하지 않은 비밀번호일 경우의 동작
                alert(
                  "유효하지 않은 비밀번호입니다. 최소 8자리로 대소문자, 숫자를 포함하여 공백없이 작성해주세요 "
                );
              }
            }}
          />
        </Form.Item>

        <Text className="description">닉네임</Text>
        <Form.Item
          // label="닉네임"
          name="nickname"
          rules={[
            {
              required: false,
              message: "Please input your nickname!",
            },
          ]}
        >
          <Input
            size="large"
            placeholder={"닉네임"}
            style={{ width: 400 }}
            onChange={(e) => setNickname(e.target.value)}
          />
        </Form.Item>

        {/* <Form.Item
          label="비밀번호 확인"
          name="userPasswordCheck"
          rules={[
            {
              required: true,
              message: "Please input your userPasswordCheck!",
            },
          ]}
        >
          <Input.Password
            onChange={(e) => setuserPasswordCheck(e.target.value)}
          />
        </Form.Item> */}

        {/* <Form.Item
          label="닉네임"
          name="userNickname"
          rules={[
            {
              required: true,
              message: "Please input your userNickname!",
            },
          ]}
        >
          <Input onChange={(e) => setuserNickname(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="휴대폰 번호"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Please input your phoneNumber!",
            },
          ]}
        >
          <Input onChange={(e) => setuserPhoneNumber(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="주소"
          name="userAddress"
          rules={[
            {
              required: true,
              message: "Please input your userAddress!",
            },
          ]}
        >
          <Input onChange={(e) => setuserAddress(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="상세 주소"
          name="userAddressDetail"
          rules={[
            {
              required: false,
              message: "Please input your userAddressDetail!",
            },
          ]}
        >
          <Input onChange={(e) => setuserAddressDetail(e.target.value)} />
        </Form.Item> */}

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
            onClick={() => signUpHandler()}
          >
            회원가입
          </Button>
          <br />
         
            <Text type="secondary"> 이미 계정이 있으신가요? </Text>
            <Text strong onClick={() => setAuthView("signin")}>
              로그인
            </Text>
       
        </Form.Item>
      </Form>
    </div>
  );
}