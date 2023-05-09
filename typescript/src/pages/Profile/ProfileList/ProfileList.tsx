import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { userListApi } from "../../../api/UserApi/UserApi";
import { userUpdateApi } from "../../../api/UserApi/UserApi";
interface User {
  id: number;
  email: string;
  password: string;
  authority: string;
}
export default function ProfileList() {
  const navigate = useNavigate();
  const [userList, setUserList] = useState<User[]>([]);
  const [cookies] = useCookies();
  const [requestUser, setRequestUser] = useState<User[]>();

  // useEffect(() => {
  //   const getUserList = async (token: String) => {
  //     const userListResponse = await userListApi();
  //     console.log(userListResponse);
  //     if (!userListResponse) {
  //       alert(" 리턴값이 없습니다.");
  //       return;
  //     } else {
  //       setUserList(userListResponse);
  //     }
  //   };

  //   const token = cookies.accessToken;
  //   if (token) getUserList(token);
  //   else setUserList([]);
  // }, [cookies.accessToken]);
  // const userListData = JSON.stringify(userList);

useEffect(() => {
  const token = cookies.accessToken;
  if (token) getUser(token);
  else setUserList([]);
}, [cookies.accessToken]);

const getUser = async (token:any) => {
  const requestOption = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  const userListResponse = await userListApi(requestOption);
  if (!userListResponse) {
    alert(" 리턴값이 없습니다.");
    return;
  } else {
    setUserList(userListResponse);
  }
};

// const columns = [
//   {
//     title: "Email",
//     dataIndex: "email",
//     key: "mail",
//   },
//   {
//     title: "권한",
//     dataIndex: "authority",
//     key: "authority",
//   },
  
// ];
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

  const handleSave = async () => {
    const token = cookies.accessToken;
    if (token) {
      const requestOption = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: [userList],
      };

      try {
        const response = await userUpdateApi(requestOption);
        console.log("userUpdateApi response :  " + response);
        alert("성공적으로 저장되었습니다.");
      } catch (error) {
        console.error(error);
        alert("요청이 실패했습니다.");
      }

    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        
        <h2>Profile Detail</h2>

        <div>
          {userList.map((user) => (
            <div key={user.id}>
              "{user.email}"님의 권한은 "{user.authority}"입니다."
            </div>
          ))} 
        </div>
        <Button type="primary" onClick={handleSave}>
          권한변경저장
        </Button>
      </div>
      <Table columns={columns} dataSource={userList} />
    </div>
  );
}
