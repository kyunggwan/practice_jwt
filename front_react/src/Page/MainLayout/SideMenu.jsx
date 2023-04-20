import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useUserStore } from "../../Stores";
import { useEffect, useState } from "react";
import { boardApi } from "../../API/Index";
// import axios from "axios";
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
  const [cookies, setCookies] = useCookies();
  const { user, removeUser } = useUserStore();
  const [ boardResponse, setBoardResponse ] = useState("");

// 토큰을 갱신하면, 
  useEffect(() => {
    const token = cookies.token;
    // if (token) getBoard(token);
    // else setBoardResponse("");
  }, [cookies.token]);

//   const getBoard = async (token) => {
//     const requestOption = {
//       headers: {
//         Authorization: `Bearer  ${token}`,
//       },
//     };

//     await axios
//       .get("http://localhost:4000/api/board/", requestOption)
//       .then((response) => {
//         setBoardResponse(response.data);
//       })
//       .catch((error) => "");
//   };

  // 로그아웃 시, 토큰을 비우고, 유효시간 갱신해서 없애고, store를 초기화
  const SignOutHandler = () => {
    setCookies("token", "", { expires: new Date() });
    removeUser();
    console.log("로그아웃 success");
  };

  const getBoard = async (token) => {
    const data = {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    };

    const signUpResponse = await boardApi(data);
    if (!signUpResponse) {
      alert(" 리턴값이 없어서 실패했습니다.");
      return;
    }
    if (!signUpResponse.result) {
      alert("데이터 가져오기 실패했습니다.");
      return;
    }
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
              onClick: () => getBoard(),
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
            { label: "Profile", key: "/api/profile", icon: <UserOutlined /> },
            {
              label: "SignOut",
              key: "/api/signout",
              icon: <PoweroffOutlined />,
              onClick: () => SignOutHandler(),
            },
          ]}
        ></Menu>
      </div>
    </>
  );
}
