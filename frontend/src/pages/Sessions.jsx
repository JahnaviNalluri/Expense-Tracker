import { useEffect, useState }
from "react";

import Sidebar from "../components/Sidebar";


import "../styles/Sessions.css";

import axios from "axios";



function Sessions() {

  const [sessions, setSessions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);




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

        `http://localhost:5000/api/sessions/full-history/${userId}`

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




          {/* title */}

          <div className="session-top">

            <h1>
              Expense Sessions
            </h1>

          </div>




          {

            loading ?

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
    




    <div className="spent-section">

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
                  : ₹{amount}
              </p>

            )

          )

        )

      }

    </div>



      <br></br>
    <p className="session-amount">

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