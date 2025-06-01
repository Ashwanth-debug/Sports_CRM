'use client';

import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  CurrencyDollarIcon,
  DocumentTextIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ClockIcon,
  ChartPieIcon,
  BanknotesIcon,
  CreditCardIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Pie } from 'react-chartjs-2';

// Mock Data
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
  {
    id: 'INV-003',
    player: 'Mike Johnson',
    date: '2024-02-28',
    amount: 299,
    status: 'Overdue',
    paymentMode: 'Cash',
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

const paymentAlerts = [
  {
    type: 'overdue',
    title: 'Overdue Payments (7+ days)',
    items: ['INV-003 - Mike Johnson ($299)', 'INV-004 - Sarah Wilson ($199)'],
  },
  {
    type: 'manual',
    title: 'Manual Payments Collected',
    items: ['Cash payment from David Lee ($150)', 'Cheque from Emma Brown ($299)'],
  },
  {
    type: 'unpaid',
    title: 'Multiple Unpaid Bookings',
    items: ['Tom White - 3 unpaid sessions', 'Lisa Chen - 2 unpaid sessions'],
  },
];

export default function PaymentManagementTab() {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [searchPlayer, setSearchPlayer] = useState('');
  
  // Invoice Form State
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [invoiceType, setInvoiceType] = useState('Membership');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(new Date());
  const [paymentMode, setPaymentMode] = useState('Card');
  const [notes, setNotes] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Revenue Snapshot */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">MTD Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$12,450</p>
            </div>
            <div className="bg-indigo-50 rounded-lg p-2">
              <CurrencyDollarIcon className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-green-600">
            <span>+15% vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">YTD Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$145,800</p>
            </div>
            <div className="bg-green-50 rounded-lg p-2">
              <BanknotesIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-green-600">
            <span>+22% vs last year</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Outstanding</p>
              <p className="text-2xl font-bold text-gray-900">$3,850</p>
            </div>
            <div className="bg-red-50 rounded-lg p-2">
              <ClockIcon className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-red-600">
            <span>8 pending invoices</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Refunds</p>
              <p className="text-2xl font-bold text-gray-900">$450</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <CreditCardIcon className="h-6 w-6 text-gray-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-600">
            <span>2 refunds this month</span>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Player Name</label>
            <input
              type="text"
              value={searchPlayer}
              onChange={(e) => setSearchPlayer(e.target.value)}
              placeholder="Search player..."
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setShowInvoiceModal(true)}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Generate Invoice
            </button>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
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
              {mockPayments.map((payment) => (
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
        </div>
      </div>

      {/* Analytics and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Mode Breakdown */}
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

        {/* Payment Alerts */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Alerts</h3>
          <div className="space-y-4">
            {paymentAlerts.map((alert, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start">
                  {alert.type === 'overdue' && (
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
                  )}
                  {alert.type === 'manual' && (
                    <CurrencyDollarIcon className="h-5 w-5 text-yellow-500 mt-0.5 mr-2" />
                  )}
                  {alert.type === 'unpaid' && (
                    <ClockIcon className="h-5 w-5 text-orange-500 mt-0.5 mr-2" />
                  )}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{alert.title}</h4>
                    <ul className="mt-1 space-y-1">
                      {alert.items.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-500">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Invoice Modal */}
      <Transition.Root show={showInvoiceModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setShowInvoiceModal}>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Dialog.Panel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    onClick={() => setShowInvoiceModal(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                      Generate Invoice
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

                      {/* Invoice Type */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Invoice For
                        </label>
                        <select
                          value={invoiceType}
                          onChange={(e) => setInvoiceType(e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option>Membership</option>
                          <option>Court Booking</option>
                          <option>Product</option>
                          <option>Other</option>
                        </select>
                      </div>

                      {/* Amount */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Amount
                        </label>
                        <div className="relative rounded-md shadow-sm">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="block w-full rounded-md border-gray-300 pl-7 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="0.00"
                          />
                        </div>
                      </div>

                      {/* Due Date */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Due Date
                        </label>
                        <DatePicker
                          selected={dueDate}
                          onChange={(date) => setDueDate(date)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      {/* Payment Mode */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Payment Mode
                        </label>
                        <select
                          value={paymentMode}
                          onChange={(e) => setPaymentMode(e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option>Card</option>
                          <option>UPI</option>
                          <option>Cash</option>
                          <option>Cheque</option>
                        </select>
                      </div>

                      {/* Notes */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Notes
                        </label>
                        <textarea
                          rows={3}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowInvoiceModal(false)}
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      // Handle invoice generation
                      setShowInvoiceModal(false);
                    }}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                  >
                    Generate PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      // Handle invoice sending
                      setShowInvoiceModal(false);
                    }}
                    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
                  >
                    Send Invoice
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