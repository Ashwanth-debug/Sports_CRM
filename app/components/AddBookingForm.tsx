'use client';

import { Fragment, useState, FormEvent } from 'react';
import { Dialog, Transition, Listbox } from '@headlessui/react';
import { XMarkIcon, CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const sessionTypes = [
  { id: 1, name: 'Personal' },
  { id: 2, name: 'Coached' },
];

const courts = [
  { id: 1, name: 'Court 1' },
  { id: 2, name: 'Court 2' },
  { id: 3, name: 'Court 3' },
  { id: 4, name: 'Court 4' },
  { id: 5, name: 'Court 5' },
  { id: 6, name: 'Court 6' },
  { id: 7, name: 'Court 7' },
  { id: 8, name: 'Court 8' },
];

const coaches = [
  { id: 1, name: 'Coach Mike' },
  { id: 2, name: 'Coach Sarah' },
  { id: 3, name: 'Coach John' },
];

const timeSlots = Array.from({ length: 16 }, (_, i) => {
  const hour = i + 6; // Starting from 6 AM
  return {
    id: i + 1,
    name: `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`,
    value: hour,
  };
});

interface AddBookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (booking: BookingFormData) => void;
}

interface BookingFormData {
  date: Date;
  court: typeof courts[0];
  sessionType: typeof sessionTypes[0];
  coach: typeof coaches[0];
  startTime: typeof timeSlots[0];
  duration: number;
  playerName: string;
  playerEmail: string;
  playerPhone: string;
  notes: string;
}

