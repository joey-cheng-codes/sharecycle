import React, { useState } from "react";
import defaultUserIcon from "../../Images/no-user.png";

const Avatar = (): React.JSX.Element => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <div>
      <img id="avatarButton" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-end" className="w-100 rounded-full cursor-pointer" src={defaultUserIcon} alt="User dropdown" onClick={() => { setDropdownVisible(!dropdownVisible); }} />

      {/* <!-- Dropdown menu --> */}
      <div
        style={{ display: dropdownVisible ? "block" : "none" }} id="userDropdown"
        className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 transform translate-x-[-100%] absolute"
      >
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>Bonnie Green</div>
          <div className="font-medium truncate">name@flowbite.com</div>
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
        <div className="py-1">
          <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
        </div>
      </div>
    </div>
  );
};
export default Avatar;
