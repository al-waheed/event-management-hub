import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import VerifyEmail from "./Auth/VerifyEmail";
import { Navigate, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./Auth/Firebase";

function App() {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setUser(user);
  //   });

  //   return () => unsubscribe();
  // }, []);
  // path="/"
  //       element={user ? <Navigate to="/dashboard" /> : <LandingPage />}

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
