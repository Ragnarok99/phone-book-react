import React, { useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/solid";

import useLocalStorage from "./hooks/useLocalStorage";
import AddContactModal from "./components/add-contact-modal";
import ContactCard from "./components/contact-card";
import { Contact } from "./types";

function App() {
  let [isOpen, setIsOpen] = useState(false);
  let [search, setSearch] = useState("");
  const [contacts, setContacts] = useLocalStorage<Contact[]>("contacts", []);

  const toggleModal = (nextValue: boolean) => () => setIsOpen(nextValue);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const values = e.target.elements;
    // TODO: handle validations

    // FIXME: type properly
    setContacts((prevState: any) => [
      ...prevState,
      {
        firstName: values.firstName.value,
        lastName: values.lastName.value,
        phoneNumber: values.phoneNumber.value,
      },
    ]);
  };

  return (
    <main className="max-w-7xl m-auto">
      <h1 className="text-center text-2xl font-semibold text-slate-800 py-6">
        Phone book{" "}
      </h1>
      <section className="grid mx-10 gap-4 pt-4">
        <div className="flex gap-6 justify-between items-center">
          <div className="w-full">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                value={search}
                onChange={handleSearch}
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search contacts..."
                required
              />
            </div>
          </div>
          <button
            type="button"
            onClick={toggleModal(true)}
            className="hidden md:flex items-center gap-2 w-56 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            <UserPlusIcon className="w-6 h-6" />
            <span>New contact</span>
          </button>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {contacts
            .filter(
              (contact) =>
                contact.firstName.includes(search) ||
                contact.phoneNumber.includes(search)
            )
            .map((contact) => (
              <ContactCard key={contact.firstName} contact={contact} />
            ))}
        </ul>

        <button
          title="add contact"
          onClick={toggleModal(true)}
          className="fixed z-90 bottom-10 flex md:hidden right-8 bg-blue-700 w-20 h-20 rounded-full drop-shadow-lg justify-center items-center text-white text-4xl"
        >
          <UserPlusIcon className="w-10" />
        </button>
      </section>
      <AddContactModal
        isOpen={isOpen}
        handleSubmit={handleSubmit}
        closeModal={toggleModal(false)}
      />
    </main>
  );
}

export default App;
