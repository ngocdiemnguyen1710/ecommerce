import React from "react";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <div className="container-fluid dashboard">
      <div class="row">
        <div class="col-md-3 dashboard-left">
          <UserMenu />
        </div>
        <div class="col-md-9 dashboard-right">
          <div className="w-75 dashboard-right-title mb-4">Profile</div>

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
  );
};

export default Dashboard;
