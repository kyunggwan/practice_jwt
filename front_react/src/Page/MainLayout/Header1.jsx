import { BellFilled, MailOutlined } from "@ant-design/icons";
import { Badge, Space } from "antd";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { boardApi } from "../../API/Index";

export default function Header1() {

    const [boardResponse, setBoardResponse] = useState("");
    const [cookies] = useCookies();

    useEffect(() => {
      const token = cookies.token;
      if (token) getBoard(token);
      else setBoardResponse("");
    }, [cookies.token]);

    const getBoard = async (token) => {
      const requestOption = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const boardResponse = await boardApi(requestOption);
      if (!boardResponse) {
        alert(" 리턴값이 없습니다.");
        return;
      } else {
        setBoardResponse(boardResponse);
      }
    };
  return (
    <>
      <div
        style={{
          height: 60,
          backgroundColor: "#300A6D",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
        }}
      >
        Header
        <Space>
          <Badge count={20}>
            <MailOutlined style={{ fontSize: 24 }} />
          </Badge>
          <Badge count={10}>
            <BellFilled style={{ fontSize: 24 }} />
          </Badge>
          <div>{boardResponse}</div>
        </Space>
      </div>
    </>
  );
}
