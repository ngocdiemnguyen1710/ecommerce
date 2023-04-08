import React, { useEffect, useState } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import axiosClient from "../../config/axios";
import { Table, Tag } from "antd";
import moment from "moment";
import { getImageUrl } from "../../assets/page/utils/image";

const Orders = () => {
  const [orders, setOrders] = useState(null);
  const [auth] = useAuth();

  const columns = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, order) => <div>{order?.status}</div>,
    },
    {
      title: "Buyer",
      dataIndex: "buyer",
      key: "buyer",
      render: (_, order) => <div>{order?.buyer?.name}</div>,
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
      render: (_, order) => <div>{moment(order?.createdAt).fromNow()}</div>,
    },
    {
      title: "Payment",
      key: "payment",
      render: (_, order) => (
        <Tag color={order?.payment?.success ? "green" : "volcano"}>
          {order?.payment?.success ? "Succeed" : "Failed"}
        </Tag>
      ),
    },
    {
      title: "Quantity",
      key: "quantity",
      render: (_, order) => <div>{order?.products?.length}</div>,
    },
    {
      title: "Products",
      key: "products",
      render: (_, order) => (
        <>
          {order?.products?.map((prod) => {
            return (
              <div className="order-product" key={prod._id}>
                <img
                  src={getImageUrl(prod._id)}
                  className="order-product-img"
                />
                <div className="order-product-name text-uppercase">
                  {prod.name}
                </div>
              </div>
            );
          })}
        </>
      ),
    },
  ];

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  const getOrders = async () => {
    try {
      const { data } = await axiosClient.get("/api/v1/auth/orders");
      if (data) {
        setOrders(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container-fluid dashboard">
      <div className="row">
        <div className="col-md-3 dashboard-left">
          <UserMenu />
        </div>
        <div className="col-md-9 dashboard-right">
          <div className="w-75 dashboard-right-title mb-4">All orders</div>
          <Table
            columns={columns}
            dataSource={orders}
            pagination={false}
            rowKey={(record) => record._id}
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
