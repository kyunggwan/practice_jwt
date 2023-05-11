import { useState, useEffect } from "react";
import { Menu, Typography } from "antd";
import "./index.css";
import type { MenuTheme } from "antd";

interface FooterProps {
  darkMode: boolean;
}

export default function Footer({ darkMode }: FooterProps) {
  const [theme, setTheme] = useState<MenuTheme>("dark");

  useEffect(() => {
    setTheme(darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <Menu className="Footer" theme={theme}>
      <Typography.Link href="tel:+123456789">+12345678</Typography.Link>
      <Typography.Link href="http://www.google.com" target="_blank">
        Privacy Policy
      </Typography.Link>
      <Typography.Link href="http://www.google.com">
        Terms Of Use
      </Typography.Link>
    </Menu>
  );
}
