import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useUserStore } from '../../../stores';
import { Menu, Switch } from "antd";
import type { MenuProps, MenuTheme } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  DashboardOutlined,
  UnorderedListOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";


export default function SideMenu() {
      const navigate = useNavigate();
  const [cookies, setCookies] = useCookies();
  const { user, removeUser } = useUserStore();

  const [theme, setTheme] = useState<MenuTheme>("dark");
 

  // 로그아웃 시, 토큰을 비우고, 유효시간 갱신해서 없애고, store를 초기화
  const SignOutHandler = () => {
    setCookies("accessToken", "", { expires: new Date() });
    setCookies("refreshToken", "", { expires: new Date() });
    setCookies("grantType", "", { expires: new Date() });
    removeUser();
    console.log(cookies);
    console.log("로그아웃 success");
    navigate('/api/home')
  };

    const changeTheme = (value: boolean) => {
      setTheme(value ? "dark" : "light");
    };


  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", flexGrow: 1 } }>
        <Menu mode='inline'
        
          theme={theme}
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
            },
            {
              label: "Profile",
              key: "/api/profile",
              icon: <UnorderedListOutlined />,
            },
            {
              label: "SignOut",
              key: "/api/signout",
              icon: <PoweroffOutlined />,
              onClick: () => SignOutHandler(),
            },
          ]}
        ></Menu>
      </div>
      <Switch
        checked={theme === "dark"}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
    </div>
  );
}
