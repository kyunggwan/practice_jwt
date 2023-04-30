import React from 'react'

export default function Profile() {

    const columns = [
    {
      title: "UserId",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "UserNickname",
      dataIndex: "userNickname",
      key: "userNickname",
    },
    {
      title: "UserPhoneNumber",
      dataIndex: "userPhoneNumber",
      key: "userPhoneNumber",
    },
    {
      title: "UserRole",
      dataIndex: "userRole",
      key: "userRole",
    },
      {
      title: "UserRoleChange",
      dataIndex: "userRoleChange",
      key: "userRoleChange",
    },
  ];
  return (
    <div>profile

        접속 계정의 프로필을 보여준다
회원 정보를 보고, 수정할 수 있다.


    </div>

  )
}
