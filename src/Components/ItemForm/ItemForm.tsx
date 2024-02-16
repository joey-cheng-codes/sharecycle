import React, { useState } from "react";
import Select from "react-select";
import { Button, Input, Form, Textarea } from "react-daisyui";
import { categoryNames } from "../../common";
import { getBase64, MAX_IMAGE_SIZE_MB } from "../../Utils/imageUtils";
import itemPlaceholder from "../../Images/item-placeholder.png";
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
  const [itemImage, setItemImage] = useState(itemPlaceholder);


  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    const newFile = target.files[0];
    const fileSizeMB = newFile.size / (1024 * 1024); // Convert bytes to megabytes
    if (fileSizeMB > MAX_IMAGE_SIZE_MB) {
      alert(`Please select an image smaller than ${MAX_IMAGE_SIZE_MB} MB.`);
      target.value = "";
    }
    else {
      const promise = await getBase64(newFile);
      if (promise) {
        setItemImage(promise);
      }
      else {
        console.error("Failed to get base64 data for the file.");
      }
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
          itemImage,
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
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, or JPG (Suggested: 1200x900px. Max Image Size: 5MB ).</p>
        <Button color="primary" type="submit">
          Create
        </Button>
      </Form>
    </div >
  );
};

export default ItemForm;
