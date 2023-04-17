import "./index.css";
import { Link } from "react-router-dom";
import { useUserStore } from "../../Stores";

import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Button,
  Checkbox,
  Form,
  Input,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import SignIn from "../Authentication/SignIn/SignIn";
import Authentication from "../Authentication/Authentication";


const { Header, Content, Footer } = Layout;
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Home = () => {

  const { user } = useUserStore();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={new Array(15).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })}
        />
      </Header>

      <Content
        className="content"
        style={{
          padding: "0 50px",
        }}
      >
        {/* <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
          items={[
            { key: "home", content: "Home", link: "/" },
            // { key: "list", content: "List", link: "/list" },
            // { key: "app", content: "App" },
          ]}
        />

        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          {user ? <Home /> : <Authentication />}
          <Authentication />
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
  );
};
export default Home;
