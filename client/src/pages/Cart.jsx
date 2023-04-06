import React, { useMemo } from "react";
import { Table } from "antd";
import { useCart } from "../context/cart";
import { getImageUrl } from "../assets/page/utils/image";
import { useAuth } from "../context/auth";
import { toast } from "react-hot-toast";
import { Controls } from "./controls/Controls";
import { AiFillEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();

  const navigate = useNavigate();

  const columns = [
    {
      title: "PRODUCT",
      dataIndex: "product",
      render: (_, item) => (
        <div key={item?._id}>
          <img src={getImageUrl(item._id)} className="card-img-top cart-img" />
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "name",
      render: (_, item) => (
        <>
          <div key={item?._id} className="text-uppercase cart-name mb-3">
            {item.name}
          </div>
          <div className="cart-sub-name">
            <b>Item#</b> {item?._id}
          </div>
          <button
            className="btn-action-cart"
            onClick={() => handleRemove(item._id)}
          >
            <BsTrash />
            Remove
          </button>
        </>
      ),
    },
    {
      title: "PRICE",
      dataIndex: "price",
      render: (_, item) => <div key={item?._id}>${item.price}</div>,
    },
  ];

  const handleRemove = (item) => {
    let temp = [...cart];
    let findIndex = temp.findIndex((i) => i._id === item);
    if (findIndex > -1) {
      temp.splice(findIndex, 1);
      setCart(temp);
      localStorage.setItem("cart", JSON.stringify(temp));
      toast.success("Remove item successfully!");
    }
  };

  const sumPrice = useMemo(() => {
    const result = cart.reduce((total, item) => {
      return total + item.price;
    }, 0);
    return result.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }, [cart]);

  return (
    <div className="homepage">
      <h4 className="cart-title text-uppercase">My Cart</h4>
      {cart.length < 1 && (
        <span className="text-center sub-title">No item in my cart</span>
      )}
      {cart.length >= 1 && (
        <span className="sub-title">
          Have {cart?.length} {cart.length > 1 ? "items" : "item"} in my cart
        </span>
      )}
      <div className="row mt-3">
        <div className="col-md-8">
          <Table columns={columns} dataSource={cart} pagination={false} />
        </div>
        <div className="col-md-4">
          <div className="cart-right">
            <div className="cart-right-title">Summary</div>
            <div className="cart-right-total">
              Total: <span>{sumPrice}</span>
            </div>
            {auth?.user?.address ? (
              <>
                <div className="cart-right-total">
                  Current address:{" "}
                  <div>
                    <span>{auth?.user?.address}</span>{" "}
                    <Controls.ButtonAction
                      icon={<AiFillEdit />}
                      className="btn-edit-address"
                      onClick={() => navigate("/dashboard/user/profile")}
                    />
                  </div>
                </div>
                <Controls.Button title={"Checkout"} />
              </>
            ) : (
              <>
                {auth?.token ? (
                  <>
                    <div className="cart-right-total">
                      Current address:{" "}
                      <div>
                        <Controls.ButtonAction
                          icon={<AiFillEdit />}
                          className="btn-edit-address"
                          onClick={() => navigate("/dashboard/user/profile")}
                        />
                      </div>
                    </div>
                    <Controls.Button title={"Checkout"} />
                  </>
                ) : (
                  <Controls.Button
                    title={"Please login to checkout"}
                    onClick={() => navigate("/login", { state: "/cart" })}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
