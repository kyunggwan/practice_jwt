import { useState, useEffect } from "react";
import { Menu, Typography } from "antd";
import "./index.css";
import type { MenuTheme } from "antd";
interface HeaderProps {
  darkMode: boolean;
}

export default function Footer(props: HeaderProps) {
  const { darkMode } = props;
  const [theme, setTheme] = useState<MenuTheme>("dark");

  // footer 다크모드 설정
 useEffect(() => {
   setTheme(darkMode ? "dark" : "light");
 }, [darkMode]);

  return (
    <Menu className="Footer" theme={theme}>
      <Typography.Link href="tel:+123456789">+12345678</Typography.Link>
      <Typography.Link href="http://www.google.com" target={"_blank"}>
        Privacy Policy
      </Typography.Link>
      <Typography.Link href="http://www.google.com">
        Terms Of Use
      </Typography.Link>
    </Menu>
  );
}
