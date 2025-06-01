'use client';

import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface AddLeadFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}

const sportOptions = ['Tennis', 'Badminton', 'Cricket', 'Swimming', 'Basketball'];
const sourceOptions = ['Website', 'WhatsApp', 'Referral', 'Social Media', 'Walk-in'];
const coachOptions = ['Coach Mike', 'Coach Sarah', 'Coach John', 'Coach Lisa'];
const timeSlots = ['Morning', 'Afternoon', 'Evening'];
const budgetRanges = ['$50-100', '$100-200', '$200-300', '$300+'];

export default function AddLeadForm({ isOpen, onClose, onSubmit, initialData }: AddLeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    sport: sportOptions[0],
    source: sourceOptions[0],
    parent: '',
    phone: '',
    email: '',
    whatsapp: '',
    time: timeSlots[0],
    budget: budgetRanges[0],
    coach: coachOptions[0],
    notes: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        age: initialData.age || '',
        sport: initialData.sport || sportOptions[0],
        source: initialData.source || sourceOptions[0],
        parent: initialData.parent || '',
        phone: initialData.phone || '',
        email: initialData.email || '',
        whatsapp: initialData.whatsapp || '',
        time: initialData.time || timeSlots[0],
        budget: initialData.budget || budgetRanges[0],
        coach: initialData.assignedTo || coachOptions[0],
        notes: initialData.notes || ''
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                      {initialData ? 'Edit Lead' : 'Add New Lead'}
                    </Dialog.Title>
                    <div className="mt-6">
                      <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                          {/* Basic Information */}
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                              Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          <div>
                            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                              Age
                            </label>
                            <input
                              type="number"
                              name="age"
                              id="age"
                              value={formData.age}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          <div>
                            <label htmlFor="sport" className="block text-sm font-medium text-gray-700">
                              Sport
                            </label>
                            <select
                              id="sport"
                              name="sport"
                              value={formData.sport}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            >
                              {sportOptions.map((sport) => (
                                <option key={sport} value={sport}>
                                  {sport}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="source" className="block text-sm font-medium text-gray-700">
                              Lead Source
                            </label>
                            <select
                              id="source"
                              name="source"
                              value={formData.source}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            >
                              {sourceOptions.map((source) => (
                                <option key={source} value={source}>
                                  {source}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Contact Information */}
                          <div>
                            <label htmlFor="parent" className="block text-sm font-medium text-gray-700">
                              Parent/Guardian Name
                            </label>
                            <input
                              type="text"
                              name="parent"
                              id="parent"
                              value={formData.parent}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                              Phone
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              id="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                              Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              id="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          <div>
                            <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">
                              WhatsApp
                            </label>
                            <input
                              type="tel"
                              name="whatsapp"
                              id="whatsapp"
                              value={formData.whatsapp}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                          </div>

                          {/* Training Preferences */}
                          <div>
                            <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                              Preferred Training Time
                            </label>
                            <select
                              id="time"
                              name="time"
                              value={formData.time}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            >
                              {timeSlots.map((slot) => (
                                <option key={slot} value={slot}>
                                  {slot}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                              Budget Range
                            </label>
                            <select
                              id="budget"
                              name="budget"
                              value={formData.budget}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            >
                              {budgetRanges.map((range) => (
                                <option key={range} value={range}>
                                  {range}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="coach" className="block text-sm font-medium text-gray-700">
                              Assign Coach
                            </label>
                            <select
                              id="coach"
                              name="coach"
                              value={formData.coach}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            >
                              {coachOptions.map((coach) => (
                                <option key={coach} value={coach}>
                                  {coach}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Notes */}
                        <div>
                          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                            Notes
                          </label>
                          <textarea
                            id="notes"
                            name="notes"
                            rows={3}
                            value={formData.notes}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                          />
                        </div>

                        {/* AI Suggestions */}
                        <div className="rounded-md bg-blue-50 p-4">
                          <div className="flex">
                            <div className="ml-3">
                              <h3 className="text-sm font-medium text-blue-800">AI Suggestions</h3>
                              <div className="mt-2 text-sm text-blue-700">
                                <ul className="list-disc space-y-1 pl-5">
                                  <li>Recommended Coach: Coach Sarah (based on sport and time preference)</li>
                                  <li>Suggested Batch: Evening Intermediate Tennis (Mon/Wed/Fri)</li>
                                  <li>High Priority Lead (95% match with successful conversions)</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                          <button
                            type="submit"
                            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                          >
                            {initialData ? 'Save Changes' : 'Add Lead'}
                          </button>
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            onClick={onClose}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 