import { TrashIcon } from "@heroicons/react/24/solid";

import { Contact } from "../types";

interface ContactCardProps {
  contact: Contact;
  onRemove: (contact: Contact) => void;
  onEdit: (contact: Contact) => void;
}

const ContactCard = ({ contact, onRemove, onEdit }: ContactCardProps) => {
  return (
    <li className="grid relative bg-white rounded-xl p-3 py-6 shadow-md">
      <button onClick={() => onEdit(contact)}>
        <img
          className="w-12 h-12 m-auto mb-2"
          src="/call.png"
          alt="contact-logo"
        />
        <span className="block text-center text-slate-700 font-semibold">
          {contact.firstName} {contact.lastName}
        </span>
        <span className="block text-center text-sm font-semibold text-slate-500">
          {contact.phoneNumber}
        </span>
      </button>
      <button
        onClick={() => onRemove(contact)}
        id={contact.id}
        className="absolute top-2 right-2 w-6 h-6"
      >
        <TrashIcon className="fill-red-700" />
      </button>
    </li>
  );
};

export default ContactCard;
