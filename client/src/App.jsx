import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import MarksEntry from "./pages/MarksEntry";
import Ledger from "./pages/Ledger";
import About from "./pages/About";
import Students from "./pages/Students";
import Marksheet from "./pages/Marksheet";
import ViewAll from "./pages/ViewAll";
import EditStudent from "./pages/EditStudent";
import EditMarks from "./pages/EditMarks";
import { useAuth } from "./contexts/authContext";
import AuthLayout from "./layouts/AuthLayouts";
import Login from "./pages/Login";
import AppLayout from "./layouts/AppLayouts";
import Logout from "./pages/Logout";

function App() {
  const { token } = useAuth();

  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Login />} />
        </Route>

        <Route element={token ? <AppLayout /> : <Navigate to="/login" replace />}>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/viewAll" element={<ViewAll />} />
          <Route path="/students/edit/:stuId" element={<EditStudent />} />
          <Route path="/marks-entry" element={<MarksEntry />} />
          <Route path="/marks/:marksId" element={<EditMarks />} />
          <Route path="/ledger" element={<Ledger />} />
          <Route path="/about" element={<About />} />
          <Route path="/marksheet/:examYear/:examTerm/:clss/:stuId" element={<Marksheet />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
