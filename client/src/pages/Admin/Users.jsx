import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";

const Users = () => {
  return (
    <div className="container-fluid dashboard">
      <div className="row">
        <div className="col-md-3 dashboard-left">
          <AdminMenu />
        </div>
        <div className="col-md-9 dashboard-right">
          <div className="w-75 dashboard-right-title mb-4">Users</div>
        </div>
      </div>
    </div>
  );
};

export default Users;
