import "../styles/Login.css";

import { useState }
from "react";

import axios from "axios";

import {
  Link,
  useNavigate
} from "react-router-dom";

import { FaWallet }
from "react-icons/fa";



function Login() {

  const navigate =
  useNavigate();




  // form state
  const [formData, setFormData] =
  useState({

    email: "",

    password: ""

  });




  // handle input changes
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });

  };

  // handle login
const handleLogin = async (e) => {

  e.preventDefault();




  try {

    const response =
    await axios.post(

      "https://expense-tracker-4qjy.onrender.com/api/users/login",

      formData

    );




    // store user
    localStorage.setItem(

      "user",

      JSON.stringify(
        response.data.user
      )

    );




    // store token
    localStorage.setItem(

      "token",

      response.data.token

    );




    // role based navigation
    if (

      response.data.user.role === "admin"

    ) {

      navigate("/admin");

    }

    else {

      navigate("/dashboard");

    }

  }

  catch (error) {

    console.log(error);




    alert(

      error.response?.data?.message ||

      "Login Failed"

    );

  }

};



  return (

    <div className="login-page">

      <div className="login-container">




        {/* LEFT SECTION */}

        <div className="login-left">

          <div className="brand-logo">

            <FaWallet />

          </div>




          <h1>
            Expense Tracker
          </h1>




          <p>

            Track your spending,
            manage sessions,
            analyze your expenses
            and monitor your savings.

          </p>

        </div>




        {/* RIGHT SECTION */}

        <div className="login-right">

          <h2>
            Login
          </h2>




          <form onSubmit={handleLogin}>




            {/* EMAIL */}

            <div className="input-group">

              <label>
                Email
              </label>




              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>




            {/* PASSWORD */}

            <div className="input-group">

              <label>
                Password
              </label>




              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />

            </div>




            {/* BUTTON */}

            <button
              className="login-btn"
              type="submit"
            >

              Login

            </button>

          </form>




          {/* REGISTER LINK */}

          <p className="bottom-text">

            Don’t have an account?

            <Link to="/register">

              {" "}Register

            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}

export default Login;