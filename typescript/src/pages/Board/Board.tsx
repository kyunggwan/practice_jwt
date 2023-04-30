import React from 'react'
import 'tui-grid/dist/tui-grid.css';
import Grid from '@toast-ui/react-grid';
export default function Board() {

const data = [
  {boardId: 1, boardTitle:'제목1', boardWriter: 'Editor', boardTime:'2023-04-30'},
  {boardId: 2, boardTitle:'제목2', boardWriter: 'Grid', boardTime:'2023-04-30'},
  {boardId: 3, boardTitle:'제목3', boardWriter: 'Chart', boardTime:'2023-04-30'}
];

const columns = [
  {name: 'boardId', header: 'ID'},
  {name: 'boardTitle', header: '제목'},
  {name: 'boardWriter', header: '작성자'},
  {name: 'boardTime', header: '등록일시'},
];


//     const columns = [
//     {
//       title: "BoardId",
//       dataIndex: "boardId",
//       key: "boardId",
//     },
//     {
//       title: "BoardTitle",
//       dataIndex: "boardTitle",
//       key: "boardTitle",
//     },
//     {
//       title: "BoardWriter",
//       dataIndex: "boardWriter",
//       key: "boardWriter",
//     },
//     {
//       title: "BoardCreateTime",
//       dataIndex: "boardCreateTime",
//       key: "boardCreateTime",
//     },

//   ];
    
  return (
    <div>

  <Grid
    data={data}
    columns={columns}
    rowHeight={10}
    bodyHeight={200}
    width={500}
    heightResizable={true}
    rowHeaders={['checkbox']}
  />

    </div>
  )
}
