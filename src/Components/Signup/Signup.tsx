/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../Images/sharecycle-white.png";
import { Card, Input, Link, Button } from "react-daisyui";
import defaultUserIcon from "../../Images/no-user.png";
import { getBase64, MAX_IMAGE_SIZE_MB } from "../../Utils/imageUtils";
import { useUserContext } from "../../context"; // Import the context hook


const Signup = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { updateUser } = useUserContext();
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(defaultUserIcon);

  const handleFileInputChange = async (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    const newFile = target.files[0];
    const fileSizeMB = newFile.size / (1024 * 1024); // Convert bytes to megabytes
    if (fileSizeMB > MAX_IMAGE_SIZE_MB) {
      alert(`Please select an image smaller than ${MAX_IMAGE_SIZE_MB} MB.`);
      target.value = "";
    }
    else {
      const promise = await getBase64(newFile);

      if (promise) {
        setProfileImage(promise);
      }
      else {
        console.error("Failed to get base64 data for the file.");
      }
    }
  };

  const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user/signup", {
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
          profileImage
        })
      });
      if (response.ok) {
        const userData = await response.json();
        console.log(userData, "will we get the data????");
        updateUser(userData);
        navigate("/dashboard");
      } else {
        throw new Error("An error has occured. Failed to create a new account.");
      }
    } catch (err) {
      console.error(err, "Error signing up for new account.");
    }
  };
  return (
    <div className='signup-container justify-center'>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm pb-5">
          <img className="mx-auto h-40 w-auto" src={logo} alt="ShareCycle-Logo" />
        </div>
        <Card className="mx-auto w-auto bg-white">
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create an account</h1>
            <form onSubmit={handleFormSubmission}>
              <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
                <div className="form-control w-96 max-w-xs gap-y-1">
                  <label className="label">
                    <span className="label-text">First Name:</span>
                  </label>

                  <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setFirstName(e.target.value); }} id="firstName" name="firstName" type="text" placeholder="First Name" color="primary" required className="w-full max-w-xs" />
                  <label className="label">
                    <span className="label-text">Last Name:</span>
                  </label>
                  <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setLastName(e.target.value); }} id="lastName" name="lastName" type="text" placeholder="Last Name" required color="primary" className="w-full max-w-xs" />
                  <label className="label">
                    <span className="label-text">Nickname (optional):</span>
                  </label>
                  <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setNickname(e.target.value); }} id="nickname" name="nickname" type="text" placeholder="Nickname" color="primary" className="w-full max-w-xs" />

                  <label className="label">
                    <span className="label-text">Username:</span>
                  </label>
                  <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setUsername(e.target.value); }} id="username" name="username" type="text" placeholder="Username" color="primary" required className="w-full max-w-xs" />

                  <label className="label">
                    <span className="label-text">Email Address:</span>
                  </label>
                  <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value); }} id="email" name="email" type="email" autoComplete="email" placeholder="Email address" color="primary" required className="w-full max-w-xs" />

                  <label className="label">
                    <span className="label-text">Password:</span>
                  </label>
                  <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value); }} id="password" name="password" type="password" autoComplete="current-password" placeholder="Password" color="primary" required className="w-full max-w-xs" />

                  <div>
                    <label className="label">
                      <span className="label-text">Upload Profile Image:</span>
                    </label>
                    <Input onChange={handleFileInputChange} id="profileImage" name="profileImage" type="file" placeholder="Profile Image URL" color="primary" className="w-full max-w-xs" />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, or JPG (Suggested: 500x500px. Max Image Size: 5MB ).</p>
                  </div>

                  <Button fullWidth color="primary">Create New Account</Button>
                  <p className="text-sm text-gray-500">{"Already have an account? "}
                    <Link href="/" target="_blank" className="font-semibold text-indigo-600 hover:text-indigo-500">Sign in here</Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </Card >
      </div >
    </div >
  );
};

export default Signup;
