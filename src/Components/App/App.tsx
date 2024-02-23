import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import Dashboard from "../Dashboard/Dashboard";
import { userContext } from "../../context";
import { UserProps } from "../../types";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const App = (): React.JSX.Element => {
  const [user, setUser] = useState<UserProps | undefined>(undefined);

  const updateUser = (newUser: UserProps) => {
    setUser(newUser);
  };
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
    <QueryClientProvider client={queryClient}>
      <userContext.Provider value={{ user, updateUser }}>
        <div>
          <div>
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={<Login setLoggedIn={setLoggedIn} />}
                ></Route>
                <Route
                  path="/signup"
                  element={<Signup setLoggedIn={setLoggedIn} />}
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
      </userContext.Provider >
    </QueryClientProvider>
  );
};

export default App;
