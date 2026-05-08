import { useEffect, useState } from "react";

import axios from "axios";

import "../styles/Admin.css";

function Admin() {

  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

const [categories, setCategories] =
useState([]);


  // fetch all users
  const fetchUsers = async () => {

    try {

      const response =
      await axios.get(

        "http://localhost:5000/api/users"

      );




      setUsers(
        response.data.data.users
      );

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setLoading(false);

    }

  };

// fetch categories
const fetchCategories = async () => {

  try {

    const response =
    await axios.get(

      "http://localhost:5000/api/expenses"

    );




    const expenses =
    response.data.data.expenses;




    // unique categories
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

    fetchUsers();
    fetchCategories();

  }, []);




  // update role
  const updateRole = async (
    id,
    role
  ) => {

    try {

      await axios.put(

        `http://localhost:5000/api/users/id/${id}`,

        { role }

      );




      fetchUsers();

    }

    catch (error) {

      console.log(error);

      alert(
        "Failed to update role"
      );

    }

  };




  // delete user
  const deleteUser = async (id) => {

    try {

      await axios.delete(

        `http://localhost:5000/api/users/id/${id}`

      );




      fetchUsers();

    }

    catch (error) {

      console.log(error);

      alert(
        "Failed to delete user"
      );

    }

  };
   const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");




    window.location.href = "/";

  };




  return (

    <div className="admin-page">
        <button
          className="logout-btnn"
          onClick={handleLogout}
        >Logout</button>




      {/* ===== HEADER ===== */}

      <div className="admin-header">

        <h1>
          Expense Tracker Admin
        </h1>
        
        <p>
          Manage users, roles and categories
        </p>

      </div>
      




      {/* ===== STATS ===== */}

      <div className="admin-stats">




        {/* USERS */}

        <div className="admin-stat-card">

          <h2>
            Users
          </h2>

          <p>

  {

    users.filter(

      (user) =>

      user.role === "user"

    ).length

  }

</p>

        </div>




        {/* CATEGORIES */}

        <div className="admin-stat-card">

          <h2>
            Categories
          </h2>




          <div className="category-tags">

  {

    categories.length === 0

    ?

    (

      <span className="empty-category">

        No Categories

      </span>

    )

    :

    (

      categories.map(

        (category, index) => (

          <span
            className="category-tag"
            key={index}
          >

            {category}

          </span>

        )

      )

    )

  }

</div>

        </div>

      </div>




      {/* ===== USERS TABLE ===== */}

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

    </div>

  );

}

export default Admin;