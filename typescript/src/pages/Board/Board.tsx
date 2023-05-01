import React, {useState, useEffect} from 'react'
import 'tui-grid/dist/tui-grid.css';
import  Grid  from '@toast-ui/react-grid';
import './index.css';


import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { BoardListApi } from '../../api/BoardApi/BoardApi';
import { Link } from 'react-router-dom';

export default function Board() {
  const [boardList, setBoardList] = useState<Array<any>>([]);
  const [searchText, setSearchText] = useState<String>("");

  // 맨 처음 렌더링 될 때 한번 실행되어 게시판 글을 가져온다
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

  // 칼럼
  const columns = [
    { name: "id", header: "ID" },
    {
      name: "boardTitle",
      header: "제목",
      formatter: ({ value, row }) => (
        <Link to={`/api/boardView/${row.id}`}>{value}</Link>
      ),
    },
    { name: "boardWriter", header: "작성자" },
    { name: "boardCreateTime", header: "등록일시" },
  ];

  // 검색값을 serchText에 저장
  const onSearch = (value: String) => {
    setSearchText(value);
  };

  // 검색 부분의 필터에 searchText로 필터링함
  const filteredBoardList =
    boardList?.filter((board) =>
      board.boardTitle?.toLowerCase().includes(searchText?.toLowerCase())
    ) || [];


  return (
    <div>
      <div className="search-Form">
        <Input
          placeholder="검색어를 입력하세요"
          suffix={<SearchOutlined />}
          onChange={(e) => onSearch(e.target.value)}
          style={{ width: 300, marginBottom: 16 }}
        />

        <div className="write-button">
          <Link to="/api/boardWrite">
            <Button>작성</Button>
          </Link>
        </div>
      </div>

      <Grid
        data={filteredBoardList}
        columns={columns}
        rowHeight={35}
        width={500}
        heightResizable={true}
        
      />
    </div>
  );
}
