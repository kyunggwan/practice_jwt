import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { BoardListApi } from "../../api/BoardApi/BoardApi";
import "./index.css";

import 'tui-grid/dist/tui-grid.css';
import Grid from "@toast-ui/react-grid";


import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

type SortingType = "asc" | "desc" | undefined;


interface OptColumn {
  name: string;
  header: string;
  sortingType?: SortingType;
  sortable?: boolean;
}

export default function Board() {
  const navigate = useNavigate();
  // useState
  const [boardList, setBoardList] = useState<Array<any>>([]);
  const [searchText, setSearchText] = useState<String>("");
  const [selectedRows, setSelectedRows] = useState<Array<any>>([]);

  // 데이터 부분
  // 맨 처음 렌더링 될 때 한번 실행되어 게시판 글을 가져온다
  useEffect(() => {
    async function BoardList() {
      try {
        const boardListResponse = await BoardListApi();
        // boardList의 각 항목에 checked 속성 추가
        setBoardList(
          boardListResponse.map((board: any) => ({
            ...board,
            checked: false,
          }))
        );
      } catch (error) {
        console.error("Error board list:", error);
      }
    }
    BoardList();
  }, []);

  // console.log(boardList);
  // 칼럼
  const columns: OptColumn[] = [
    { name: "id", header: "ID" },
    {
      name: "boardTitle",
      header: "제목",
    },
    { name: "boardWriter", header: "작성자" },
    {
      name: "boardCreateTime",
      header: "등록일시",
    },
  ];

  // 검색 부분
  // 검색값을 serchText에 저장
  const onSearch = (value: String) => {
    setSearchText(value);
  };

  // 검색 부분의 필터에 searchText로 필터링함
  // const filteredBoardList =
  //   boardList?.filter((board) =>
  //     board.boardTitle?.toLowerCase().includes(searchText?.toLowerCase())
  //   ) || [];


// Grid 세부 설정
// 페이징
const pageOptions = {
  perPage: 5, // 한 페이지에 표시할 데이터 수
  page: 1, // 초기 페이지 번호
  // totalCount: 100, // 총 데이터 수 (옵션)
  useClient: true, // 클라이언트 측 페이징 사용 여부 (기본값은 false로, 서버 측 페이징)
};

// 값 가져오기
  // useEffect(() => {
  //   console.log(selectedRows);
  // }, [selectedRows]);

  // const onCheck = (ev: any) => {
  //   const { checked, rowKey } = ev;
  //   const rowIndex = boardList.findIndex((board) => board.id === rowKey);
  //   const updatedRow = { ...boardList[rowIndex], checked };

  //   const updatedSelectedRows = checked
  //     ? [...selectedRows, updatedRow]
  //     : selectedRows.filter((row) => row.id !== rowKey);

  //   setSelectedRows(updatedSelectedRows);
  // };

const handleClick = (e: any) => {
  const boardContent = boardList[e.rowKey];
  console.log(boardContent);
  
  navigate('/api/boardContent', { state: { boardContent } });
};

  return (
    <div>
      <div className="board-Form">
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
          data={boardList}
          columns={columns}
          rowHeight={35}
          width={500}
          heightResizable={true}
          onClick={handleClick}
          pageOptions={pageOptions}
        />
      
      </div>
    </div>
  );
  }
