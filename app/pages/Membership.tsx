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
  CurrencyDollarIcon,
  BanknotesIcon,
  ClockIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Pie } from 'react-chartjs-2';

const viewOptions = [
  { id: 'members', name: 'Members' },
  { id: 'payments', name: 'Payments' },
];

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
  // Add 8 more mock members...
];

const mockPayments = [
  {
    id: 'INV-001',
    player: 'John Doe',
    date: '2024-03-01',
    amount: 199,
    status: 'Paid',
    paymentMode: 'Card',
  },
  {
    id: 'INV-002',
    player: 'Jane Smith',
    date: '2024-03-05',
    amount: 99,
    status: 'Pending',
    paymentMode: 'UPI',
  },
  // Add 8 more mock payments...
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

const paymentModeData = {
  labels: ['Card', 'UPI', 'Cash', 'Cheque'],
  datasets: [
    {
      data: [40, 30, 20, 10],
      backgroundColor: [
        'rgba(99, 102, 241, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(107, 114, 128, 0.8)',
      ],
    },
  ],
};

export default function Membership() {
  const [selectedView, setSelectedView] = useState(viewOptions[0]);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedSport, setSelectedSport] = useState('All Sports');
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Expiring Soon':
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Expired':
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Membership Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage memberships, payments, and track revenue.
          </p>
        </div>
      </div>

      {/* View Selector and Stats */}
      <div className="mt-6 grid grid-cols-1 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
            <div>
              <Listbox value={selectedView} onChange={setSelectedView}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                    <span className="block truncate">{selectedView.name}</span>
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
                      {viewOptions.map((option) => (
                        <Listbox.Option
                          key={option.id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-3 pr-9 ${
                              active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                            }`
                          }
                          value={option}
                        >
                          {({ selected, active }) => (
                            <>
                              <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                                {option.name}
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

            {selectedView.id === 'members' ? (
              <>
                <div>
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
              </>
            ) : (
              <>
                <div>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option>All</option>
                    <option>Paid</option>
                    <option>Pending</option>
                    <option>Overdue</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <div className="flex gap-2">
                    <DatePicker
                      selected={dateRange[0]}
                      onChange={(date) => setDateRange([date, dateRange[1]])}
                      placeholderText="Start Date"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <DatePicker
                      selected={dateRange[1]}
                      onChange={(date) => setDateRange([dateRange[0], date])}
                      placeholderText="End Date"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Members</p>
                  <p className="text-2xl font-bold text-gray-900">428</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-2">
                  <UserIcon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">$45,200</p>
                </div>
                <div className="bg-green-50 rounded-lg p-2">
                  <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active Plans</p>
                  <p className="text-2xl font-bold text-gray-900">385</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-2">
                  <CheckIcon className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pending Payments</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <div className="bg-amber-50 rounded-lg p-2">
                  <ClockIcon className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {selectedView.id === 'members' ? 'Members' : 'Payments'}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {selectedView.id === 'members' ? 'Manage member status and subscriptions' : 'Track payments and invoices'}
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {selectedView.id === 'members' ? 'Add New Member' : 'Generate Invoice'}
            </button>
          </div>

          <div className="overflow-x-auto">
            {selectedView.id === 'members' ? (
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
                  {mockMembers.slice(0, 10).map((member) => (
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
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Mode</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockPayments.slice(0, 10).map((payment) => (
                    <tr key={payment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.player}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${payment.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.paymentMode}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">Send</button>
                        {payment.status === 'Pending' && (
                          <button className="text-green-600 hover:text-green-900">Mark Paid</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Alerts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

          {selectedView.id === 'payments' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Mode Breakdown</h3>
              <div className="h-64">
                <Pie
                  data={paymentModeData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                    },
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 