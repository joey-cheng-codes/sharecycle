import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import Avatar from "../Avatar/Avatar"

const Dashboard = () => {
  return (
    <div className='dashboard-container'>
      <div className='logo-searchbar-container'>
        <h1>ShareCycle</h1>
        <SearchBar />
        <Avatar />
      </div>
    </div>
  )
}

export default Dashboard;