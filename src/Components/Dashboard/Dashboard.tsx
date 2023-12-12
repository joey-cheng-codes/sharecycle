import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Avatar from "../Avatar/Avatar"
import { IoIosAddCircle } from "react-icons/io";
import Item from "../Item/Item";
const Dashboard = () => {
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <div className='dashboard-container'>
      <div className='logo-searchbar-container'>
        <h1>ShareCycle</h1>
        <SearchBar />
        <button
          data-modal-target="item-modal"
          data-modal-toggle="item-modal"
          className="mr-4"
          type="button"
          onClick={() => setModalVisible(!modalVisible)}
        >
          <IoIosAddCircle />
        </button>
        <Avatar />
      </div>
      {modalVisible && <Item modalVisible={modalVisible} setModalVisible={setModalVisible} />}
    </div>
  )
}

export default Dashboard;