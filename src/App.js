import "./App.css";
import ReportsPage from "./components/pages/Reports/Reports";
import Menu from "./components/object/Menu/Menu.js";
import Home from "./components/pages/Home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PatientsPage from "./components/pages/Patients/Patients";
import CreateReportPage from "./components/pages/CreateReport/CreateReport.js";
import ReportDetailPage from "./components/pages/ReportDetail/ReportDetail.js";
import PatientDetailPage from "./components/pages/PatientDetail/PatientDetail.js";
import EditReportPage from "./components/pages/EditReport/EditReport.js";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";

const RequireAuth = ({ children }) => {
  const userIsLogged = localStorage.getItem("id");
  if(localStorage.getItem("token") === null || localStorage.getItem("token") === 'Bad credentials'){  
    return <Navigate to="/login" />;
  }
  if (!userIsLogged) {
    return <Navigate to="/login" />;
  }
  return children;
};

const AlreadyLogged = ({ children }) => {
  const userIsLogged = localStorage.getItem("id");
  if (userIsLogged) {
    return <Navigate to="/" />;
  }
  return children;
};

const Logout = () => {
  localStorage.clear();
  window.location.reload();
  return <Navigate to="/login" />;
};

function App() {
  const userIsLogged = localStorage.getItem("id");
  return (
    <div className="App">
      <BrowserRouter>
        {userIsLogged && <Menu />}
        <Routes>
          <Route
            path="/login"
            element={
              <AlreadyLogged>
                <Login />
              </AlreadyLogged>
            }
          />
          <Route
            path="/register"
            element={
              <AlreadyLogged>
                <Register />
              </AlreadyLogged>
            }
          />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/reports"
            element={
              <RequireAuth>
                <ReportsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/report/:id"
            element={
              <RequireAuth>
                <ReportDetailPage />
              </RequireAuth>
            }
          />
          <Route
            path="/report/edit/:id"
            element={
              <RequireAuth>
                <EditReportPage />
              </RequireAuth>
            }
          />
          <Route
            path="/patients"
            element={
              <RequireAuth>
                <PatientsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/patient/:id"
            element={
              <RequireAuth>
                <PatientDetailPage />
              </RequireAuth>
            }
          />
          <Route
            path="/report/create"
            element={
              <RequireAuth>
                <CreateReportPage />
              </RequireAuth>
            }
          />
          <Route
            path="/logout"
            element={
              <RequireAuth>
                <Logout />
              </RequireAuth>
            }
          />
          {/* Redirect to Home if user tries to access any other route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
