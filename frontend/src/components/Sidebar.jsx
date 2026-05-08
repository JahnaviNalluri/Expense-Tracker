import "../styles/Sidebar.css";

import { Link }
from "react-router-dom";

import {

  FaChartPie,

  FaMoneyBillWave,

  FaLayerGroup,

  FaSignOutAlt

} from "react-icons/fa";



function Sidebar() {

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");




    window.location.href = "/";

  };




  return (

    <div className="sidebar">




      <div className="sidebar-top">

        <h2>
          ExpenseTracker
        </h2>

      </div>




      <div className="sidebar-menu">




        <Link
          to="/dashboard"
          className="menu-item"
        >

          <FaChartPie />

          Dashboard

        </Link>




        <Link
          to="/expenses"
          className="menu-item"
        >

          <FaMoneyBillWave />

          Expenses

        </Link>




        <Link
          to="/sessions"
          className="menu-item"
        >

          <FaLayerGroup />

          Sessions

        </Link>

      </div>




      <div className="sidebar-bottom">

        <button
          className="logout-btn"
          onClick={handleLogout}
        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </div>

  );

}

export default Sidebar;