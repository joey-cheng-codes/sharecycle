import React from "react";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import Dashboard from "../Dashboard/Dashboard";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const App = (): React.JSX.Element => {
  const [loggedIn, setLoggedIn] = useState(true);
  useEffect(() => {
    const checkSession = async () => {

      try {
        const response = await fetch("api/user/isLoggedIn");
        if (!response.ok) {
          setLoggedIn(false);
        }
        else {
          setLoggedIn(true);
        }
      }
      catch (err) {
        console.error(err, "No authorization. You are not logged in.");
      }
    };
    checkSession();
  }, []);


  return (
    <div>
      <div>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Login />}
            ></Route>
            <Route
              path="/signup"
              element={<Signup />}
            ></Route>
            <Route
              path='/dashboard'
              element={loggedIn ? <Dashboard setLoggedIn={setLoggedIn} /> : <Navigate
                to="/" />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div >
  );
};

export default App;
