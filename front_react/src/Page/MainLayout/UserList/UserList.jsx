import React,{useState, useEffect} from 'react'
import { useCookies } from "react-cookie";
import { userListApi } from '../../../API/Index';
import { Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';


export default function UserList() {
 const navigate = useNavigate();
  const [userList, setUserList] = useState();
  const [cookies] = useCookies();

  useEffect(() => {
    const token = cookies.token;
    if (token) getUser(token);
    else setUserList("");
  }, [cookies.token]);

  const getUser = async (token) => {
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

  const userListData = JSON.stringify(userList);

  const columns = [
    {
      title: "UserEmail",
      dataIndex: "userEmail",
      key: "userEmail",
    },
    {
      title: "UserNickname",
      dataIndex: "userNickname",
      key: "userNickname",
    },
    {
      title: "UserAddress",
      dataIndex: "userAddress",
      key: "userAddress",
    },
    {
      title: "UserPhoneNumber",
      dataIndex: "userPhoneNumber",
      key: "userPhoneNumber",
    },
  ];

  const userPatchHandler = () => {
    navigate('/api/userpatch')
  }



  return (
    <>
      <div>UserList</div>

      <Table columns={columns} dataSource={userList} />

      <Button onClick={() => userPatchHandler()}> 수정하기 </Button>
    </>
  );
}
