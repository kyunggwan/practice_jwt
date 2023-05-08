import React, { useState,useEffect,  } from "react";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";

import { Button, Input, Form } from "antd";
import { BoardCreateApi } from "../../../api/BoardApi/BoardApi";
import { stat } from "fs";

interface IBoardContent {
  boardContent?: {
    boardContent: string;
    boardCreateTime: string;
    boardTitle: string;
    boardWriter: string;
    checked: boolean;
    id: number;
    rowKey: number;
    sortKey: number;
    uniqueKey: string;
    _attributes: {
      rowNum: number;
      checked: boolean;
      disabled: boolean;
      checkDisabled: boolean;
      className: Record<string, boolean>;
    };
    _disabledPriority: Record<string, number>;
    _relationListItemMap: Record<string, boolean>;
  };
}

type SortingType = "asc" | "desc" | undefined;

interface OptColumn {
  name: string;
  header: string;
  sortingType?: SortingType;
  sortable?: boolean;
}
export default function BoardContent(props: IBoardContent) {
  const { TextArea } = Input;
  const [boardTitle, setBoardTitle] = useState<string>("");
  const [boardWriter, setBoardwriter] = useState<string>("");
  const [boardContent, setBoardContent] = useState<string>("");
 const { state } = useLocation();

 useEffect(() => {
   console.log(state);
 }, []);

 // props로 지금 state를 받아서 왔따. useLocation 저게 받아왔는데 뭔지는 모르곘다
 // 검색해서 알아 볼 필요가 있음
 // 넘겨온 props로 id만 보내던가 index만 보내던지 해서
 // 여기서 백엔드로 정보 요청하는게 정보 수정 시에도 도움이 될 것 같다
 // 할일 1. 깔끔한 폼 만들기
 // 할일 2. 넘겨온 props로 다시 데이터 요청하기(2-1. 백엔드에서도 구현 필요)
 // 할일 3. 폼에 데이터 맞게 뿌리기
 // 할일 4. 수정, 삭제 등 버튼 만들기,
 // 할일 5. 수정, 삭제 시 백엔드에서 본인 ID로 쓴 글만 수정, 삭제 되게 하기
 // 할일 5. admin 권한은 삭제가 가능하게 백엔드에서 만들기

 // Grid 부분
 const pageOptions = {
   perPage: 5, // 한 페이지에 표시할 데이터 수
   page: 1, // 초기 페이지 번호
   totalCount: 100, // 총 데이터 수 (옵션)
   useClient: true, // 클라이언트 측 페이징 사용 여부 (기본값은 false로, 서버 측 페이징)
 };

  const columns: OptColumn[] = [
    { name: "boardTitle", header: "제목" },
    {
      name: "boardContent",
      header: "내용",
    },
    { name: "boardWriter", header: "작성자" },
    {
      name: "boardCreateTime",
      header: "등록일시",
    },
  ];


  return (
    <div>
      {" "}
      <Form>
        <Form.Item
          label="제목"
          name="title"
          rules={[{ required: true, message: "제목을 입력하세요!" }]}
        >
          <Input
            value={state.boardTitle}
            // placeholder="제목을 입력하세요."
            onChange={(e) => setBoardTitle(e.target.value)}
            readOnly
          />
          {state.boardContent.boardTitle}
        </Form.Item>

        <Form.Item
          label="작성자"
          name="writer"
          rules={[{ required: true, message: "작성자를 입력하세요!" }]}
        >
          <Input
            placeholder="작성자 입력하세요."
            onChange={(e) => setBoardwriter(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="내용"
          name="content"
          rules={[{ required: true, message: "내용을 입력하세요!" }]}
        >
          <TextArea
            placeholder="내용을 입력하세요."
            onChange={(e) => setBoardContent(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            // onClick={() => writeCompleteHandler()}
          >
            작성완료
          </Button>
          <Link to="/api/board">
            <Button style={{ marginLeft: 8 }} onClick={() => {}}>
              취소
            </Button>
          </Link>
        </Form.Item>
      </Form>
      {/* <Grid
        data={state.boardContent}
        columns={columns}
        rowHeight={35}
        width={500}
        heightResizable={true}
        pageOptions={pageOptions}
      /> */}
    </div>
  );
}
