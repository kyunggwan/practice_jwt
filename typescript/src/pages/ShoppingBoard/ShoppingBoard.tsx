import React,{useState, useEffect} from 'react'
import './index.css';
import { Space, Card, Typography, Statistic, Table } from 'antd';
import { DollarCircleOutlined, ShoppingCartOutlined, UserOutlined, ShoppingOutlined } from '@ant-design/icons';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import getOrders from '../../api/Dummy/getDummyApi';
import { getRevenue } from '../../api/Dummy/getDummyApi';
import { getInventory } from "../../api/Dummy/getDummyApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
interface DashBoardCardProps {
    icon: any;
    title: string;
    value: number;
}

export default function ShoppingBoard() {
  const [orders, setOrders] = useState<number>(0);
  const [inventory, setInventory] = useState<number>(0);
  const [revenue, setRevenue] = useState<number>(0);

useEffect(()=>{
  getOrders().then((res) => {
    setOrders(res.total);
    setRevenue(res.discountedTotal);
  });
  getInventory().then((res) => {
    setInventory(res.total);
  });

},[])

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
          value={orders}
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
          value={inventory}
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
          value={100}
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
          value={revenue}
        />
      </Space>
      <Space>
        <RecentOrders />
        <ShoppingBoardChart />
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
    const [dataSource, setDataSource] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect (() => {
        setLoading(true);
        getOrders().then((res: any)=> {
            setDataSource(res.products.splice(0, 3));
            setLoading(false);
        });
    },[])

    return (
      <>
        <Typography.Text>Recent Orders</Typography.Text>
        <Table
          columns={[
            { title: "Title", dataIndex: "title", key: "title" },
            { title: "Quantity", dataIndex: "quantity", key: "quantity" },
            { title: "Price", dataIndex: "discountedPrice", key: "price" },
          ]}
          loading={loading}
          dataSource={dataSource.map((data: any) => ({
            ...data,
            key: data.id,
          }))}
          pagination={false}
        />
      </>
    );
}

function ShoppingBoardChart(){
  const [revenueData, setRevenueData] = useState<any>();

    useEffect(() => {
      getRevenue().then((res) => {
        const labels = res.carts.map((cart: any) => {
          return `User-${cart.userId}`;
        });
        const data = res.carts.map((cart: any) => {
          return cart.discountedTotal;
        });

        const dataSource: any = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: data,
        backgroundColor: "rgba(255, 0, 0, 1)",
      },
    ],
  };
   setRevenueData(dataSource);
      });
    }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Order Revenue",
      },
    },
  };

  if (!revenueData) {
    return null; // revenueData가 undefined일 때는 null을 반환하여 Bar 컴포넌트를 렌더링하지 않습니다.
  }

  return (
    <Card style={{width: 500, height: 250}}>
      <Bar options={options} data={revenueData} />
    </Card>
  );
}