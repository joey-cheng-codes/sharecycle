import React, { useState } from "react";
import Select from "react-select";
import { Button, Input, Form, Textarea } from "react-daisyui";
interface ItemProps {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

interface Category {
  value: string
  label: string
}

const ItemForm = ({ setModalVisible }: ItemProps): React.JSX.Element => {
  const [itemName, setItemName] = useState("");
  const [loanDurationDays, setLoanDurationDays] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const categoryNames: Category[] = [
    { value: "APPL", label: "Appliances" },
    { value: "ARTS", label: "Arts, Crafts, & Sewing" },
    { value: "AUTO", label: "Automative" },
    { value: "BABY", label: "Baby Products" },
    { value: "BEAU", label: "Beauty & Personal Care" },
    { value: "BMM", label: "Books, Movies, & Music" },
    { value: "CLOTH", label: "Clothing / Shoes / Accessories" },
    { value: "DIY", label: "DIY & Home Improvement" },
    { value: "ELEC", label: "Electronics" },
    { value: "EXER", label: "Fitness & Exercise Equipment" },
    { value: "FURN", label: "Furniture & Decor" },
    { value: "FOOD", label: "Grocery & Gourmet Foods" },
    { value: "HEA", label: "Health" },
    { value: "HOME", label: "Home & Kitchen" },
    { value: "OFFIC", label: "Office & School Supplies" },
    { value: "OUT", label: "Outdoor & Gardening" },
    { value: "PARTY", label: "Party & Event Supplies" },
    { value: "PET", label: "Pet Supplies" },
    { value: "SPORTS", label: "Sports & Outdoor Gear" },
    { value: "TOYS", label: "Toys & Games" }
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setImageUrl(() => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8D-G0b8ka5kyWMioBDY98SOJCYt8Xy7kklA&usqp=CAU");
    }
  };

  const handleCategoryChange = (data: Category[]): void => {
    setCategories(data);
  };

  const createItemHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const response = await fetch("/api/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          itemName,
          description,
          loanDurationDays,
          categories: categories.map(category => ({ name: category.value })),
          imageUrl,
        })

      });
      if (response.ok) {
        window.location.replace("/dashboard");
      } else {
        throw new Error("An error has occured. Failed to createa  new item.");
      }
    }
    catch (err) {
      console.error(err, "Error creating a new item.");
    }
  };


  return (
    <div>
      <Button
        onClick={() => { setModalVisible(false); }}
        type="button"
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        data-modal-toggle="item-modal">
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
        <span className="sr-only">Close modal</span>
      </Button>
      {/* <!-- Modal content --> */}
      <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
        Create New Item
      </h1>
      <Form onSubmit={(e) => { return createItemHandler(e); }} className="p-4 md:p-5">
        <div className="flex-col flex w-full">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Name</label>
          <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setItemName(e.target.value); }} type="text" name="item-name" id="item-name" placeholder="Type item name" required />
        </div>
        <label htmlFor="loan-days" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Max Loan Duration (days)</label>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoanDurationDays(Number(e.target.value))} type="number" name="loan-days" id="loan-days" placeholder="10" required />

        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categories(select one more)</label>
        <Select
          closeMenuOnSelect={false}
          isMulti
          options={categoryNames}
          id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          onChange={handleCategoryChange}
        />
        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Description</label>
        <Textarea
          onChange={(e) => { setDescription(e.target.value); }}
          id="description"
          rows={8}></Textarea>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload Image</label>
        <Input
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, or JPG (MAX. 800x400px).</p>
        <Button color="primary" type="submit">
          Create
        </Button>
      </Form>
    </div >
  );
};

export default ItemForm;
