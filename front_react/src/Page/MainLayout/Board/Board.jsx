import React from 'react'
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from 'axios';

export default function Board() {
  const [boardResponse, setBoardResponse] = useState("");
  const [cookies] = useCookies();

    const getBoard = async (token) => {
      const requestOption = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios
        .get("http://localhost:4000/api/board/", requestOption)
        .then((response) => {
          setBoardResponse(response.data);
          console.log(requestOption);
        })
        .catch((error) => "");
    };

    useEffect(() => {
      const token = cookies.token;
      if (token) getBoard(token);
      else setBoardResponse("");
    }, [cookies.token]);
  return (
    <>
      <div>Board!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!에서 출력</div>
    {boardResponse}
    
    </>
  );
}
