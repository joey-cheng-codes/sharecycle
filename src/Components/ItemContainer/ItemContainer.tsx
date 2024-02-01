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

    const { itemName, createDate, description, rentCount, loanDurationDays, imageUrl, userId, status, categories } = card;

    if (user) {
      const { id, username, nickname, firstName, lastName, email, password, profileImageUrl }: UserProps = user;
      count++;
      return (
        <div key={`${id}-${count}`} >
          <Item itemName={itemName} createDate={createDate} description={description} rentCount={rentCount} loanDurationDays={loanDurationDays} imageUrl={imageUrl} userId={userId} status={status} username={username} categories={categories} />
        </div >
      );
    }
  });

  return (
    <div>
      <p>I am in the item container</p>
      <div className='items flex gap-3'>
        {createItems}
      </div>
    </div>
  );

};

export default ItemContainer;
