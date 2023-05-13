import "./index.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkEmailApi, checkEmailApi1 } from "../../../api/SignApi/SignApi";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import "./index.css";
const { Text } = Typography;
interface Props {
  setAuthView: (authView: string) => void;
}

export default function FindPassword(props: Props) {
  const [email, setEmail] = useState<string>("");

  const navigate = useNavigate();
  const { setAuthView } = props;

  // 콘솔 출력용
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  // 다음 버튼 클릭 시 email이 있는지 체크한다.
  const checkEmailHandler = async () => {
    try {
      console.log(email);

      const checkEmailResponse = await checkEmailApi1(email);
      console.log(checkEmailResponse);
      if (!checkEmailResponse) {
        alert("잘못된 요청입니다. 관리자에게 문의하세요.");
        return;
      }
      if (checkEmailResponse === true) {
        navigate("api/putnewpassword");
      }
      if (checkEmailResponse === false) {
        alert("회원 정보가 없습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <div className="findPasswordForm">
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
          <Text strong type="warning">
            비밀번호를 찾고자하는 아이디를 입력해주세요.
          </Text>
          <Form.Item
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
              onClick={checkEmailHandler}
            >
              다음
            </Button>
            <br />
            <div style={{ width: 400 }}>
              <Text type="secondary"> 이미 계정이 있으신가요? </Text>
              <Text strong onClick={() => setAuthView("signin")}>
                로그인
              </Text>
              <Text type="secondary">{" | "}</Text>
              <Text strong onClick={() => setAuthView("signup")}>
                회원가입 하기
              </Text>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
