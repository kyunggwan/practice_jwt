import { useState, useEffect } from "react";
import { Typography, Table, Space, Avatar, Rate } from "antd";
import "./index.css";
import { getInventory } from "../../api/Dummy/getDummyApi";

export default function Inventory() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getInventory().then(res => {
      setDataSource(res.products)
      setLoading(false);
    })
  },[])
  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Inventory</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "Thumbnail",
            dataIndex: "thumbnail",
            render: (link) => {
              return <Avatar src={link} />;
            },
          },
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Price",
            dataIndex: "price",
            render: (value) => <span>${value}</span>,
          },
          {
            title: "Rating",
            dataIndex: "rating",
            render: (rating: any) => {
              return <Rate value={rating} allowHalf disabled />;
            },
          },
          {
            title: "Stock",
            dataIndex: "stock",
          },

          {
            title: "Brand",
            dataIndex: "brand",
          },
          {
            title: "Stock",
            dataIndex: "stock",
          },
        ]}
        dataSource={dataSource.map((data: any) => ({
          ...data,
          key: data.id,
        }))}
        pagination={{
          pageSize: 5, // 한페이지에 몇개 출력인지
        }}
      />
    </Space>
  );
}
