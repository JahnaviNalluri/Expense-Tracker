import Sidebar from "../components/Sidebar";



import "../styles/Dashboard.css";



function Dashboard() {

  return (

    <div className="dashboard-layout">

      <Sidebar />




      <div className="dashboard-main">

        




        <div className="dashboard-content">




          {/* TOP HERO */}

          <div className="dashboard-hero">

            <div>

              <h1>
                Welcome To Expense Tracker
              </h1>




              <p>

                Manage your expenses,
                monitor your income,
                analyze spending patterns
                and track financial sessions
                easily in one place.

              </p>

            </div>

          </div>




          {/* APP FLOW */}

          <div className="dashboard-section">

            <h2>
              How The App Works
            </h2>




            <div className="steps-grid">




              <div className="step-card">

                <div className="step-number">
                  1
                </div>




                <h3>
                  Create Account
                </h3>




                <p>

                  Register and securely
                  create your expense
                  tracking account.

                </p>

              </div>




              <div className="step-card">

                <div className="step-number">
                  2
                </div>




                <h3>
                  Create Session
                </h3>




                <p>

                  Start a new expense
                  session like Travel,
                  Wedding, Semester,
                  Shopping or any custom
                  session.

                </p>

              </div>




              <div className="step-card">

                <div className="step-number">
                  3
                </div>




                <h3>
                  Add Expenses
                </h3>




                <p>

                  Add income and expense
                  entries with categories,
                  amount and description.

                </p>

              </div>




              <div className="step-card">

                <div className="step-number">
                  4
                </div>




                <h3>
                  Analyze Spending
                </h3>




                <p>

                  View income, expenses,
                  remaining balance and
                  spending analytics
                  dynamically.

                </p>

              </div>




              <div className="step-card">

                <div className="step-number">
                  5
                </div>




                <h3>
                  Refresh Session
                </h3>




                <p>

                  End current tracking
                  and start a new expense
                  session anytime while
                  preserving old history.

                </p>

              </div>




              <div className="step-card">

                <div className="step-number">
                  6
                </div>




                <h3>
                  Track History
                </h3>




                <p>

                  Access all previous
                  sessions along with
                  expenses, categories
                  and financial summaries.

                </p>

              </div>

            </div>

          </div>




          {/* FEATURES */}

          <div className="dashboard-section">

            <h2>
              Key Features
            </h2>




            <div className="feature-grid">




              <div className="feature-card">

                <h3>
                  Dynamic Categories
                </h3>




                <p>

                  Users can create
                  unlimited custom
                  categories while
                  adding expenses.

                </p>

              </div>




              <div className="feature-card">

                <h3>
                  Session-Based Tracking
                </h3>




                <p>

                  Expenses are grouped
                  into sessions for
                  better organization
                  and analytics.

                </p>

              </div>




              <div className="feature-card">

                <h3>
                  Real-Time Calculations
                </h3>




                <p>

                  Automatically calculates
                  total income, total
                  expense and remaining
                  balance.

                </p>

              </div>




              <div className="feature-card">

                <h3>
                  Expense History
                </h3>




                <p>

                  All previous sessions
                  remain stored for
                  future financial
                  analysis.

                </p>

              </div>

            </div>

          </div>




          {/* QUOTE */}

          <div className="dashboard-quote">

            <h2>

              "Track every rupee,
              understand your spending,
              and take control of your finances."

            </h2>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;