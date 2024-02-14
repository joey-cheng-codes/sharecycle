import React from "react";
import { ItemProps } from "../../types";
import { Button, Card } from "react-daisyui";
import { FaRecycle } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";

interface ItemDescriptionProps extends ItemProps {
  setInformationVisible: React.Dispatch<React.SetStateAction<boolean>>,

}
const ItemDescription = ({ setInformationVisible, itemName, createDate, description, rentCount, loanDurationDays, itemImage, userId, username, status, categories }: ItemDescriptionProps): React.JSX.Element => {

  const handleCloseInformation = () => {
    setInformationVisible(false);
  };
  return (
    <div>
      <Card className="p-3 mx-auto w-auto border-slate-600 rounded-xl">
        Item Description: {description}
        <div className="flex space-x-1 items-center">
          <FaCalendarDays />

          <span>
            available for {loanDurationDays} {Number(loanDurationDays) > 1 ? "days" : "day"} loan
          </span>


        </div>
        <div className="flex space-x-1 items-center">
          <FaRecycle />
          <span>borrowed {rentCount} times</span>
        </div>

        <Button onClick={handleCloseInformation} color="accent">Close</Button>
      </Card >
    </div >

  );
};

export default ItemDescription;
