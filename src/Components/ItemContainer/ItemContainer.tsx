import React, { useState, useEffect } from "react";
import Item from "../Item/Item";
import { UserProps, ItemProps } from "../../types";

const ItemContainer = (): React.JSX.Element => {
  const [cards, setCards] = useState<ItemProps[]>([]);
  const [user, setUser] = useState({} as UserProps);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/item/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setCards(data);

          const responseTwo = await fetch(`/api/user/:${data.userId}`, {
            method: "GET",
            headers:
            {
              "Content-Type": "application/json"
            },
            credentials: "include",
          });
          if (responseTwo.ok) {
            const userData = await responseTwo.json();
            setUser(userData);
          }
          else {
            throw new Error("An error has occured trying to retrieve nickname");
          }

        }
        else {
          throw new Error("An error has occured trying to display items..");
        }
      }
      catch (err) {
        console.error(err, "Error displaying items.");
      }
    };
    fetchData();
  }, []);
  let count = 0;
  const createItems = cards.map((card) => {

    const { itemName, createDate, description, rentCount, loanDurationDays, userId, status, categories } = card;
    // To do: figure out image upload 
    const imageUrl = "https://images.unsplash.com/photo-1525268771113-32d9e9021a97?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
    if (user) {
      const { id, username, nickname, firstName, lastName, email, password }: UserProps = user;
      count++;
      // To do: figure out image upload 
      const profileImageUrl = "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg";

      return (
        <div className="max-w-xs" key={`${id}-${count}`} >
          <Item itemName={itemName} createDate={createDate} description={description} rentCount={rentCount} loanDurationDays={loanDurationDays} imageUrl={imageUrl} userId={userId} status={status} username={username} profileImageUrl={profileImageUrl} categories={categories} />
        </div >
      );
    }
  });

  return (
    <div className="m-3">
      <div className='flex flex-wrap gap-3'>
        {createItems}
      </div>
    </div>
  );

};

export default ItemContainer;
