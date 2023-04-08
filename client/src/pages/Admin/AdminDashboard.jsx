import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <div className="container-fluid dashboard">
      <div className="row">
        <div className="col-md-3 dashboard-left">
          <AdminMenu />
        </div>
        <div className="col-md-9 dashboard-right">
          <div className="card w-75 p-3">
            <div className="w-75 dashboard-right-title mb-4">Admin</div>
            <div>
              <b>Name:</b> {auth.user.name}
            </div>
            <div>
              <b>Email:</b> {auth.user.email}
            </div>
            <div>
              <b>Phone:</b> {auth.user.phone}
            </div>
            <div>
              <b>Address:</b> {auth.user.address}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
