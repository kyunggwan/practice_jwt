import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import { userPatchApi } from '../../../API/Index';
import { useCookies } from "react-cookie";
import { findUserApi } from '../../../API/funcAPI';
const { Text } = Typography;

export default function UserPatch() {
  const usenavigate = useNavigate();
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setuserPassword] = useState();
  const [userPasswordCheck, setuserPasswordCheck] = useState();
  const [userNickname, setuserNickname] = useState();
  const [userPhoneNumber, setuserPhoneNumber] = useState();
  const [userAddress, setuserAddress] = useState();
  const [userAddressDetail, setuserAddressDetail] = useState();
  const [keyword, setKeyword] = useState();
  const [findList, setFindList] = useState();
  const[token, setToken] = useState("");
  const [cookies] = useCookies();

  useEffect(() => {
    const token = cookies.token;
    setToken(token);
  }, [cookies.token]);



  const userListHandler = () => {
    usenavigate("/api/userlist");
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const userPatchHandler = async (token) => {
    const data = { headers: {
        Authorization: `Bearer ${token}`,
    },
      userEmail: userEmail,
      userPassword: userPassword,
      userPasswordCheck: userPasswordCheck,
      userNickname: userNickname,
      userPhoneNumber: userPhoneNumber,
      userAddress: userAddress,
      userAddressDetail: userAddressDetail,
    };

    const userPatchResponse = await userPatchApi(data);
    if (!userPatchResponse) {
      alert("회원 정보 수정에 실패했습니다.");
      return;
    }
    if (!userPatchResponse.result) {
      alert("회원가입에 실패했습니다.");
      return;
    }
    alert("회원가입에 성공했습니다.");
  };

// const findUserHandler = async (keyword) => {
//     const data = {
//         keyword: keyword,
//     };
//  const findUserResponse = await findUserApi(data);
//         if (!findUserResponse) {
//           alert(" findUserList리턴값이 없습니다.");
//           return;
//         } else {
//           setFindList(findUserResponse);
//         }
//   };

  return (
    <>
      <div>회원 정보 수정, 삭제 페이지</div>
      {findList}
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
          autoComplete="on"
        >
          <Form.Item
            label="userEmail"
            name="userEmail"
            onChange={(e) => setKeyword(e.target.value)}
            rules={[
              {
                message: "Please input keyword!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            // onClick={() => findUserHandler()}
            variant="contained"
          >
            Email 검색
          </Button>
        </Form>

        {/* <Form
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
            label="userEmail"
            name="userEmail"
            onChange={(e) => setUserEmail(e.target.value)}
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

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "column",
            }}
          >
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => userPatchHandler()}
                variant="contained"
              >
                회원 정보 수정
              </Button>
              <Button type="primary" onClick={() => userListHandler()}>
                회원 목록
              </Button>
              <br />
            </Form.Item>
          </div>
        </Form> */}
      </>
    </>
  );
}
