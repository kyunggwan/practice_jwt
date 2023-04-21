import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import SideMenu from "./SideMenu";
import Content1 from "./Content";
import "./index.css";
import { boardApi } from "../../API/Index";

function MainLayout() {
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
      <div className="mainForm">
        <SideMenu />
        <Content1 />
        <br />
        MainLayout 출력 : {boardResponse}
      </div>
    </>
  );
}

export default MainLayout;
