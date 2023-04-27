import React from 'react'
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { boardListApi } from '../../../API/Index';

export default function Board() {

  // const [boardResponse, setBoardResponse] = useState("");
  // const [cookies] = useCookies();

  // useEffect(() => {
  //   const token = cookies.token;
  //   if (token) getBoard(token);
  //   else setBoardResponse("");
  // }, [cookies.token]);

  // const getBoard = async (token) => {
  //   const requestOption = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };

  //   const boardResponse = await boardListApi(requestOption);
  //   if (!boardResponse) {
  //     alert(" 리턴값이 없습니다.");
  //     return;
  //   } else {
  //     setBoardResponse(boardResponse);
  //   }
  // };

  return (
    <>
      <div>Board!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!에서 출력</div>
    {/* {boardResponse} */}
    
    </>
  );
}
