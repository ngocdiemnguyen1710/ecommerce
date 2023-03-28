import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <div className="container-fluid dashboard">
      <div class="row">
        <div class="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <div className="card w-75 p-3">
            <h5>Admin Name: {auth.user.name}</h5>
            <h5>Admin Name: {auth.user.email}</h5>
            <h5>Admin Name: {auth.user.phone}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
