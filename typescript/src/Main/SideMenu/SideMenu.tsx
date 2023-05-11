import { useState, useEffect} from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useUserStore } from '../../stores';
import { Menu, Switch } from "antd";
import './index.css';
import type { MenuTheme } from "antd";
import {
  HomeOutlined,
  DashboardOutlined,
  UnorderedListOutlined,
  PoweroffOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  AppstoreFilled,
} from "@ant-design/icons";


export default function SideMenu(props:{darkMode: boolean; setDarkMode: (darkMode: boolean) => void }) {
  const location = useLocation()
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState<string>('/');
  const [cookies, setCookies] = useCookies();
  const { user, removeUser } = useUserStore();
  const [theme, setTheme] = useState<MenuTheme>("dark");
  const { darkMode, setDarkMode } = props;

  useEffect(() => {
 const pathName = location.pathname
 setSelectedKeys(pathName)
  }, [location.pathname])
  
 
  // 로그아웃 시, 토큰을 비우고, 유효시간 갱신해서 없애고, store를 초기화
  const SignOutHandler = () => {
    setCookies("accessToken", "", { expires: new Date() });
    setCookies("refreshToken", "", { expires: new Date() });
    setCookies("grantType", "", { expires: new Date() });
    removeUser();
    console.log("로그아웃 success");
    navigate('/api/home')
  };

  /* 다크모드 설정,  */
  const changeTheme = (value: boolean) => {
    setTheme(value ? "dark" : "light");
    setDarkMode(value);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
          height: "100%",
        }}
      >
        <Menu
          className="sideMenuVertical"
          mode="inline"
          theme={theme}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          defaultSelectedKeys={[window.location.pathname]}
          selectedKeys={[selectedKeys]}
        >
          <Menu.Item key="/api/home" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="/api/board" icon={<DashboardOutlined />}>
            Board
          </Menu.Item>
          <Menu.Item key="/api/profile" icon={<UnorderedListOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item key="/api/shoppingBoard" icon={<AppstoreFilled />}>
            ShoppingBoard
          </Menu.Item>
          <Menu.Item key="/api/inventory" icon={<ShopOutlined />}>
            Inventory
          </Menu.Item>
          <Menu.Item key="/api/orders" icon={<ShoppingCartOutlined />}>
            Orders
          </Menu.Item>
          <Menu.Item
            key={user ? "/api/signout" : "/api/login"}
            icon={<PoweroffOutlined />}
            onClick={SignOutHandler}
          >
            {user ? "LogOut" : "LogIn"}
          </Menu.Item>
          <Switch
            checked={theme === "dark"}
            onChange={changeTheme}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
        </Menu>
      </div>
    </div>
  );
}
