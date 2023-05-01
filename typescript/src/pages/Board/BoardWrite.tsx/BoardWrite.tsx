import React, {useState} from 'react'
import { Link } from 'react-router-dom';

import "tui-grid/dist/tui-grid.css";

import { Button, Input, Form } from "antd";
import { BoardCreateApi } from '../../../api/BoardApi/BoardApi';


export default function BoardWrite() {
    const { TextArea } = Input;
    const [boardTitle, setBoardTitle] = useState<String>();
    const [boardWriter, setBoardwriter] = useState<String>();
    const [boardContent, setBoardContent] = useState<String>();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };



    const writeCompleteHandler = async () => {
        const data = {
        boardTitle: boardTitle,
        boardContent: boardContent,
        boardWriter: boardWriter,
        };

        const boardCreateResponse = await BoardCreateApi(data);
        if (!boardCreateResponse) {
        alert("글작성에 실패했습니다.");
        return;
        }
        if (!boardCreateResponse.result) {
        alert("글작성에 실패했습니다.");
        return;
        }
        alert("글작성에 성공했습니다.");
    };



    return (
      <div>
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            label="제목"
            name="title"
            rules={[{ required: true, message: "제목을 입력하세요!" }]}
          >
            <Input
              placeholder="제목을 입력하세요."
              onChange={(e) => setBoardTitle(e.target.value)}
            />
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
              onClick={() => writeCompleteHandler()}
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