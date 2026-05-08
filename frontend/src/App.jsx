import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";



// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

 import Admin from "./pages/Admin";

// Main Pages
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";



// Future Pages
import Sessions from "./pages/Sessions";





function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Auth Routes */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />



        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />



        {/* Expenses */}

        <Route
          path="/expenses"
          element={<Expenses />}
        />



        {/* Sessions */}

        <Route
          path="/sessions"
          element={<Sessions />}
        />

       

<Route path="/admin" element={<Admin />} />



      </Routes>

    </BrowserRouter>

  );

}

export default App;