import React from "react";
import UserMenu from "../../components/Layout/UserMenu";

const Orders = () => {
  return (
    <div className="container-fluid">
      <div class="row">
        <div class="col-md-3">
          <UserMenu />
        </div>
        <div class="col-md-9">
          <div className="card w-75 p-3">All orders</div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
