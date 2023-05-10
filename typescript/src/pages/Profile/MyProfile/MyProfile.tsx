import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useUserStore } from "../../../stores";
import { Table } from "antd";
import { myInfoApi } from "../../../api/UserApi/UserApi";
import { Button, Checkbox, Form, Input, Typography } from "antd";
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

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "mail",
    },
    {
      title: "닉네임",
      dataIndex: "nickname",
      key: "nickname",
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>{myInfo && myInfo.email}'s Profile</h2>
      </div>
      <Text>
        {myInfo && myInfo.email}님의 권한은 '{user.auth}' 입니다.
      </Text>
      <Table columns={columns} dataSource={myInfo ? [myInfo] : []} />
      <Button>회원 정보 수정</Button>
      <Text strong >
        회원탈퇴
      </Text>
    </div>
  );
}
