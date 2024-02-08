import React, { useState } from "react";
import { ItemProps } from "../../types";
import { Button, Card, Avatar, Badge } from "react-daisyui";
import ItemDescription from "../ItemDescription/ItemDescription";
import { categoryNames } from "../../common";

const Item = ({ itemName, createDate, description, rentCount, loanDurationDays, imageUrl, username, status, categories, userId }: ItemProps): React.JSX.Element => {
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

  const categoryValueArr = categories.map((category) => {
    return category.name;
  });

  const categoryLabelArr: string[] = [];
  categoryValueArr.forEach((val) => {
    categoryNames.filter((obj) => {
      if (obj.value === val) {
        categoryLabelArr.push(obj.label);
      }
    });
  });


  return (
    <div>
      <Card className="p-3 mx-auto w-auto bg-slate-300 rounded-xl shadow-lg transform transition duration-400 hover:scale-105 hover:shadow-2xl">
        <div className="p-3 flex items-center justify-center">
          <Card.Title>{itemName}</Card.Title>
        </div>
        <Card.Image className="cursor-pointer rounded" src="https://images.unsplash.com/photo-1525268771113-32d9e9021a97?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="" />
        <div className="p-3 flex flex-wrap gap-3">
          {categoryLabelArr.map((label: string) => {
            return <Badge size="sm" key={label} variant="outline" color="primary">{label}</Badge>;
          })}
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
      {informationVisible && <ItemDescription userId={userId} itemName={itemName} createDate={createDate} description={description} rentCount={rentCount} loanDurationDays={loanDurationDays} imageUrl={imageUrl} username={username} status={status} categories={categories} setInformationVisible={setInformationVisible} />}
    </div >

  );
};

export default Item;
