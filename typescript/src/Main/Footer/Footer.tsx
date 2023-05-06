
import { Typography } from 'antd'
import React from 'react'
import './index.css';

export default function Footer() {
  return (
    <div className="Footer">
      {/* <div
            style={{
            height: 60,
            backgroundColor: "#B1A8B9",
            color: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            }}
        >
        Footer, 디자인 너무 어렵습니다
      </div> */}

      <Typography.Link href="tel:+123456789">+12345678</Typography.Link>
      <Typography.Link href="http://www.google.com" target={"_blank"}>
        Privacy Policy
      </Typography.Link>
      <Typography.Link href="http://www.google.com">
        Terms Of Use
      </Typography.Link>
    </div>
  );
}
