import React from "react";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import Dashboard from "../Dashboard/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { userContext } from "../../context";
import { useState } from "react";
import { UserProps } from "../../types";

const App = (): React.JSX.Element => {
  const [user, setUser] = useState<UserProps | undefined>(undefined);

  const updateUser = (newUser: UserProps) => {
    setUser(newUser);
  };
  return (
    <userContext.Provider value={{ user, updateUser }}>
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
                element={<Dashboard />}>
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </div >
    </userContext.Provider >
  );
};

export default App;
