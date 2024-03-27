import React from "react";
import Item from "../Item/Item";
import { UserProps, ItemProps } from "../../types";
import { useQuery } from "react-query";

const ItemContainer = (): React.JSX.Element => {
  const fetchItemData = async () => {
    const response = await fetch("/api/item/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("An error has occured trying to display items..");
    }
  };
  const fetchUserData = async (userId: string) => {
    const response = await fetch(`/api/user/:${userId}`, {
      method: "GET",
      headers:
      {
        "Content-Type": "application/json"
      },
      credentials: "include",
    });
    if (response.ok) {
      return await response.json();
    }
    else {
      throw new Error("An error has occured trying to retrieve nickname");
    }
  };

  const { data: cards, error: cardsError, isLoading: cardsLoading } = useQuery("cards", fetchItemData);
  const { data: user, error: userError, } = useQuery("user", () => fetchUserData(cards?.userId));

  if (cardsLoading) {
    return <div>Loading...</div>;
  }

  if (cardsError) console.error(cardsError, "Error displaying items.");

  if (cards.length === 0) {
    return <div>You have no items. Begin by adding some items.</div>;
  }

  if (userError) console.error(userError, "Error retreiving user data.");

  let count = 0;
  const createItems = cards.map((card: ItemProps) => {

    const { itemName, createDate, description, rentCount, loanDurationDays, userId, status, categories, itemImage } = card;

    if (user) {

      const { id, username, profileImage, nickname, firstName, lastName, email, password, }: UserProps = user;
      count++;

      return (
        <div className="max-w-xs" key={`${id}-${count}`} >
          {profileImage && <Item itemName={itemName} createDate={createDate} description={description} rentCount={rentCount} loanDurationDays={loanDurationDays} itemImage={itemImage} userId={userId} status={status} username={username} profileImage={profileImage} categories={categories} />}
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
