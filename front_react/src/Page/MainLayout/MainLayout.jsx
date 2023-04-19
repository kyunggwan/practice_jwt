import { useEffect, useState } from "react";
import { useUserStore } from "../../Stores";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Layout, Menu, theme } from "antd";
import {
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
  HomeOutlined,
  DashboardOutlined,
  UnorderedListOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import "./index.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Column from "antd/es/table/Column";

function MainLayout() {
  const [boardResponse, setBoardResponse] = useState("");
  const [cookies, setCookies] = useCookies();
  const { user, removeUser } = useUserStore();



  const getBoard = async (token) => {
    const requestOption = {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    };

    await axios
      .get("http://localhost:4000/api/board/", requestOption)
      .then((response) => {
        setBoardResponse(response.data);
      })
      .catch((error) => "");
  };
  

  useEffect(() => {
    const token = cookies.token;
    if (token) getBoard(token);
    else setBoardResponse("");
  }, [cookies.token]);

  // ux부분
  const { Header, Content, Footer } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div style={{ flexDirection: Column, flex: 1, height: "2000vh" }}>
      <Header1 />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SideMenu />
        <Content1 />

      </div>
      <Footer1 />

      {/* <div className="loginIcon">
        <UserOutlined style={{ color: "#e0e0e0", fontSize: "30px" }} />

        {user ? (
          <LogoutOutlined style={{ color: "#e0e0e0", fontSize: "30px" }} />
        ) : (
          <LoginOutlined style={{ color: "#e0e0e0", fontSize: "30px" }} />
        )}
      </div> */}
    </div>
  );
}

function Header1() {
  return (
    <>
      <div
        style={{
          height: 60,
          backgroundColor: "lightskyblue",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight:"bold"
        }}
      >
        Header
      </div>
    </>
  );
}

function Footer1() {
  return (
    <>
      <div
        style={{
          height: 60,
          backgroundColor: "lightgrey",
          color: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
        }}
      >
        Footer
      </div>
    </>
  );
}

function SideMenu() {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies();
   const { user, removeUser } = useUserStore();
  // 로그아웃 시, 토큰을 비우고, 유효시간 갱신해서 없애고, store를 초기화
  const SignOutHandler = () => {
    setCookies('token', '', {expires: new Date()});
    removeUser();
  }

  return (
    <>
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
            { label: "Home", key: "/", icon: <HomeOutlined /> },
            {
              label: "DashBoard",
              key: "/dashboard",
              icon: <DashboardOutlined />,
            },
            {
              label: "UserList",
              key: "/userlist",
              icon: <UnorderedListOutlined />,
              children:[{
                label:"Active Users", key:"/activeUsers"},
                {label:"Disabled users", key:"/disabledUsers"
              }]
            },
            { label: "Profile", key: "/profile", icon: <UserOutlined /> },
            { label: "SignOut", key: "/signout", icon: <PoweroffOutlined onClick={() => SignOutHandler()} /> },
          ]}
        ></Menu>
      </div>
    </>
  );
}

function Content1() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/dashboard" element={<div>dashboard</div>} />
        <Route path="/userlist" element={<div>userlist</div>} />
        <Route path="/activeUsers" element={<div>activeUsers</div>} />
        <Route path="/disabledUsers" element={<div>disabledUsers</div>} />
        <Route path="/profile" element={<div>profile</div>} />
        <Route path="/signout" element={<div>signout</div>} />
      </Routes>
    </div>
  );
}

export default MainLayout;
