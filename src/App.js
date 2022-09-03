import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import { MyContext } from "./context";
import AddJob from "./pages/AddJob";
import EditJob from "./pages/EditJob";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import ManageJobs from "./pages/ManageJobs";
import Register from "./pages/Register";
import SearchJob from "./pages/SearchJob";
import ViewJob from "./pages/ViewJob";

function App() {
  const { user } = useContext(MyContext);
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/view-job/:id" element={<ViewJob />} />
        {user && !user.isRecruiter && (
          <>
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/search-jobs" element={<SearchJob />} />
          </>
        )}
        {user && user.isRecruiter && (
          <>
            <Route path="/post-job" element={<AddJob />} />
            <Route path="/manage-jobs" element={<ManageJobs />} />
            <Route path="/edit-job/:id" element={<EditJob />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
