import React from "react";
import Home from "./pages/Home.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth.jsx";
import { useEffect } from "react";
import { getCurrentUser } from "./services/api.js";
import { useDispatch, useSelector } from "react-redux";
import Pricing from "./pages/Pricing.jsx";
import Notes from "./pages/Notes.jsx";
import History from "./pages/History.jsx";

export const serverUrl = "http://localhost:8000";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getCurrentUser(dispatch);
  }, [dispatch]);

  const { userData, loading } = useSelector((state) => state.user);
  console.log(userData);

  if (loading) {
    return <div></div>; // Show nothing while checking auth
  }

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/auth"
          element={userData ? <Navigate to="/" replace /> : <Auth />}
        />
        <Route
          path="/history"
          element={userData ? <History /> : <Navigate to="/auth" replace />}
        ></Route>
        <Route
          path="/pricing"
          element={userData ? <Pricing /> : <Navigate to="/auth" replace />}
        ></Route>
        <Route
          path="notes"
          element={userData ? <Notes /> : <Navigate to="/auth" replace />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
