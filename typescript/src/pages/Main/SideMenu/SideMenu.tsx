import React from 'react'
import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";

import { Menu } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  DashboardOutlined,
  UnorderedListOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";


export default function SideMenu() {
      const navigate = useNavigate();
//   const [cookies, setCookies] = useCookies();
//   const { user, removeUser } = useUserStore();

  // 로그아웃 시, 토큰을 비우고, 유효시간 갱신해서 없애고, store를 초기화
//   const SignOutHandler = () => {
//     setCookies("token", "", { expires: new Date() });
//     removeUser();
//     console.log(cookies);
//     console.log("로그아웃 success");
//   };

// Store에 저장된 값 콘솔에 찍어봄
//   const ProfileInfoHandler = () => {
//     console.log(user);
//   };

//   const UserListHandler = () => {
//     console.log(user);
//   };

const BoardHandler = () => {
  
}
  return (
    <div>

        <div style={{ display: "flex", flexDirection: "row" }}>
            <Menu
            onClick={({ key }) => {
                if (key === "signout") {
                } else {
                navigate(key);
                }
            }}
            defaultSelectedKeys={[window.location.pathname]}
            items={[
                { label: "Home", key: "/api/home", icon: <HomeOutlined /> },
                {
                label: "Board",
                key: "/api/board",
                icon: <DashboardOutlined />,
                onClick: () => BoardHandler(),
                },
           
                {
                label: "Profile",
                key: "/api/profile",
                icon: <UnorderedListOutlined />,
                //   onClick: () => ProfileInfoHandler(),
                },
                {
                label: "SignOut",
                key: "/api/signout",
                icon: <PoweroffOutlined />,
                //   onClick: () => SignOutHandler(),
                },
            ]}
            >

            </Menu>
        </div>

    </div>
  )
}
