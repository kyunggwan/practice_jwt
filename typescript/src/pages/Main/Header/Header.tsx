import React from "react";
import { BellFilled, MailOutlined } from "@ant-design/icons";
import { Badge, Space } from "antd";
import mainlogo from "../../../img/mainlogo.png";

export default function Header() {
  return (
    <div>
      <div
        style={{
          height: 60,
          backgroundColor: "#300A6D",
          color: "white",
          display: "flex",
          alignItems: "center",
          fontWeight: "bold",
        }}
      >
        <img
          alt="main"
          src={mainlogo}
          style={{ height: "80%", width: "auto", marginRight: "10px", margin: "2%" }}
        />
        <div style={{ flex: 1, textAlign: "center" }}>게시판</div>
        <Space style={{ marginLeft: "auto", marginRight:"2%" }}>
          <Badge count={20}>
            <MailOutlined style={{ fontSize: 24, color: "white" }} />
          </Badge>
          <Badge count={10}>
            <BellFilled style={{ fontSize: 24, color: "white" }} />
          </Badge>
        </Space>
      </div>
    </div>
  );
}
