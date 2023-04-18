import { useEffect, useState } from 'react'
import { useUserStore } from '../../Stores'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import View1 from '../View1/View1'
import Authentication from '../Authentication/Authentication'
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { LoginOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import './index.css'


export default function MainLayout() {
  const [boardResponse, setBoardResponse] = useState("");
  const [cookies] = useCookies();
  const { user } = useUserStore();

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
    <>
      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
          }}
        >
          <div
            style={{
              float: "left",
              width: 120,
              height: 31,
              margin: "16px 24px 16px 0",
              background: "rgba(255, 255, 255, 0.2)",
            }}
          />

          <div className="loginIcon">
            <UserOutlined style={{ color: "#e0e0e0", fontSize: "30px" }} />
            
            {user ? (
              <LogoutOutlined style={{ color: "#e0e0e0", fontSize: "30px" }} />
            ) : (
              <LoginOutlined style={{ color: "#e0e0e0", fontSize: "30px" }} />
            )}
          </div>

           <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={new Array(2).fill(null).map((_, index) => ({
              key: String(index + 1),
              label: `메뉴 ${index + 1}`,
            }))}
          ></Menu> 
        </Header>
        <Content
          className="site-layout"
          style={{
            padding: "0 50px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="loginform"
            style={{
              padding: 24,
              minHeight: 380,
              background: colorBgContainer,
            }}
          >
            {user ? <View1 /> : <Authentication />}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
}
