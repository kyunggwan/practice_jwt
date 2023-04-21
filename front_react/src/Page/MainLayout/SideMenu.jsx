import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useUserStore } from "../../Stores";
import { Menu } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  DashboardOutlined,
  UnorderedListOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";

function SideMenu() {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies();
  const { user, removeUser } = useUserStore();

  // 로그아웃 시, 토큰을 비우고, 유효시간 갱신해서 없애고, store를 초기화
  const SignOutHandler = () => {
    setCookies("token", "", { expires: new Date() });
    removeUser();
    console.log(cookies);
    console.log("로그아웃 success");
  };

// Store에 저장된 값 콘솔에 찍어봄
  const ProfileInfoHandler = () => {
    console.log(user);
  };


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
              label: "Board",
              key: "/api/board",
              icon: <DashboardOutlined />,
            },
            {
              label: "UserList",
              key: "/api/userlist",
              icon: <UnorderedListOutlined />,
              children: [
                {
                  label: "Active Users",
                  key: "/activeUsers",
                },
                { label: "Disabled users", key: "/disabledUsers" },
              ],
            },
            {
              label: "Profile",
              key: "/api/profile",
              icon: <UserOutlined />,
              onClick: () => ProfileInfoHandler(),
            },
            {
              label: "SignOut",
              key: "/api/signout",
              icon: <PoweroffOutlined />,
              onClick: () => SignOutHandler(),
            },
          ]}
        ></Menu>
        <div>
          <div>SideMenu 출력 </div>
        </div>
      </div>
    </>
  );
}


export default SideMenu;