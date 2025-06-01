'use client';

import { useState, Fragment } from 'react';
import { Dialog, Transition, Listbox } from '@headlessui/react';
import {
  UserIcon,
  ChevronUpDownIcon,
  CheckIcon,
  XMarkIcon,
  ExclamationCircleIcon,
  ArrowUpCircleIcon,
} from '@heroicons/react/24/outline';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const statusFilters = ['All', 'Active', 'Expiring Soon', 'Expired'];
const membershipTypes = ['All Types', 'Basic', 'Premium', 'Family'];
const sportTypes = ['All Sports', 'Tennis', 'Swimming', 'Basketball'];

const mockMembers = [
  {
    id: 1,
    name: 'John Doe',
    membershipType: 'Premium',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    sessionsLeft: 'Unlimited',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    membershipType: 'Basic',
    startDate: '2024-02-01',
    endDate: '2024-04-30',
    sessionsLeft: '8',
    status: 'Expiring Soon',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    membershipType: 'Family',
    startDate: '2023-12-01',
    endDate: '2024-02-28',
    sessionsLeft: 'Unlimited',
    status: 'Expired',
  },
];

const membershipPlans = [
  { 
    id: 1, 
    name: 'Basic', 
    price: 99, 
    duration: 1, // months
    sessions: 12 
  },
  { 
    id: 2, 
    name: 'Premium', 
    price: 199, 
    duration: 1, 
    sessions: 'Unlimited' 
  },
  { 
    id: 3, 
    name: 'Family', 
    price: 299, 
    duration: 1, 
    sessions: 'Unlimited' 
  },
];

const alerts = [
  {
    type: 'expiring',
    title: 'Expiring in 3 days',
    members: ['Jane Smith', 'David Wilson'],
  },
  {
    type: 'inactive',
    title: 'No Active Membership',
    members: ['Tom Brown', 'Sarah Davis'],
  },
  {
    type: 'upgrade',
    title: 'Suggested Upgrades',
    members: ['Mike Johnson - High usage'],
  },
];

export default function MembershipManagementTab() {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedSport, setSelectedSport] = useState('All Sports');
  const [showNewMembershipModal, setShowNewMembershipModal] = useState(false);
  
  // New Membership Form State
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(membershipPlans[0]);
  const [startDate, setStartDate] = useState(new Date());
  const [discount, setDiscount] = useState(0);
  const [paymentCollected, setPaymentCollected] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Expiring Soon':
        return 'bg-yellow-100 text-yellow-800';
      case 'Expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateEndDate = (start: Date, duration: number) => {
    const end = new Date(start);
    end.setMonth(end.getMonth() + duration);
    return end.toISOString().split('T')[0];
  };

  const calculateFinalPrice = () => {
    const basePrice = selectedPlan.price;
    const discountAmount = (basePrice * discount) / 100;
    return basePrice - discountAmount;
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              {statusFilters.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Membership Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              {membershipTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sport</label>
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              {sportTypes.map((sport) => (
                <option key={sport} value={sport}>{sport}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setShowNewMembershipModal(true)}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add New Membership
            </button>
          </div>
        </div>
      </div>

      {/* Membership Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Membership Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sessions Left</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockMembers.map((member) => (
                <tr key={member.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <UserIcon className="h-6 w-6 text-gray-400" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.membershipType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.startDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.endDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.sessionsLeft}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(member.status)}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Alerts</h3>
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-start">
                {alert.type === 'expiring' && (
                  <ExclamationCircleIcon className="h-5 w-5 text-yellow-500 mt-0.5 mr-2" />
                )}
                {alert.type === 'inactive' && (
                  <XMarkIcon className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
                )}
                {alert.type === 'upgrade' && (
                  <ArrowUpCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                )}
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{alert.title}</h4>
                  <ul className="mt-1 space-y-1">
                    {alert.members.map((member, idx) => (
                      <li key={idx} className="text-sm text-gray-500">{member}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Membership Modal */}
      <Transition.Root show={showNewMembershipModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setShowNewMembershipModal}>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Dialog.Panel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    onClick={() => setShowNewMembershipModal(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                      New Membership
                    </Dialog.Title>

                    <div className="mt-6 space-y-6">
                      {/* Player Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Player
                        </label>
                        <input
                          type="text"
                          value={selectedPlayer}
                          onChange={(e) => setSelectedPlayer(e.target.value)}
                          placeholder="Search player..."
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      {/* Membership Plan */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Membership Plan
                        </label>
                        <Listbox value={selectedPlan} onChange={setSelectedPlan}>
                          <div className="relative mt-1">
                            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                              <span className="block truncate">{selectedPlan.name}</span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                              </span>
                            </Listbox.Button>
                            <Transition
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {membershipPlans.map((plan) => (
                                  <Listbox.Option
                                    key={plan.id}
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 pl-3 pr-9 ${
                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                      }`
                                    }
                                    value={plan}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                                          {plan.name} - ${plan.price}/month
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

                      {/* Start Date */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Start Date
                        </label>
                        <DatePicker
                          selected={startDate}
                          onChange={(date: Date) => setStartDate(date)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      {/* End Date (Calculated) */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          End Date
                        </label>
                        <input
                          type="text"
                          value={calculateEndDate(startDate, selectedPlan.duration)}
                          disabled
                          className="block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm sm:text-sm"
                        />
                      </div>

                      {/* Sessions (if applicable) */}
                      {selectedPlan.sessions !== 'Unlimited' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Sessions
                          </label>
                          <input
                            type="text"
                            value={selectedPlan.sessions}
                            disabled
                            className="block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm sm:text-sm"
                          />
                        </div>
                      )}

                      {/* Discount */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Discount (%)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={discount}
                          onChange={(e) => setDiscount(Number(e.target.value))}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      {/* Final Price */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Final Price
                        </label>
                        <input
                          type="text"
                          value={`$${calculateFinalPrice()}`}
                          disabled
                          className="block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm sm:text-sm"
                        />
                      </div>

                      {/* Payment Collected */}
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={paymentCollected}
                          onChange={(e) => setPaymentCollected(e.target.checked)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label className="ml-2 block text-sm text-gray-900">
                          Payment Collected
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowNewMembershipModal(false)}
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      // Handle membership creation
                      setShowNewMembershipModal(false);
                    }}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                  >
                    Create Membership
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
} 