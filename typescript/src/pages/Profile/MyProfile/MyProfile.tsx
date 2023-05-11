import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useUserStore } from "../../../stores";
import {
  Card,
  Input,
  Table,
  Divider,
  Space,
  List,
  Typography,
  Form,
  Button,
} from "antd";
import { MailOutlined, LockOutlined, EditOutlined } from "@ant-design/icons";
import { myInfoApi } from "../../../api/UserApi/UserApi";
import './index.css';
const { Text } = Typography;

interface Member {
  id: number;
  email: string;
  nickname: string;
  password: string;
  authority: string;
}

export default function MyProfile() {
  const [myInfo, setMyInfo] = useState<Member>();
  const [cookies] = useCookies();
  const { user, setUser } = useUserStore();
  // const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [passwordEditForm, setPasswordEditForm] = useState<boolean>(false);
  const [nicknameEditForm, setNicknameEditForm] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<String>("");

  useEffect(() => {
    const token = cookies.accessToken;
    if (token) getMyProfile(token);
    else setMyInfo(undefined);
  }, [cookies.accessToken]);

  const getMyProfile = async (token: any) => {
    const requestOption = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const myInfoResponse = await myInfoApi(requestOption);
    if (!myInfoResponse) {
      alert("리턴값이 없습니다.");
      return;
    } else {
      setMyInfo(myInfoResponse);
    }
  };

  /* 비밀번호 수정 버튼 클릭 */
  const passwordEdit = () => {
    /* Edit Form이 나오게 한다 */
    setPasswordEditForm(true);
  };

  /* 확인 버튼 */
  const passwordEditOk = () => {
    // 비밀번호 수정 로직 추가
    // setIsModalVisible(false);
  };

  /* 취소 버튼 */
  const passwordEditCancel = () => {
    setPasswordEditForm(false);
  };

  /* 닉네임 수정 버튼 클릭 */
  const nickNameEdit = () => {
    setNicknameEditForm(true);
  };
  /* 확인 버튼 */
  const nicknameEditOk = () => {
    // 비밀번호 수정 로직 추가

  };

  /* 취소 버튼 */
  const nicknameEditCancel = () => {
    setNicknameEditForm(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  console.log(myInfo);
  return (
    <div>
      <List>
        <List.Item
          className="profile-item"
          style={{ borderBottom: "3px solid black" }}
        >
          <h2 style={{ marginRight: "10px" }}>
            {myInfo && myInfo.email}'s Profile
          </h2>
          <div>
            {myInfo && myInfo.email}님의 권한은 '{user.auth}' 입니다.
          </div>
        </List.Item>

        <List.Item className="profile-item">
          <div>
            <Text strong>회원번호</Text>
          </div>
          <div>{user.sub}</div>
          <div></div>
        </List.Item>

        <List.Item className="profile-item">
          <div>
            <Text strong>Email</Text>
          </div>
          <div>{myInfo && myInfo.email}</div>
          <div></div>
        </List.Item>

        <List.Item className="profile-item">
          <div style={{ display: "inline-block" }}>
            <Text strong>Password</Text>
          </div>
          <div>{myInfo && myInfo.password}</div>
          {!passwordEditForm && (
            <Button
              className="edit-button"
              type="ghost"
              icon={<EditOutlined />}
              onClick={() => passwordEdit()}
            >
              비밀번호 변경
            </Button>
          )}
          {passwordEditForm && (
            <Form>
              <Form.Item label="현재 비밀번호">
                <Input.Password placeholder="현재 비밀번호를 입력하세요" />
              </Form.Item>
              <Form.Item label="새로운 비밀번호">
                <Input.Password placeholder="새로운 비밀번호를 입력하세요" />
              </Form.Item>
              <Form.Item label="새로운 비밀번호 확인">
                <Input.Password placeholder="새로운 비밀번호를 다시 입력하세요" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" danger>
                  확인
                </Button>
                <Button
                  style={{ marginLeft: "10px" }}
                  onClick={() => passwordEditCancel()}
                >
                  취소
                </Button>
              </Form.Item>
            </Form>
          )}
        </List.Item>

        <List.Item className="profile-item">
          <div>
            <Text strong>Nickname</Text>
          </div>
          <div>{myInfo && myInfo.nickname}</div>
          {nicknameEditForm && (
            <Form>
              <List>
                <List.Item>
                  이번달 수정 가능 횟수 4회(월 최대 4회까지만 변경 가능합니다).
                </List.Item>
                <List.Item>길이는 최대 15자 이내로 작성해주세요.</List.Item>
                <List.Item>중복 닉네임 불가합니다.</List.Item>
                <List.Item>
                  이모티콘 및 일부 특수문자 사용 불가합니다.
                  &amp;&lt;&gt;()&#x27;/
                </List.Item>
              </List>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "닉네임을 입력해주세요.",
                  },
                ]}
              >
                <Input placeholder="닉네임 입력(최대 15자)" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" danger>
                  확인
                </Button>
                <Button
                  style={{ marginLeft: "10px" }}
                  onClick={() => nicknameEditCancel()}
                >
                  취소
                </Button>
              </Form.Item>
            </Form>
          )}
          <Button
            className="edit-button"
            type="ghost"
            icon={<EditOutlined />}
            onClick={() => nickNameEdit()}
          >
            닉네임 변경
          </Button>
        </List.Item>
      </List>
      <Divider className="divider_top" />
      <Text strong>회원탈퇴</Text>
    </div>
  );
}
