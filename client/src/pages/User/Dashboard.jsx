import React from "react";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <div className="container-fluid">
      <div class="row">
        <div class="col-md-3">
          <UserMenu />
        </div>
        <div class="col-md-9">
          <div className="card w-75 p-3">
            <h5>User Name: {auth.user.name}</h5>
            <h5>User Name: {auth.user.email}</h5>
            <h5>User Name: {auth.user.phone}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
