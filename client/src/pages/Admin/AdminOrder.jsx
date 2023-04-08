import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import axiosClient from "../../config/axios";
import { Table, Tag } from "antd";
import moment from "moment";
import { getImageUrl } from "../../assets/page/utils/image";
import { Select, Space } from "antd";

const statusOrders = [
  "Not Process",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancel",
];

const AdminOrder = () => {
  const [orders, setOrders] = useState();
  const [status, setStatus] = useState(statusOrders);
  const [auth] = useAuth();

  const handleChange = async (orderId, value) => {
    try {
      await axiosClient.put(`/api/v1/auth/status-orders/${orderId}`, {
        status: value,
      });
      getAllOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, order) => (
        <Select
          defaultValue={order?.status}
          bordered={false}
          onChange={(value) => handleChange(order._id, value)}
          key={order?._id}
        >
          {status &&
            status.map((item, i) => {
              return (
                <Select.Option key={i} value={item}>
                  {item}
                </Select.Option>
              );
            })}
        </Select>
      ),
    },
    {
      title: "Buyer",
      dataIndex: "buyer",
      key: "buyer",
      render: (_, order) => <div key={order?._id}>{order?.buyer?.name}</div>,
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
      render: (_, order) => (
        <div key={order?._id}>{moment(order?.createdAt).fromNow()}</div>
      ),
    },
    {
      title: "Payment",
      key: "payment",
      render: (_, order) => (
        <Tag
          color={order?.payment?.success ? "green" : "volcano"}
          key={order?._id}
        >
          {order?.payment?.success ? "Succeed" : "Failed"}
        </Tag>
      ),
    },
    {
      title: "Quantity",
      key: "quantity",
      render: (_, order) => (
        <div key={order?._id}>{order?.products?.length}</div>
      ),
    },
    {
      title: "Products",
      key: "products",
      render: (_, order) => (
        <>
          {order?.products?.map((prod, index) => {
            return (
              <div className="order-product" key={index}>
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
      getAllOrders();
    }
  }, [auth?.token]);

  const getAllOrders = async () => {
    try {
      const { data } = await axiosClient.get("/api/v1/auth/all-orders");
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
          <AdminMenu />
        </div>
        <div className="col-md-9 dashboard-right">
          <div className="w-75 dashboard-right-title mb-4">All Orders</div>
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

export default AdminOrder;
