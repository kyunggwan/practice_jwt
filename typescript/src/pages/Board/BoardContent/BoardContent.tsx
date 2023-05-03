import React, { useState,useEffect,  } from "react";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";
import "tui-grid/dist/tui-grid.css";

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
export default function BoardContent(props: IBoardContent) {
  const { TextArea } = Input;
  const [boardTitle, setBoardTitle] = useState<string>("");
  const [boardWriter, setBoardwriter] = useState<string>("");
  const [boardContent, setBoardContent] = useState<string>("");
 const { state } = useLocation();

 useEffect(() => {
   console.log(state);
 }, []);
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
    </div>
  );
}
