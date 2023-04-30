import React from 'react'
import { BellFilled, MailOutlined } from "@ant-design/icons";
import { Badge, Space } from "antd";

export default function Header() {
  return (
    <div>     
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
          <div>여기는 헤더 부분</div>
        </Space>
      </div></div>
  )
}
