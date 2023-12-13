import React from "react";

interface ItemProps {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

interface Category {
  value: string
  label: string
}

const Item = ({ setModalVisible }: ItemProps): React.JSX.Element => {
  const categories = [
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

  return (
    <div>
      <div id="item-modal"
        tabIndex={-1}
        aria-hidden="true"
        className=
        "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100%] md:w-[80%] bg-white rounded-lg shadow overflow-hidden dark:bg-gray-700"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Item
              </h3>
              <button
                onClick={() => { setModalVisible(false); }}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="item-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <form className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Name</label>
                  <input type="text" name="item-name" id="item-name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type item name" required />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="loan-days" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Max Loan Duration (days)</label>
                  <input type="number" name="loan-days" id="loan-days" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="3" required />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categories(select one more)</label>
                  <select multiple id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                    {categories.map((category: Category) => {
                      return <option key={category.value} value={category.value}> {category.label}
                      </option>;
                    })
                    }
                  </select>
                </div>
                <div className="col-span-2">
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Description</label>
                  <textarea id="description" rows={8} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write item description or notes to borrowee here"></textarea>
                </div>
                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload Image</label>
                  <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, or JPG (MAX. 800x400px).</p>
                </div>
              </div>
              <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                Create
              </button>
            </form>
          </div>
        </div>
      </div >

    </div >
  );
};

export default Item;
