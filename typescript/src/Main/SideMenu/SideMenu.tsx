import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useUserStore } from "../../stores";
import { Menu, Switch } from "antd";
import "./index.css";
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

export default function SideMenu(props: {
  darkMode: boolean; // 다크모드 상태
  setDarkMode: (darkMode: boolean) => void; // 다크모드 상태 설정 함수
}) {
  const location = useLocation(); // 현재 경로 정보
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState<string>("/"); // 선택된 메뉴 항목
  const [cookies, setCookies] = useCookies(); // 쿠키 사용
  const { user, removeUser } = useUserStore(); // 사용자 정보 및 관리
  const [theme, setTheme] = useState<MenuTheme>("dark"); // 메뉴 테마 상태
  const { setDarkMode } = props; // 다크모드 상태 및 설정 함수

  useEffect(() => {
    setSelectedKeys(location.pathname); // 현재 경로에 따라 선택된 메뉴 항목 설정
  }, [location.pathname]);

  /* 로그아웃 시, 토큰을 비우고, 유효시간 갱신해서 없애고, store를 초기화 */
  const SignOutHandler = () => {
    setCookies("accessToken", "", { expires: new Date() }); // 액세스 토큰 제거
    setCookies("refreshToken", "", { expires: new Date() }); // 리프레시 토큰 제거
    setCookies("grantType", "", { expires: new Date() }); // 권한 부여 유형 제거
    removeUser(); // 사용자 정보 초기화
    console.log("로그아웃 success");
    navigate("/api/home"); // 홈으로 이동
  };

  /* 다크모드 설정  */
  const changeTheme = (value: boolean) => {
    setTheme(value ? "dark" : "light"); // 테마 상태 변경
    setDarkMode(value); // 다크모드 상태 설정
  };

  /* sideMenu 설정 */
  const menuItems = [
    { key: "/api/home", icon: <HomeOutlined />, label: "Home" },
    { key: "/api/board", icon: <DashboardOutlined />, label: "Board" },
    {
      key: "/api/profile",
      icon: <UnorderedListOutlined />,
      label: "Profile",
    },
    {
      key: "/api/shoppingBoard",
      icon: <AppstoreFilled />,
      label: "ShoppingBoard",
    },
    { key: "/api/inventory", icon: <ShopOutlined />, label: "Inventory" },
    { key: "/api/orders", icon: <ShoppingCartOutlined />, label: "Orders" },
    {
      key: user ? "/api/signout" : "/api/login",
      icon: <PoweroffOutlined />,
      label: user ? "LogOut" : "LogIn",
      onClick: SignOutHandler,
    },
  ];

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
            if (key !== "signout") navigate(key);
          }}
          defaultSelectedKeys={[window.location.pathname]}
          selectedKeys={[selectedKeys]}
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick}>
              {item.label}
            </Menu.Item>
          ))}
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
