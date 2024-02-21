import React, { useState } from "react";
import defaultUserIcon from "../../Images/no-user.png";
import { Avatar } from "react-daisyui";
import { LoginProps, UserProps } from "../../types";

interface ProfileProps extends LoginProps {
  userData: UserProps | null
}

const Profile = ({ setLoggedIn, userData }: ProfileProps): React.JSX.Element => {

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const signOutHandler = async () => {
    try {
      const response = await fetch("api/user/signOut", {
        method: "POST",
      });
      if (response.ok) {
        setLoggedIn(false);
      }
    }
    catch (err) {
      console.error(err, "Failed to delete session. Could not sign out user.");
    }
  };

  return (
    <div>
      <Avatar size='xs' shape='circle' id="avatarButton" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-end" src={userData?.profileImage || defaultUserIcon} onClick={() => { setDropdownVisible(!dropdownVisible); }} />

      {/* <!-- Dropdown menu --> */}
      <div
        style={{ display: dropdownVisible ? "block" : "none" }} id="userDropdown"
        className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 transform translate-x-[-100%] absolute"
      >
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>{userData?.firstName}</div>
          <div className="font-medium truncate">{userData?.email}</div>
        </div>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
          </li>
        </ul>
        <div onClick={signOutHandler} className="py-1 cursor-pointer">
          <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</p>
        </div>
      </div>
    </div >
  );
};
export default Profile;
