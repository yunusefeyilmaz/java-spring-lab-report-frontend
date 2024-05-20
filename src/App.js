import './App.css';
import ReportsPage from './components/pages/ReportsPage/ReportsPage';
import  Menu  from './components/Menu/Menu';
import Home from './components/pages/Home/Home';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import PatientsPage from './components/pages/PatientsPage/PatientsPage';
import CreateReportPage from './components/pages/CreateReportPage/CreateReportPage';
import ReportDetailPage from './components/pages/ReportDetailPage/ReportDetailPage';
import PatientDetailPage from './components/pages/PatientDetailPage/PatientDetailPage';
import EditReportPage from './components/pages/EditReportPage/EditReportPage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Menu></Menu>
        <Routes>
          <Route path="/" Component={Home} ></Route>
          <Route path="/reports" Component={ReportsPage} ></Route>
          <Route path="/report/:id" Component={ReportDetailPage} ></Route>
          <Route path="/report/edit/:id" Component={EditReportPage} ></Route>
          <Route path="/patients" Component={PatientsPage} ></Route>
          <Route path="/patient/:id" Component={PatientDetailPage} ></Route>
          <Route path="/report/create" Component={CreateReportPage} ></Route>
          <Route path="/logout" Component={CreateReportPage} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
