import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { userListApi } from "../../api/UserApi/UserApi";
import { userUpdateApi } from "../../api/UserApi/UserApi";
import { useUserStore } from "../../stores";

interface User {
  id: number;
  email: string;
  password: string;
  authority: string;
}

export default function Admin() {
  const navigate = useNavigate();
  const [userList, setUserList] = useState<User[]>([]);
  const [cookies] = useCookies();
  const { user } = useUserStore();

  useEffect(() => {
    const token = cookies.accessToken;
    if (token) getUser(token);
    else setUserList([]);
  }, [cookies.accessToken]);

  /* 모든 회원 정보 보기 */
  const getUser = async (token: any) => {
    const requestOption = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const userListResponse = await userListApi(requestOption);
    if (!userListResponse) {
      alert(" 다시 로그인 해주세요.");
      return;
    } else {
      setUserList(userListResponse);
    }
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "mail",
    },
    {
      title: "현재 권한",
      dataIndex: "authority",
      key: "authority",
    },
    {
      title: "권한 변경",
      dataIndex: "authority",
      key: "authority",
      render: (text: string, record: User) => (
        <select
          value={record.authority}
          onChange={(e) => {
            // 기존 userList 배열에서 변경된 record를 찾아 권한 변경 후 setUserList 함수를 호출하여 userList 상태를 업데이트합니다.
            const updatedList = userList.map((user) =>
              user.id === record.id
                ? { ...user, authority: e.target.value }
                : user
            );
            setUserList(updatedList);
          }}
        >
          <option value="ROLE_USER">USER</option>
          <option value="ROLE_ADMIN">ADMIN</option>
        </select>
      ),
    },
  ];

  /* 유저 정보 변경 저장 */
  const handleSave = async () => {
    const token = cookies.accessToken;
    if (token) {
      const requestOption = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await userUpdateApi(userList, requestOption);
        alert("성공적으로 저장되었습니다.");
      } catch (error) {
        console.error(error);
        alert("요청이 실패했습니다.");
      }
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Admin Page</h2>
      </div>
      <Table className="adminTable" columns={columns} dataSource={userList} />

      <Button type="primary" onClick={handleSave}>
        권한변경저장
      </Button>
    </div>
  );
}
