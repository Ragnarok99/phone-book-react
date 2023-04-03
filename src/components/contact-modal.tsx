import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FormProvider, get, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Contact } from "../types";
import { ContactSchema } from "../Schemas/contact";

interface ContactModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleSubmit: (algo: any) => void;
  contact?: Contact;
}

const ContactModal = ({
  isOpen,
  closeModal,
  contact,
  handleSubmit,
}: ContactModalProps) => {
  const methods = useForm<Contact>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: undefined,
    },
    resolver: yupResolver(ContactSchema),
  });

  React.useEffect(() => {
    methods.reset(contact);
  }, [contact]);
  const isEdit = Boolean(contact);

  const firstNameError = get(methods.formState.errors.firstName, "message");
  const lastNameError = get(methods.formState.errors.lastName, "message");
  const phoneNumberError = get(methods.formState.errors.phoneNumber, "message");

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          closeModal();
          methods.reset({
            firstName: "",
            lastName: "",
            phoneNumber: undefined,
          });
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {isEdit
                    ? `Edit ${contact?.firstName} ${contact?.lastName} contact`
                    : "Add a new contact"}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {isEdit
                      ? "Please edit your contact"
                      : "Please enter your new contact's details."}
                  </p>
                </div>
                <FormProvider {...methods}>
                  <form onSubmit={methods.handleSubmit(handleSubmit)}>
                    <div className="grid gap-3">
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="first-name"
                            className={`block text-sm font-medium leading-6 text-gray-900 ${
                              Boolean(firstNameError)
                                ? "text-red-600 font-semibold"
                                : ""
                            }`}
                          >
                            First name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              id="first-name"
                              autoComplete="given-name"
                              className={`px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset outline-none sm:text-sm sm:leading-6 ${
                                Boolean(firstNameError)
                                  ? "focus:ring-red-600 ring-red-300"
                                  : ""
                              }`}
                              {...methods.register("firstName")}
                            />
                            <span className="text-red-600 text-xs font-semibold">
                              {firstNameError}
                            </span>
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="last-name"
                            className={`block text-sm font-medium leading-6 text-gray-900 ${
                              Boolean(lastNameError)
                                ? "text-red-600 font-semibold"
                                : ""
                            }`}
                          >
                            Last name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              id="last-name"
                              autoComplete="family-name"
                              className={`px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset outline-none sm:text-sm sm:leading-6 ${
                                Boolean(lastNameError)
                                  ? "focus:ring-red-600 ring-red-300"
                                  : ""
                              }`}
                              {...methods.register("lastName")}
                            />
                            <span className="text-red-600 text-xs font-semibold">
                              {lastNameError}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="phone-number"
                            className={`block text-sm font-medium leading-6 text-gray-900 ${
                              Boolean(phoneNumberError)
                                ? "text-red-600 font-semibold"
                                : ""
                            }`}
                          >
                            Phone number
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              id="phone-number"
                              autoComplete="family-name"
                              className={`px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset outline-none sm:text-sm sm:leading-6 ${
                                Boolean(phoneNumberError)
                                  ? "focus:ring-red-600 ring-red-300"
                                  : ""
                              }`}
                              {...methods.register("phoneNumber")}
                            />
                            <span className="text-red-600 text-xs font-semibold">
                              {phoneNumberError}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        {isEdit ? "Edit" : "Create"}
                      </button>
                    </div>
                  </form>
                </FormProvider>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ContactModal;
