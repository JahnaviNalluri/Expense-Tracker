import { useEffect, useState }
from "react";

import axios from "axios";

import "../styles/Admin.css";



function Admin() {

  const [users, setUsers] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [activeSection, setActiveSection] =
    useState("overview");




  // fetch users
  const fetchUsers = async () => {

    try {

      const response =
      await axios.get(

        "https://expense-tracker-4qjy.onrender.com/api/users"

      );




      setUsers(
        response.data.data.users
      );

    }

    catch (error) {

      console.log(error);

    }

  };




  // fetch categories
  const fetchCategories = async () => {

    try {

      const response =
      await axios.get(

        "https://expense-tracker-4qjy.onrender.com/api/expenses"

      );




      const expenses =
      response.data.data.expenses;




      const uniqueCategories = [

        ...new Set(

          expenses.map(

            (expense) =>
            expense.category

          )

        )

      ];




      setCategories(
        uniqueCategories
      );

    }

    catch (error) {

      console.log(error);

    }

  };




  useEffect(() => {

    const loadData = async () => {

      await fetchUsers();

      await fetchCategories();

      setLoading(false);

    };




    loadData();

  }, []);




  // update role
  const updateRole = async (
    id,
    role
  ) => {

    try {

      await axios.put(

        `https://expense-tracker-4qjy.onrender.com/api/users/id/${id}`,

        { role }

      );




      fetchUsers();

    }

    catch (error) {

      console.log(error);

      alert(
        "Failed To Update Role"
      );

    }

  };




  // delete user
  const deleteUser = async (id) => {

    try {

      await axios.delete(

        `https://expense-tracker-4qjy.onrender.com/api/users/id/${id}`

      );




      fetchUsers();

    }

    catch (error) {

      console.log(error);

      alert(
        "Failed To Delete User"
      );

    }

  };




  // logout
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");




    window.location.href = "/";

  };




  return (

    <div className="admin-page">




      {/* ===== TOP ===== */}

      <div className="admin-top-bar">

        <div>

          <h1>
            Expense Tracker Admin
          </h1>

          <p style={{color:"black", fontSize:"25 px"}}>
            Manage users and categories
          </p>

        </div>




        <button
          className="logout-btnn"
          onClick={handleLogout}
        >

          Logout

        </button>

      </div>




      {/* ===== NAVIGATION ===== */}

      <div className="admin-nav">

        <button
          className={

            activeSection === "overview"

            ?

            "admin-nav-btn active-nav-btn"

            :

            "admin-nav-btn"

          }
          onClick={() =>
            setActiveSection("overview")
          }
        >

          Overview

        </button>




        <button
          className={

            activeSection === "users"

            ?

            "admin-nav-btn active-nav-btn"

            :

            "admin-nav-btn"

          }
          onClick={() =>
            setActiveSection("users")
          }
        >

          Users

        </button>




        <button
          className={

            activeSection === "categories"

            ?

            "admin-nav-btn active-nav-btn"

            :

            "admin-nav-btn"

          }
          onClick={() =>
            setActiveSection("categories")
          }
        >

          Categories

        </button>

      </div>




      {

        loading

        ?

        (

          <h2 className="loading-text">

            Loading...

          </h2>

        )

        :

        (

          <>




            {/* ===== OVERVIEW ===== */}

            {

              activeSection === "overview"

              &&

              (

                <div className="overview-box">




                  <h2>
                    Dashboard Overview
                  </h2>




                  <div className="overview-grid">




                    <div className="overview-card">

                      <h3>
                        Total Users
                      </h3>

                      <p>

                        {

                          users.filter(

                            (user) =>

                            user.role === "user"

                          ).length

                        }

                      </p>

                    </div>




                    <div className="overview-card">

                      <h3>
                        Total Admins
                      </h3>

                      <p>

                        {

                          users.filter(

                            (user) =>

                            user.role === "admin"

                          ).length

                        }

                      </p>

                    </div>




                    <div className="overview-card">

                      <h3>
                        Categories
                      </h3>

                      <p>
                        {categories.length}
                      </p>

                    </div>

                  </div>




                  <div className="overview-info">

                    <h3>
                      How To Use
                    </h3>




                    <ul>

                      <li>
                        Use the Users tab
                        to manage user roles.
                      </li>

                      <li>
                        Change role between
                        admin and user.
                      </li>

                      <li>
                        Delete inactive users
                        from the system.
                      </li>

                      <li>
                        Categories tab shows
                        all expense categories.
                      </li>

                      <li>
                        This panel helps
                        monitor the entire app.
                      </li>

                    </ul>

                  </div>

                </div>

              )

            }




            {/* ===== USERS ===== */}

            {

              activeSection === "users"

              &&

              (

                <div className="users-table-box">

                  <div className="table-top">

                    <h2>
                      Users
                    </h2>

                  </div>




                  <table>

                    <thead>

                      <tr>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Phone</th>

                        <th>Role</th>

                        <th>Actions</th>

                      </tr>

                    </thead>




                    <tbody>

                      {

                        users.map((user) => (

                          <tr key={user._id}>

                            <td>
                              {user.name}
                            </td>

                            <td>
                              {user.email}
                            </td>

                            <td>
                              {user.phoneno}
                            </td>




                            <td>

                              <select
                                className="role-select"
                                value={user.role}
                                onChange={(e) =>

                                  updateRole(
                                    user._id,
                                    e.target.value
                                  )

                                }
                              >

                                <option value="user">

                                  User

                                </option>

                                <option value="admin">

                                  Admin

                                </option>

                              </select>

                            </td>




                            <td>

                              <button
                                className="delete-btn"
                                onClick={() =>
                                  deleteUser(user._id)
                                }
                              >

                                Delete

                              </button>

                            </td>

                          </tr>

                        ))

                      }

                    </tbody>

                  </table>

                </div>

              )

            }




            {/* ===== CATEGORIES ===== */}

            {

              activeSection === "categories"

              &&

              (

                <div className="categories-box">

                  <div className="table-top">

                    <h2>
                      Categories
                    </h2>

                  </div>




                  <div className="categories-grid">

                    {

                      categories.map(

                        (category, index) => (

                          <div
                            className="category-card"
                            key={index}
                          >

                            <h3>

                              {category}

                            </h3>

                          </div>

                        )

                      )

                    }

                  </div>

                </div>

              )

            }

          </>

        )

      }

    </div>

  );

}

export default Admin;