import React, { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import Avatar from '../Avatar/Avatar'
import { IoIosAddCircle } from 'react-icons/io'
import Item from '../Item/Item'
const Dashboard = (): React.JSX.Element => {
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
          onClick={() => { setModalVisible((prevState) => !prevState) }}
        >
          <IoIosAddCircle />
        </button>
        <Avatar />
      </div>
      {modalVisible && <Item setModalVisible={setModalVisible} />}
    </div>
  )
}

export default Dashboard
