import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores";
import { useCookies } from "react-cookie";
import { BellFilled, MailOutlined, SmileOutlined } from "@ant-design/icons";
import { Badge, Space, Typography, Drawer, List, Dropdown, Switch, Menu } from "antd";
import mainlogo from "../../img/mainlogo.png";
import mainlogo_color from "../../img/mainlogo_color.png";
import './index.css';
import { getComments } from "../../api/Dummy/getDummyApi";
import getOrders from "../../api/Dummy/getDummyApi";
import type { MenuProps } from "antd";
import type { MenuTheme } from "antd";

interface HeaderProps {
  darkMode: boolean;
}

export default function Header(props: HeaderProps) {
  const { darkMode } = props;
  const { user, removeUser } = useUserStore();
  const [cookies, setCookies] = useCookies();
  const navigate = useNavigate();
  const [comments, setComments] = useState<String[]>([]);
  const [orders, setOrders] = useState<String[]>([]);
  const [commentsOpen, setCommentsOpen] = useState<boolean>(false);
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<MenuTheme>("dark");

  const SignOutHandler = () => {
    setCookies("accessToken", "", { expires: new Date() });
    setCookies("refreshToken", "", { expires: new Date() });
    setCookies("grantType", "", { expires: new Date() });
    removeUser();
    console.log("로그아웃 success");
    navigate("/api/home");
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "account",
      onClick: () => navigate("/api/profile"),
    },
    {
      key: "2",
      onClick: () => navigate("/api/admin"),
      label: "admin",
      disabled: user?.auth !== "ROLE_ADMIN",
    },
    {
      key: "3",
      label: "logout",
      onClick: () => SignOutHandler(),
    },
  ];

  useEffect(() => {
    getComments().then((res) => {
      setComments(res.comments);
    });
    getOrders().then((res) => {
      setOrders(res.products);
    });
  }, []);

  // 헤더 다크모드 설정
  useEffect(() => {
    setTheme(darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div>
      <Menu className="headerForm" theme={theme}>
        <img
          alt="main"
          src={darkMode ? mainlogo : mainlogo_color}
          style={{
            height: "80%",
            width: "auto",
            marginRight: "10px",
            margin: "2%",
          }}
        />
        <Typography.Title
          level={3}
          style={{
            color: darkMode ? "white" : "#19284a",
            flex: 1,
            textAlign: "center",
          }}
        >
          샘플 게시판
        </Typography.Title>

        <Space style={{ marginLeft: "auto", marginRight: "2%" }}>
          {user ? (
            <Badge>
              <Dropdown
                menu={{ items }}
                placement="bottom"
                arrow={{ pointAtCenter: true }}
              >
                <SmileOutlined
                  style={{
                    fontSize: 24,
                    color: darkMode ? "white" : "#19284a",
                  }}
                />
              </Dropdown>
            </Badge>
          ) : null}

          <Badge count={comments.length} dot>
            <MailOutlined
              style={{ fontSize: 24, color: darkMode ? "white" : "#19284a" }}
              onClick={() => {
                setCommentsOpen(true);
              }}
            />
          </Badge>
          <Badge count={orders.length}>
            <BellFilled
              style={{ fontSize: 24, color: darkMode ? "white" : "#19284a" }}
              onClick={() => {
                setNotificationsOpen(true);
              }}
            />
          </Badge>
        </Space>

        <Drawer
          title="Comments"
          open={commentsOpen}
          onClose={() => {
            setCommentsOpen(false);
          }}
          maskClosable
        >
          <List
            dataSource={comments}
            renderItem={(item: any) => <List.Item>{item.body}</List.Item>}
          ></List>
        </Drawer>
        <Drawer
          title="Notifications"
          open={notificationsOpen}
          onClose={() => {
            setNotificationsOpen(false);
          }}
          maskClosable
        >
          <List
            dataSource={orders}
            renderItem={(item: any) => (
              <List.Item>
                <Typography.Text strong>{item.title}</Typography.Text> has been
                ordered!
              </List.Item>
            )}
          ></List>
        </Drawer>
      </Menu>
    </div>
  );
}
