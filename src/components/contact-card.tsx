import React from "react";
import { Contact } from "../types";

interface ContactCardProps {
  contact: Contact;
}

const ContactCard = ({ contact }: ContactCardProps) => {
  return (
    <li className="grid bg-white rounded-md p-3 py-6 shadow-md">
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
    </li>
  );
};

export default ContactCard;
