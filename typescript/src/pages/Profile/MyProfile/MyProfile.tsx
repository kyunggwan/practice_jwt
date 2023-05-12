import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useUserStore } from "../../../stores";
import { useNavigate } from "react-router-dom";
import { Input, Divider, List, Typography, Form, Button } from "antd";
import { MailOutlined, LockOutlined, EditOutlined } from "@ant-design/icons";
import {
  deleteUserApi,
  myInfoApi,
  passwordEditApi,
} from "../../../api/UserApi/UserApi";
import "./index.css";
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
  const [cookies, setCookies] = useCookies();
  const { user, setUser, removeUser } = useUserStore();
  const navigate = useNavigate();
  // const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [passwordEditForm, setPasswordEditForm] = useState<boolean>(false);
  const [nicknameEditForm, setNicknameEditForm] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<String>("");
  const [newPassword, setNewPassword] = useState<String>("");
  const [confirmPassword, setConfirmPassword] = useState<String>("");

  useEffect(() => {
    const token = cookies.accessToken;
    if (token) getMyProfile();
    else setMyInfo(undefined);
  }, [cookies.accessToken]);
  
  /* 개인 프로필 정보 불러오기 */
  const getMyProfile = async () => {
    const myInfoResponse = await myInfoApi();
    if (!myInfoResponse) {
      alert("MyProfile값이 없습니다.(토큰 만료))");
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

  /* 비밀번호 수정의 확인 버튼 */
  const passwordEditOk = async () => {
    if (newPassword !== confirmPassword) {
      alert("새로운 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }

    if (currentPassword === newPassword) {
      alert(
        "현재 비밀번호와 새로운 비밀번호가 동일합니다. 다른 비밀번호를 선택해주세요."
      );
      return;
    }

    try {
      const token = cookies.accessToken;

      const requestOption = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = {
        email: myInfo?.email,
        exPassword: currentPassword,
        newPassword: newPassword,
      };

      const passwordEditResponse = await passwordEditApi(data, requestOption);
      if (!passwordEditResponse) {
        alert("비밀번호 수정에 실패했습니다.");
        return;
      }
      alert("비밀번호 수정 완료!");
    } catch (error) {
      console.error(error);
      alert("비밀번호 수정 중 오류가 발생했습니다.");
    }
  };

  /* 비밀번호 수정의 취소 버튼 */
  const passwordEditCancel = () => {
    setPasswordEditForm(false);
  };

  /* 닉네임 수정 버튼 클릭 */
  const nickNameEdit = () => {
    setNicknameEditForm(true);
  };
  /* 닉네임 수정의 확인 버튼 */
  const nicknameEditOk = () => {
    // 비밀번호 수정 로직 추가
  };

  /* 닉네임 수정의 취소 버튼 */
  const nicknameEditCancel = () => {
    setNicknameEditForm(false);
  };

  /* 회원 탈퇴 버튼 */
  const deleteUserEvent = async (id: number) => {
    const shouldDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (!shouldDelete) {
      // 삭제 취소
      return;
    }
    const deleteUserResponse = await deleteUserApi(id);
    if (!deleteUserResponse) {
      alert("리턴값이 없습니다.");
      return;
    }
    alert("감사합니다." + deleteUserResponse);

    // 회원 탈퇴 후 필요한 동작 수행
    // 토큰만료, zustand 삭제, rederiction
    setCookies("accessToken", "", { expires: new Date() });
    setCookies("refreshToken", "", { expires: new Date() });
    setCookies("grantType", "", { expires: new Date() });
    removeUser();
    console.log("회원탈퇴 success");
    navigate("/api/home");
  };

  return (
    <div>
      <List className="profile">
        <List.Item
          className="profile-item"
          style={{ borderBottom: "3px solid black" }}
        >
          <h2>{myInfo && myInfo.email}님의 회원 정보</h2>
          <div>
            {myInfo && myInfo.email}님의 권한은 '{user.auth}' 입니다.
          </div>
        </List.Item>

        <List.Item className="profile-item">
          <div className="item-name">
            <Text strong>회원번호</Text>
          </div>
          <div className="item-content">{user.sub}</div>
          <div className="item-button"></div>
        </List.Item>

        <List.Item className="profile-item">
          <div className="item-name">
            <Text strong>Email</Text>
          </div>
          <div className="item-content">{myInfo && myInfo.email}</div>
          <div className="item-button"></div>
        </List.Item>

        <List.Item className="profile-item">
          <div className="item-name">
            <Text strong>Password</Text>
          </div>
          <div className="item-content">
            {myInfo && myInfo.password}
            {passwordEditForm && (
              <Form>
                <Form.Item label="현재 비밀번호">
                  <Input.Password
                    placeholder="현재 비밀번호를 입력하세요"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    allowClear
                  />
                </Form.Item>
                <Form.Item label="새로운 비밀번호">
                  <Input.Password
                    placeholder="새로운 비밀번호를 입력하세요"
                    onChange={(e) => setNewPassword(e.target.value)}
                    allowClear
                  />
                </Form.Item>
                <Form.Item label="새로운 비밀번호 확인">
                  <Input.Password
                    placeholder="새로운 비밀번호를 다시 입력하세요"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    allowClear
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    onClick={() => passwordEditOk()}
                    danger
                    htmlType="submit"
                  >
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
          </div>
          <div className="item-button">
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
          </div>
        </List.Item>

        <List.Item className="profile-item">
          <div className="item-name">
            <Text strong>Nickname</Text>
          </div>
          <div className="item-content">
            {myInfo && myInfo.nickname}
            {nicknameEditForm && (
              <Form>
                <List>
                  <List.Item>
                    이번달 수정 가능 횟수 4회(월 최대 4회까지만 변경
                    가능합니다).
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
          </div>
          <div className="item-button">
            {!nicknameEditForm && (
              <Button
                className="edit-button"
                type="ghost"
                icon={<EditOutlined />}
                onClick={() => nickNameEdit()}
              >
                닉네임 변경
              </Button>
            )}
          </div>
        </List.Item>
      </List>

      <Divider className="divider_top" />
      <div className=" withdrawal ">
        <Button
          className="edit-button"
          type="ghost"
          icon={<EditOutlined />}
          onClick={() => deleteUserEvent(user.sub)}
          danger
        >
          회원탈퇴
        </Button>
      </div>
    </div>
  );
}
