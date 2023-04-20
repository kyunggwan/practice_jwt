import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import SideMenu from "./SideMenu";
import Header1 from "./Header1";
import Content1 from "./Content";
import Footer1 from "./Footer1";

import "./index.css";

import Column from "antd/es/table/Column";


function MainLayout() {
  const [boardResponse, setBoardResponse] = useState("");
  const [cookies] = useCookies();
  
  const getBoard = async (token) => {
    
    const requestOption = {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    };

    await axios
      .get("http://localhost:4000/api/board/", requestOption)
      .then((response) => {
        setBoardResponse(response.data);
      })
      .catch((error) => "");
  };
  
  useEffect(() => {
    const token = cookies.token;
    if (token) getBoard(token);
    else setBoardResponse("");
  }, [cookies.token]);


  return (
    <div style={{ flexDirection: Column, flex: 1, height: "2000vh" }}>
      <Header1 />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SideMenu />
        <Content1 />
      </div>
      <Footer1 />
      {boardResponse}
    </div>
  );
}

export default MainLayout;
