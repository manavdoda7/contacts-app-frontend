import LoginForm from "./components/loginForm/loginForm";
import RegisterForm from "./components/registerForm/registerForm";
import Homepage from "./components/homepage/homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard";
import ViewContact from "./components/viewContact/viewContact";
import EditContact from "./components/editContact/editContact";
import UploadCSV from "./components/uploadCsv/uploadcsv";
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage/>} />
        <Route exact path="/register" element={<RegisterForm/>} />
        <Route exact path="/login" element={<LoginForm/>} />
        <Route exact path="/dashboard" element={<Dashboard/>} />
        <Route exact path="/upload" element={<UploadCSV/>} />
        <Route exact path="/contact/view/:id" element={<ViewContact/>} />
        <Route exact path="/contact/edit/:id" element={<EditContact/>} />
      </Routes>
    </Router>
  );
}

export default App;
