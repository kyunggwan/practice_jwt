import React, { useEffect, useState} from 'react'
import { BoardListApi } from '../../../api/BoardApi/BoardApi';
import { Button } from 'antd';
import './index.css';

export default function BoardDetail() {

    const [boardList, setBoardList] = useState<[]>();

    useEffect(() => {
      async function BoardList() {
        try {
          const boardListResponse = await BoardListApi();
          setBoardList(boardListResponse);
        } catch (error) {
          console.error("Error board list:", error);
        }
      }
      BoardList();
    }, []);
    console.log(boardList);

  return (
    <div className="board-detail">
      <div className="common-buttons">
        <Button>수정</Button>
        <Button>삭제</Button>
        <Button>목록</Button>
      </div>
      {boardList}

      <div className="board-contetn">

      </div>
    </div>
  );
}
