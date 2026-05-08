import { useEffect, useState }
from "react";

import Sidebar
from "../components/Sidebar";

import "../styles/Sessions.css";

import axios
from "axios";



function Sessions() {

  const [sessions, setSessions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [sessionTitle, setSessionTitle] =
    useState("");




  // logged in user
  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const userId = user?._id;




  // fetch sessions
  const fetchSessions = async () => {

    try {

      const response =
      await axios.get(

        `https://expense-tracker-4qjy.onrender.com/api/sessions/full-history/${userId}`

      );




      setSessions(
        response.data.data.sessions
      );

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setLoading(false);

    }

  };




  // create session
  const handleCreateSession = async () => {

    try {

      if (!sessionTitle) {

        alert(
          "Enter Session Title"
        );

        return;

      }




      await axios.post(

        "https://expense-tracker-4qjy.onrender.com/api/sessions",

        {

          user: userId,

          title: sessionTitle

        }

      );




      alert(
        "Session Created Successfully"
      );




      setSessionTitle("");




      fetchSessions();

    }

    catch (error) {

      console.log(error);

      alert(
        "Failed To Create Session"
      );

    }

  };




  useEffect(() => {

    if (userId) {

      fetchSessions();

    }

  }, [userId]);




  return (

    <div className="sessions-layout">

      <Sidebar />




      <div className="sessions-main">

        <div className="sessions-content">




          {/* ===== TOP ===== */}

          <div className="session-top">

            <div>

              <h1>
                Expense Sessions
              </h1>

              <p className="session-subtitle">

                Manage and track all
                your expense sessions
              </p>

            </div>




            <div className="create-session-box">

              <input
                type="text"
                placeholder="Enter Session Title"
                value={sessionTitle}
                onChange={(e) =>
                  setSessionTitle(
                    e.target.value
                  )
                }
              />




              <button
                onClick={
                  handleCreateSession
                }
              >

                Create Session

              </button>

            </div>

          </div>




          {/* ===== LOADING ===== */}

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

              <div className="sessions-grid">




                {

                  sessions.map((session) => (

                    <div
                      className="session-card"
                      key={session._id}
                    >




                      <h2>

                        {session.title}

                      </h2>




                      <p className="session-status">

                        {

                          session.isActive

                          ?

                          "Active Session"

                          :

                          "Completed Session"

                        }

                      </p>




                      <p className="session-date">

                        Started :

                        {

                          new Date(

                            session.startedAt

                          ).toLocaleDateString()

                        }

                      </p>




                      {

                        session.endedAt && (

                          <p className="session-date">

                            Ended :

                            {

                              new Date(

                                session.endedAt

                              ).toLocaleDateString()

                            }

                          </p>

                        )

                      }




                      <p className="session-amount">

                        Income :
                        ₹{session.totalIncome}

                      </p>




                      {/* ===== SPENT ===== */}

                     

                        <h3>

                          Spent :
                          ₹{session.totalExpense}

                        </h3>




                        {

                          Object.keys(

                            session.categoryTotals || {}

                          ).length === 0

                          ?

                          (

                            <p className="no-expense-text">

                              No category expenses

                            </p>

                          )

                          :

                          (

                            Object.entries(

                              session.categoryTotals || {}

                            ).map(

                              ([category, amount]) => (

                                <p
                                  className="category-line"
                                  key={category}
                                >

                                  {category}

                                  

                                   :  ₹{amount}

                                  

                                </p>

                              )

                            )

                          )

                        }

                      




                      <p className="session-amount remaining-text">

                        Remaining :
                        ₹{session.remainingAmount}

                      </p>

                    </div>

                  ))

                }

              </div>

            )

          }

        </div>

      </div>

    </div>

  );

}

export default Sessions;