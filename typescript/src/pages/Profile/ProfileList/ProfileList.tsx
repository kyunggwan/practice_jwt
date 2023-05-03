import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { userListApi } from "../../../api/UserApi/UserApi";

export default function ProfileList() {

  const navigate = useNavigate();
  const [userList, setUserList] = useState<String[]>([]);
  const [cookies] = useCookies();


  useEffect(() => {
    const getUserList = async (token: String) => {
      const userListResponse = await userListApi();
      if (!userListResponse) {
        alert(" 리턴값이 없습니다.");
        return;
      } else {
        setUserList(userListResponse);
      }
    };

    const token = cookies.accessToken;
    if (token) getUserList(token);
    else setUserList([]);
  }, [cookies.accessToken]);

    const userListData = { userList };


  // const userListData = JSON.stringify(userList);


  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
   

  ];


  return (
    <div>
      ProfileDetail
      <Table columns={columns} dataSource={userList} />
      {userList}
    </div>
  );
}
