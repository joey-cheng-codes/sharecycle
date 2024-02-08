import React, { useState } from "react";
import { ItemProps } from "../../types";
import { Button, Card, Avatar, Badge } from "react-daisyui";
import Information from "./Information/Information";

// interface Category {
//   value: string
//   label: string
// }

const Item = ({ itemName, createDate, description, rentCount, loanDurationDays, imageUrl, username, status, categories, userId }: ItemProps): React.JSX.Element => {
  // if (!categories) categories = [{ value: "hardcoding", label: "woah" }];
  const [informationVisible, setInformationVisible] = useState(false);
  const formatCreateDate = (rawDate: string): string => {

    const date = new Date(rawDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear() % 100;

    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedYear = year < 10 ? `0${year}` : year;

    return `${formattedMonth}/${formattedDay}/${formattedYear}`;
  };
  const date = formatCreateDate(createDate);
  // const { value, label }: Category[] = categories;

  return (
    <div>
      <Card className="p-3 mx-auto w-auto bg-slate-300 rounded-xl shadow-lg transform transition duration-400 hover:scale-105 hover:shadow-2xl">
        <div className="p-3 flex items-center justify-center">
          <Card.Title>{itemName}</Card.Title>
        </div>
        <Card.Image className="cursor-pointer rounded" src="https://images.unsplash.com/photo-1525268771113-32d9e9021a97?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="" />
        {/* <p>{
          categories.map(category => category.label).join(", ")
        }</p> */}
        <div className="p-3 flex flex-row gap-3">
          <Badge variant="outline" color="primary">Home & Kitchen</Badge>
          <Badge variant="outline" color="primary">Tools & DIY</Badge>
        </div>
        <Card.Body className="p-1">
          <div className="flex items-center content-center flex-row gap-1">
            <Avatar size="xs" shape="circle" src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg" />
            <h2 className="text-gray-800 font-bold">{username}</h2>
            <h2 className="text-gray-800"> | {date}</h2>
          </div>

        </Card.Body>
        <div className="flex justify-between items-center content-center space-x-2">
          <Badge size="sm" color="ghost">{status}</Badge>
          <Button onClick={() => { setInformationVisible((prevState) => !prevState); }} size="md" color="accent">Information</Button>
        </div>
      </Card>
      {informationVisible && <Information userId={userId} itemName={itemName} createDate={createDate} description={description} rentCount={rentCount} loanDurationDays={loanDurationDays} imageUrl={imageUrl} username={username} status={status} categories={categories} setInformationVisible={setInformationVisible} />}
    </div >

  );
};

export default Item;
