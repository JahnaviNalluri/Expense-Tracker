import "../styles/Register.css";

import {
  Link,
  useNavigate
} from "react-router-dom";

import { FaWallet }
from "react-icons/fa";

import {
  useState
} from "react";

import axios from "axios";



function Register() {

  const navigate =
  useNavigate();




  const [formData, setFormData] =
  useState({

    name: "",

    email: "",

    phoneno: "",

    password: ""

  });




  // handle input change
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });

  };




  // handle register
  const handleRegister =
  async (e) => {

    e.preventDefault();




    try {

      const response =
      await axios.post(

        "https://expense-tracker-4qjy.onrender.com/api/users",

        formData

      );




      alert(
        "Registration Successful"
      );




      // store user
      localStorage.setItem(

        "user",

        JSON.stringify(
          response.data.data
        )

      );




      navigate("/dashboard");

    }

    catch (error) {

      console.log(error);




      alert(

        error.response?.data?.message ||

        "Registration Failed"

      );

    }

  };




  return (

    <div className="register-page">

      <div className="register-container">




        {/* left side */}

        <div className="register-left">

          <div className="brand-logo">

            <FaWallet />

          </div>



          <h1>
            Create Account
          </h1>



          <p>

            Start tracking your income,
            expenses and savings
            with smart analytics.

          </p>

        </div>




        {/* right side */}

        <div className="register-right">

          <h2>
            Register
          </h2>




          <form onSubmit={handleRegister}>




            {/* name */}

            <div className="input-group">

              <label>
                Name
              </label>



              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>




            {/* email */}

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




            {/* phone */}

            <div className="input-group">

              <label>
                Phone Number
              </label>



              <input
                type="text"
                name="phoneno"
                placeholder="Enter phone number"
                value={formData.phoneno}
                onChange={handleChange}
                required
              />

            </div>




            {/* password */}

            <div className="input-group">

              <label>
                Password
              </label>



              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />

            </div>




            <button
              className="register-btn"
              type="submit"
            >

              Register

            </button>

          </form>




          <p className="bottom-text">

            Already have an account?

            <Link to="/">
              {" "}Login
            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}

export default Register;