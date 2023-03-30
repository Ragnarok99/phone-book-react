import React, { useState } from "react";

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
      <h1 className="text-center pt-4">Phone book </h1>
      <section className="grid justify-center gap-4 pt-4">
        <div>
          <div className="grid gap-1">
            <label htmlFor="search">search</label>
            <input
              value={search}
              onChange={handleSearch}
              type="text"
              name="search"
              id="search"
            />
          </div>
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
          type="button"
          onClick={toggleModal(true)}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          new contact
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
