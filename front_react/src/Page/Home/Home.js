import "./index.css";
import { useUserStore } from "../../Stores";
import Authentication from "../Authentication/Authentication";
import MainLayout from "../MainLayout/MainLayout";
// import { useState, useEffect } from "react";
// import { useCookies } from "react-cookie";
import Column from "antd/es/table/Column";
import Footer1 from "../MainLayout/Footer1";
import Header1 from "../MainLayout/Header1";
// import axios from "axios";


const Home = () => {
  // const [boardResponse, setBoardResponse] = useState('');
  // const [cookies, setCookies] = useCookies();
  const { user } = useUserStore();


  // axios 함수에도 headers 부분에 Authorization 필드에 Bearer 토큰 값을 붙혀서 보냄
  // const getBoard = async(token) => {
  //   console.log(token);
  //   await axios.get("http://localhost:4000/api/board", {
  //   Headers: {
  //     Authorization : `Bearer ${token}`}
  //   }).then((response) => {
  //     setBoardResponse(response.data);
  //   }).catch((error) => '');
  // }


  // user가 바뀌면 토큰이 바뀌므로 그럴 때마다 랜더링
  // useEffect(() => {
  //   const token = cookies.token;
  //   if (token) {
  //     getBoard(token);
  //   } else {
  //     setBoardResponse('');
  //   }
  // }, [cookies.token]);
  
  return (
    <div>
        <div style={{ flexDirection: Column, flex: 1 }}>
            <Header1 />
          <div style={{ display: "flex", flexDirection: "row" }}>

            {user ? <MainLayout /> : <Authentication />}

          </div>
            <Footer1 />
          </div>
    </div>
  );
};
export default Home;
