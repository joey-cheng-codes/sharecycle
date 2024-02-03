/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";
import { Button, Input, Link, Card } from "react-daisyui";
import logo from "../../Images/sharecycle-white.png";

const Login = (): React.JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password
        })
      });
      if (response.ok) {
        window.location.replace("dashboard");
      } else {
        throw new Error("An error has occured. Failed to login to account.");
      }
    } catch (err) {
      console.error(err, "Error logging in.");
    }
  };
  return (
    <div className="login-container justify-center">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm pb-5">
          <img className="mx-auto h-40 w-auto" src={logo} alt="ShareCycle-Logo" />
        </div>
        <Card className="mx-auto w-auto bg-white">
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in</h1>
            <form onSubmit={handleLoginSubmission} action="#" method="POST">
              <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
                <div className="form-control w-96 max-w-xs gap-y-2">
                  <label className="label">
                    <span className="label-text">Email Address</span>
                  </label>
                  <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value); }} id="email" name="email" type="email" placeholder="email address" autoComplete="email" color="primary" required className='w-full max-w-xs'></Input>
                  <label className="label">
                    <span className="label-text">Password</span>
                    <span>
                      <Link href="#" target="_blank" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
                    </span>
                  </label>
                  <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value); }} id="password" name="password" type="password" placeholder="password" color="primary" required className='w-full max-w-xs'></Input>
                  <Button type="submit" fullWidth color="primary">Sign in</Button>
                  <p className="text-sm text-gray-500">{"Don't have an account?"}
                    <Link href="/signup" target="_blank" className="font-semibold text-indigo-600 hover:text-indigo-500"> Sign up here</Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
