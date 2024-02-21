import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Avatar from "../Avatar/Avatar";
import { IoIosAddCircle } from "react-icons/io";
import ItemForm from "../ItemForm/ItemForm";
import ItemContainer from "../ItemContainer/ItemContainer";
import { Button } from "react-daisyui";
import logo from "../../Images/sharecycle-blue.png";
import { useUserContext } from "../../context";
import { UserProps } from "../../types";

const Dashboard = (): React.JSX.Element => {
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useUserContext();
  const [userData, setUserData] = useState<UserProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/user/:${user?.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        }
        else {
          throw new Error(" An error has occured trying to retrieve user data...");
        }
      }
      catch (err) {
        console.error("Error retreiving user information");
      }
      fetchData();
    };
  },
    [user]);
  return (
    <div className='dashboard-container'>
      <div className='logo-searchbar-container'>
        <div className='logo'>
          <img src={logo} />
        </div>
        <div className='search-bar'>
          <SearchBar />
        </div>
        <div className='item-button-container'>
          <Button
            data-modal-target="item-modal"
            data-modal-toggle="item-modal"
            className="mr-4"
            type="button"
            onClick={() => { setModalVisible((prevState) => !prevState); }}
          >
            <IoIosAddCircle className='item-button' />
          </Button>
        </div>
        <div className='avatar-container'>
          <Avatar />
        </div>
      </div>
      {modalVisible && <ItemForm setModalVisible={setModalVisible} />}
      <ItemContainer />
    </div>
  );
};

export default Dashboard;
