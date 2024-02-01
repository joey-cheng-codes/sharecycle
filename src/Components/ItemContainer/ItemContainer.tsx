import React, { useState, useEffect } from "react";
import Item from "../Item/Item";
import { UserProps } from "../../types";

const ItemContainer = (): React.JSX.Element => {
  const [cards, setCards] = useState([]);
  const [users, setUsers] = useState<UserProps[]>([]);
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
            const userData = await response.json();
            setUsers(userData);
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

  const createItems = cards.map((card) => {
    console.log(card, "am i getting my data?????******");
    const { itemName, createDate, id, description, rentCount, loanDurationDays, imageUrl, userId, status } = card;
    const user = users.find((user) => {
      user.id === userId;
    });
    if (user) {
      return (
        <div key={id}>
          <Item itemName={itemName} key={id} createDate={createDate} description={description} rentCount={rentCount} loanDurationDays={loanDurationDays} imageUrl={imageUrl} userId={userId} status={status} user={user} />
        </div>
      );
    }
  });

  return (
    <div>
      <p>I am in the item container</p>
      {createItems}
    </div>
  );

};

export default ItemContainer;
