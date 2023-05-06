import React,{useState, useEffect} from 'react'
import './index.css';
import { Space, Card, Typography, Statistic, Table } from 'antd';
import { DollarCircleOutlined, ShoppingCartOutlined, UserOutlined, ShoppingOutlined } from '@ant-design/icons';
import getOrders from '../../api/Dummy/getOrders';

interface DashBoardCardProps {
    icon: any;
    title: string;
    value: number;
}

export default function ShoppingBoard() {
  return (
    <Space size={20} direction={"vertical"}>
      <Typography.Title level={4}>ShoppingBoard</Typography.Title>
      <Space direction="horizontal">
        <DashBoardCard
          icon={
            <ShoppingCartOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0, 255, 0, 0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Orders"}
          value={1234}
        />
        <DashBoardCard
          icon={
            <ShoppingOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(0, 0, 255, 0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Inventory"}
          value={1234}
        />
        <DashBoardCard
          icon={
            <UserOutlined
              style={{
                color: "purple",
                backgroundColor: "rgba(0, 255, 255, 0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Customer"}
          value={1234}
        />
        <DashBoardCard
          icon={
            <DollarCircleOutlined
              style={{
                color: "red",
                backgroundColor: "rgba(255, 0, 0, 0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Revenue"}
          value={1234}
        />
      </Space>
      <Space>
        <RecentOrders />
      </Space>
    </Space>
  );
}

function DashBoardCard({ icon, title, value }: DashBoardCardProps) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

function RecentOrders () {
    const [dataSource, setDataSource] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect (() => {
        setLoading(true);
        getOrders().then((res)=> {
            setDataSource(res.carts[0].products.splice(0, 3));
            console.log(dataSource);
            setLoading(false);
        });
    },[])
    return (
      <>
      <Typography.Text>Recent Orders</Typography.Text>
        <Table
          columns={[
            { title: "Title", dataIndex: "title" },
            { title: "Quantity", dataIndex: "quantity" },
            { title: "Price", dataIndex: "discountedPrice" },
          ]}
          loading={loading}
          dataSource={dataSource}
          pagination={false}
        />
      </>
    );
}