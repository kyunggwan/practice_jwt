import { useState, useEffect } from "react";
import { Typography, Table, Space, Avatar, Rate } from "antd";
import "./index.css";
import getOrders from "../../api/Dummy/getDummyApi";


export default function Orders() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res: any) => {
      setDataSource(res.products);
      setLoading(false);
    });
  }, []);
  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Orders</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "Title",
            dataIndex: "title",
            key: "title",
          },
          {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (value) => <span>${value}</span>,
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
          },
          {
            title: "DiscountedPrice",
            dataIndex: "discountedPrice",
            key: "discountedPrice",
            render: (value) => <span>${value}</span>,
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
