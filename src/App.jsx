import { Navigate, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./Auth/Firebase";
import { RotatingLines } from "react-loader-spinner";
import LandingPage from "./pages/LandingPage";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateEvent from "./pages/CreateEvent/CreateEvent";
import FindEvents from "./pages/FindEvents";
import MyEvents from "./pages/MyEvents";
import Profile from "./pages/Profile";

const dashboardRoutes = [
  { path: "", element: <Dashboard /> },
  { path: "create-event", element: <CreateEvent /> },
  { path: "find-events", element: <FindEvents /> },
  { path: "my-events", element: <MyEvents /> },
  { path: "profile", element: <Profile /> },
];

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>
          <RotatingLines
            visible={true}
            height="80"
            width="80"
            strokeWidth="4"
            strokeColor="#2B293D"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          !!user?.emailVerified ? <Navigate to="/dashboard" /> : <LandingPage />
        }
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
