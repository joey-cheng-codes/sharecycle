/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (): React.JSX.Element => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");

  const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          nickname,
          firstName,
          lastName,
          email,
          password,
          profileImageUrl
        })
      });
      if (response.ok) {
        navigate("/dashboard");
      } else {
        throw new Error("An error has occured. Failed to create a new account.");
      }
    } catch (err) {
      console.error(err, "Error signing up for new account.");
    }
  };
  return (
    <div>
      <h1> Signup Page</h1>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create an account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleFormSubmission}>

            <div>
              <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
              <div className="mt-2">
                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setFirstName(e.target.value); }} id="firstName" name="firstName" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
              <div className="mt-2">
                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setLastName(e.target.value); }} id="lastName" name="lastName" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <label htmlFor="nickname" className="block text-sm font-medium leading-6 text-gray-900">Nickname (optional)</label>
              <div className="mt-2">
                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setNickname(e.target.value); }} id="nickname" name="nickname" type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
              <div className="mt-2">
                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setUsername(e.target.value); }} id="username" name="username" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value); }} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              </div>
              <div className="mt-2">
                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value); }} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <label htmlFor="profileImageUrl" className="block text-sm font-medium leading-6 text-gray-900">Profile Picture (optional)</label>
              <div className="mt-2">
                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setProfileImageUrl(e.target.value); }} id="profileImageUrl" name="profileImageUrl" type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create New Account</button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign In Here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
