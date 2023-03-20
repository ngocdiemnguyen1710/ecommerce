import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const interval = setInterval(() => {
      if (count > 0) {
        setCount((prev) => --prev);
      }
    }, 1000);
    count === 0 &&
      navigate("/login", {
        state: location.pathname,
      });
    return () => {
      clearInterval(interval);
    };
  }, [count, location]);
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="spinner-border mb-3" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <h5>Redirecting to you {count} second</h5>
    </div>
  );
};

export default Spinner;
