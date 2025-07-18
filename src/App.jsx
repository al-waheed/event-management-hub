import LandingPage from "./pages/LandingPage";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent";
import FindEvents from "./pages/FindEvents";
import MyEvents from "./pages/MyEvents";
import Profile from "./pages/Profile";
import { Navigate, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./Auth/Firebase";

const dashboardRoutes = [
  { path: "", element: <Dashboard /> },
  { path: "create-event", element: <CreateEvent /> },
  { path: "find-events", element: <FindEvents /> },
  { path: "my-events", element: <MyEvents /> },
  { path: "profile", element: <Profile /> },
];

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <LandingPage />}
      />
      <Route
        path="/dashboard"
        element={user ? <DashboardLayout /> : <Navigate to="/" />}
      >
        {dashboardRoutes.map(({ path, element }, i) =>
          path === "" ? (
            <Route index element={element} key={i} />
          ) : (
            <Route path={path} element={element} key={i} />
          )
        )}
      </Route>
    </Routes>
  );
}

export default App;
