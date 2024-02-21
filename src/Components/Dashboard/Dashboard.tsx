import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Avatar from "../Avatar/Avatar";
import { IoIosAddCircle } from "react-icons/io";
import ItemForm from "../ItemForm/ItemForm";
import ItemContainer from "../ItemContainer/ItemContainer";
import { Button } from "react-daisyui";
import logo from "../../Images/sharecycle-blue.png";
import { LoginProps } from "../../types";


const Dashboard = ({ setLoggedIn }: LoginProps): React.JSX.Element => {

  const [modalVisible, setModalVisible] = useState(false);
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
          <Avatar setLoggedIn={setLoggedIn} />
        </div>
      </div>
      {modalVisible && <ItemForm setModalVisible={setModalVisible} />}
      <ItemContainer />
    </div>
  );
};

export default Dashboard;
