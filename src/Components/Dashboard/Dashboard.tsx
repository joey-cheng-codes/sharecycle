import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Avatar from "../Avatar/Avatar";
import { IoIosAddCircle } from "react-icons/io";
import Item from "../Item/Item";
import Post from "../Post/Post";

const Dashboard = (): React.JSX.Element => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <div className='dashboard-container'>
      <div className='logo-searchbar-container'>
        <div className='logo'>
          <h1>ShareCycle</h1>
        </div>
        <div className='search-bar'>
          <SearchBar />
        </div>
        <div className='item-button-container'>
          <button
            data-modal-target="item-modal"
            data-modal-toggle="item-modal"
            className="mr-4"
            type="button"
            onClick={() => { setModalVisible((prevState) => !prevState); }}
          >
            <IoIosAddCircle className='item-button' />
          </button>
        </div>
        <div className='avatar-container'>
          <Avatar />
        </div>
      </div>
      {modalVisible && <Item setModalVisible={setModalVisible} />}
      <Post />
    </div>
  );
};

export default Dashboard;