export default function AddBookingForm({ isOpen, onClose, onSubmit }: AddBookingFormProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCourt, setSelectedCourt] = useState(courts[0]);
  const [selectedSessionType, setSelectedSessionType] = useState(sessionTypes[0]);
  const [selectedCoach, setSelectedCoach] = useState(coaches[0]);
  const [selectedStartTime, setSelectedStartTime] = useState(timeSlots[0]);
  const [duration, setDuration] = useState(1);
  const [playerName, setPlayerName] = useState('');
  const [playerEmail, setPlayerEmail] = useState('');
  const [playerPhone, setPlayerPhone] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      date: selectedDate,
      court: selectedCourt,
      sessionType: selectedSessionType,
      coach: selectedCoach,
      startTime: selectedStartTime,
      duration,
      playerName,
      playerEmail,
      playerPhone,
      notes,
    });
    onClose();
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
              <Dialog.Panel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
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
                  <div className="w-full">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900 mb-6">
                      New Booking
                    </Dialog.Title>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                        {/* Date Selection */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date
                          </label>
                          <DatePicker
                            selected={selectedDate}
                            onChange={(date: Date | null) => setSelectedDate(date || new Date())}
                            dateFormat="MMMM d, yyyy"
                            className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                          />
                        </div>

                        {/* Court Selection */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Court
                          </label>
                          <Listbox value={selectedCourt} onChange={setSelectedCourt}>
                            <div className="relative">
                              <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm">
                                <span className="block truncate">{selectedCourt.name}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                              </Listbox.Button>
                              <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                  {courts.map((court) => (
                                    <Listbox.Option
                                      key={court.id}
                                      className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-3 pr-9 ${
                                          active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                        }`
                                      }
                                      value={court}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                                            {court.name}
                                          </span>
                                          {selected ? (
                                            <span
                                              className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                                                active ? 'text-white' : 'text-indigo-600'
                                              }`}
                                            >
                                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </Listbox>
                        </div>

                        {/* Session Type */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Session Type
                          </label>
                          <Listbox value={selectedSessionType} onChange={setSelectedSessionType}>
                            <div className="relative">
                              <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm">
                                <span className="block truncate">{selectedSessionType.name}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                              </Listbox.Button>
                              <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                  {sessionTypes.map((type) => (
                                    <Listbox.Option
                                      key={type.id}
                                      className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-3 pr-9 ${
                                          active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                        }`
                                      }
                                      value={type}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                                            {type.name}
                                          </span>
                                          {selected ? (
                                            <span
                                              className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                                                active ? 'text-white' : 'text-indigo-600'
                                              }`}
                                            >
                                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </Listbox>
                        </div>

                        {/* Coach Selection (Only shown for Coached sessions) */}
                        {selectedSessionType.name === 'Coached' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Coach
                            </label>
                            <Listbox value={selectedCoach} onChange={setSelectedCoach}>
                              <div className="relative">
                                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm">
                                  <span className="block truncate">{selectedCoach.name}</span>
                                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                  </span>
                                </Listbox.Button>
                                <Transition
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {coaches.map((coach) => (
                                      <Listbox.Option
                                        key={coach.id}
                                        className={({ active }) =>
                                          `relative cursor-default select-none py-2 pl-3 pr-9 ${
                                            active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                          }`
                                        }
                                        value={coach}
                                      >
                                        {({ selected, active }) => (
                                          <>
                                            <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                                              {coach.name}
                                            </span>
                                            {selected ? (
                                              <span
                                                className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                                                  active ? 'text-white' : 'text-indigo-600'
                                                }`}
                                              >
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                              </span>
                                            ) : null}
                                          </>
                                        )}
                                      </Listbox.Option>
                                    ))}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </Listbox>
                          </div>
                        )}

                        {/* Time Selection */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Start Time
                          </label>
                          <Listbox value={selectedStartTime} onChange={setSelectedStartTime}>
                            <div className="relative">
                              <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm">
                                <span className="block truncate">{selectedStartTime.name}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                              </Listbox.Button>
                              <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                  {timeSlots.map((time) => (
                                    <Listbox.Option
                                      key={time.id}
                                      className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-3 pr-9 ${
                                          active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                        }`
                                      }
                                      value={time}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                                            {time.name}
                                          </span>
                                          {selected ? (
                                            <span
                                              className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                                                active ? 'text-white' : 'text-indigo-600'
                                              }`}
                                            >
                                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </Listbox>
                        </div>

                        {/* Duration */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Duration (hours)
                          </label>
                          <select
                            value={duration}
                            onChange={(e) => setDuration(Number(e.target.value))}
                            className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                          >
                            <option value={1}>1 hour</option>
                            <option value={2}>2 hours</option>
                            <option value={3}>3 hours</option>
                          </select>
                        </div>

                        {/* Player Details */}
                        <div className="sm:col-span-2">
                          <h4 className="text-sm font-medium text-gray-900 mb-4">Player Details</h4>
                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Name
                              </label>
                              <input
                                type="text"
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                placeholder="Enter player name"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                              </label>
                              <input
                                type="email"
                                value={playerEmail}
                                onChange={(e) => setPlayerEmail(e.target.value)}
                                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                placeholder="Enter email address"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone
                              </label>
                              <input
                                type="tel"
                                value={playerPhone}
                                onChange={(e) => setPlayerPhone(e.target.value)}
                                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                placeholder="Enter phone number"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Notes */}
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Notes
                          </label>
                          <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                            className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            placeholder="Add any additional notes"
                          />
                        </div>
                      </div>

                      {/* Booking Summary */}
                      <div className="bg-gray-50 rounded-lg p-4 mt-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Booking Summary</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Date</p>
                            <p className="font-medium">{selectedDate.toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Time</p>
                            <p className="font-medium">{selectedStartTime.name} ({duration}h)</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Court</p>
                            <p className="font-medium">{selectedCourt.name}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Session Type</p>
                            <p className="font-medium">{selectedSessionType.name}</p>
                          </div>
                          {selectedSessionType.name === 'Coached' && (
                            <div>
                              <p className="text-gray-500">Coach</p>
                              <p className="font-medium">{selectedCoach.name}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Form Actions */}
                      <div className="mt-6 flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={onClose}
                          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                        >
                          Create Booking
                        </button>
                      </div>
                    </form>
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