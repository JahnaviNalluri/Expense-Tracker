import { useEffect, useState }
from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";

import "../styles/Expenses.css";



function Expenses() {

  const [expenses, setExpenses] =
    useState([]);

  const [sessions, setSessions] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [activeSession, setActiveSession] =
    useState(null);

  const [loading, setLoading] =
    useState(true);




  const [editId, setEditId] =
    useState(null);

  const [editData, setEditData] =
    useState({

      title: "",

      category: "",

      type: "",

      amount: "",

      description: ""

    });




  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const userId = user?._id;




  const [formData, setFormData] =
    useState({

      title: "",

      amount: "",

      type: "expense",

      category: "",

      description: "",

      user: userId,

      session: ""

    });




  // fetch active session
  const fetchActiveSession = async () => {

    try {

      const response =
        await axios.get(

          `http://localhost:5000/api/sessions/active/${userId}`

        );




      setActiveSession(
        response.data.data
      );




      setFormData((prev) => ({

        ...prev,

        session:
        response.data.data._id

      }));

    }

    catch (error) {

      console.log(error);

      setActiveSession(null);

    }

  };




  // fetch expenses
  const fetchExpenses = async () => {

    try {

      if (!activeSession) return;




      const response =
        await axios.get(

          `http://localhost:5000/api/expenses/session/${activeSession._id}`

        );




      setExpenses(
        response.data.data.expenses
      );

    }

    catch (error) {

      console.log(error);

    }

  };




  // fetch sessions
  const fetchSessions = async () => {

    try {

      const response =
        await axios.get(

          `http://localhost:5000/api/sessions/history/${userId}`

        );




      setSessions(
        response.data.data.sessions
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

          "http://localhost:5000/api/categories?page=1&limit=50"

        );




      setCategories(
        response.data.data.categories
      );

    }

    catch (error) {

      console.log(error);

    }

  };




  useEffect(() => {

    const loadData = async () => {

      await fetchActiveSession();

      await fetchSessions();

      await fetchCategories();

      setLoading(false);

    };




    loadData();

  }, []);




  useEffect(() => {

    if (activeSession) {

      fetchExpenses();

    }

  }, [activeSession]);




  // input change
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });

  };




  // create session
  const handleCreateSession = async () => {

    try {

      const title =
        prompt(
          "Enter Session Name"
        );




      if (!title) return;




      await axios.post(

        "http://localhost:5000/api/sessions",

        {

          user: userId,

          title

        }

      );




      alert(
        "Session Created Successfully"
      );




      fetchActiveSession();

      fetchSessions();

    }

    catch (error) {

      console.log(error);

      alert(
        "Failed To Create Session"
      );

    }

  };




  // add expense
  const handleSubmit = async (e) => {

    e.preventDefault();




    if (!activeSession) {

      alert(
        "Create Session First"
      );

      return;

    }




    try {

      await axios.post(

        "http://localhost:5000/api/expenses",

        formData

      );




      alert(
        "Expense Added Successfully"
      );




      setFormData({

        title: "",

        amount: "",

        type: "expense",

        category: "",

        description: "",

        user: userId,

        session:
        activeSession._id

      });




      fetchExpenses();

      fetchCategories();

    }

    catch (error) {

      console.log(error);

      alert(
        "Failed To Add Expense"
      );

    }

  };




  // update expense
  const handleUpdate = async (id) => {

    try {

      await axios.put(

        `http://localhost:5000/api/expenses/${id}`,

        editData

      );




      setEditId(null);

      fetchExpenses();

    }

    catch (error) {

      console.log(error);

      alert(
        "Update Failed"
      );

    }

  };




  // delete expense
  const handleDelete = async (id) => {

    try {

      await axios.delete(

        `http://localhost:5000/api/expenses/${id}`

      );




      fetchExpenses();

    }

    catch (error) {

      console.log(error);

      alert(
        "Delete Failed"
      );

    }

  };




  // refresh session
  const handleRefreshSession = async () => {

    try {

      const newSessionTitle =
        prompt(
          "Enter New Session Name"
        );




      if (!newSessionTitle) return;




      await axios.post(

        "http://localhost:5000/api/sessions/refresh",

        {

          userId,

          title: newSessionTitle

        }

      );




      alert(
        "New Session Started"
      );




      fetchSessions();

      fetchActiveSession();

    }

    catch (error) {

      console.log(error);

      alert(
        "Failed To Refresh Session"
      );

    }

  };




  if (loading) {

    return <h1>Loading...</h1>;

  }




  return (

    <div className="expenses-layout">

      <Sidebar />




      <div className="expenses-main">

        <div className="expenses-content">




          {/* NO SESSION */}

          {

            !activeSession && (

              <div className="no-session-box">

                <h2>
                  No Active Session Found
                </h2>

                <p>
                  Create a session to
                  start tracking expenses.
                </p>




                <button
                  className="create-session-btn"
                  onClick={
                    handleCreateSession
                  }
                >

                  Create Session

                </button>

              </div>

            )

          }




          {/* ACTIVE SESSION */}

          {

            activeSession && (

              <div className="expense-top-bar">

                <div>

                  <h2>
                    Current Session
                  </h2>

                  <p className="active-session-name">

                    {

                      activeSession.title

                    }

                  </p>

                </div>




                <button
                  className="refresh-session-btn"
                  onClick={
                    handleRefreshSession
                  }
                >

                  Refresh Session

                </button>

              </div>

            )

          }




          {/* FORM */}

          {

            activeSession && (

              <div className="expense-form-box">

                <h2>
                  Add Expense
                </h2>




                <form
                  className="expense-form"
                  onSubmit={handleSubmit}
                >

                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />




                  <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />




                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  >

                    <option value="expense">
                      Expense
                    </option>

                    <option value="income">
                      Income
                    </option>

                  </select>




                  <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  />




                  <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>




                  <button type="submit">

                    Add Expense

                  </button>

                </form>

              </div>

            )

          }




          {/* TABLE */}

          {

            activeSession && (

              <div className="expense-table-box">

                <h2>
                  Expense List
                </h2>




                <table>

                  <thead>

                    <tr>

                      <th>Title</th>

                      <th>Category</th>

                      <th>Type</th>

                      <th>Amount</th>

                      <th>Description</th>

                      <th>Actions</th>

                    </tr>

                  </thead>




                  <tbody>

                    {

                      expenses.map(
                        (expense) => (

                          <tr
                            key={expense._id}
                          >

                            <td>

                              {

                                editId === expense._id

                                ?

                                (

                                  <input
                                    type="text"
                                    value={editData.title}
                                    onChange={(e) =>

                                      setEditData({

                                        ...editData,

                                        title:
                                        e.target.value

                                      })

                                    }
                                  />

                                )

                                :

                                expense.title

                              }

                            </td>




                            <td>

                              {

                                editId === expense._id

                                ?

                                (

                                  <input
                                    type="text"
                                    value={editData.category}
                                    onChange={(e) =>

                                      setEditData({

                                        ...editData,

                                        category:
                                        e.target.value

                                      })

                                    }
                                  />

                                )

                                :

                                expense.category

                              }

                            </td>




                            <td>

                              {

                                editId === expense._id

                                ?

                                (

                                  <select
                                    value={editData.type}
                                    onChange={(e) =>

                                      setEditData({

                                        ...editData,

                                        type:
                                        e.target.value

                                      })

                                    }
                                  >

                                    <option value="expense">

                                      Expense

                                    </option>

                                    <option value="income">

                                      Income

                                    </option>

                                  </select>

                                )

                                :

                                expense.type

                              }

                            </td>




                            <td>

                              {

                                editId === expense._id

                                ?

                                (

                                  <input
                                    type="number"
                                    value={editData.amount}
                                    onChange={(e) =>

                                      setEditData({

                                        ...editData,

                                        amount:
                                        e.target.value

                                      })

                                    }
                                  />

                                )

                                :

                                `₹${expense.amount}`

                              }

                            </td>




                            <td>

                              {

                                editId === expense._id

                                ?

                                (

                                  <input
                                    type="text"
                                    value={editData.description}
                                    onChange={(e) =>

                                      setEditData({

                                        ...editData,

                                        description:
                                        e.target.value

                                      })

                                    }
                                  />

                                )

                                :

                                expense.description

                              }

                            </td>




                            <td className="action-buttons">

                              {

                                editId === expense._id

                                ?

                                (

                                  <button
                                    className="save-btn"
                                    onClick={() =>
                                      handleUpdate(
                                        expense._id
                                      )
                                    }
                                  >

                                    Save

                                  </button>

                                )

                                :

                                (

                                  <button
                                    className="edit-btn"
                                    onClick={() => {

                                      setEditId(
                                        expense._id
                                      );




                                      setEditData({

                                        title:
                                        expense.title,

                                        category:
                                        expense.category,

                                        type:
                                        expense.type,

                                        amount:
                                        expense.amount,

                                        description:
                                        expense.description

                                      });

                                    }}
                                  >

                                    Edit

                                  </button>

                                )

                              }




                              <button
                                className="delete-btn"
                                onClick={() =>
                                  handleDelete(
                                    expense._id
                                  )
                                }
                              >

                                Delete

                              </button>

                            </td>

                          </tr>

                        )
                      )

                    }

                  </tbody>

                </table>

              </div>

            )

          }

        </div>

      </div>

    </div>

  );

}

export default Expenses;