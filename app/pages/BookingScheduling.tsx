'use client';

import { useState, useEffect } from 'react';
import {
  CalendarIcon,
  UserIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  ExclamationCircleIcon,
  PlusCircleIcon,
  DocumentPlusIcon,
  ArrowPathIcon,
  XMarkIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  ChevronDownIcon,
  BoltIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/24/outline';
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const COURTS = Array.from({ length: 8 }, (_, i) => `Court ${i + 1}`);
const TIMES = Array.from({ length: 16 }, (_, i) => `${6 + i}:00 ${6 + i < 12 ? 'AM' : 'PM'}`);
const SESSION_TYPES = [
  { label: 'Personal', value: 'personal' },
  { label: 'Coached', value: 'coached' },
];
const SLOT_COLORS: { [key: string]: string } = {
  booked: 'bg-blue-100 text-blue-900 hover:bg-blue-200',
  tentative: 'bg-amber-50 text-amber-900 hover:bg-amber-100',
  available: 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100',
  blocked: 'bg-red-50 text-red-900',
};

// Enhanced mock data
const mockBookings = [
  { id: 1, court: 'Court 1', time: '7:00 AM', player: 'John Doe', coach: 'Coach Mike', sessionType: 'Coached', status: 'booked', amount: 200 },
  { id: 2, court: 'Court 2', time: '8:00 AM', player: 'Jane Smith', coach: 'Coach Sarah', sessionType: 'Personal', status: 'tentative', amount: 300 },
  { id: 3, court: 'Court 3', time: '9:00 AM', player: 'Mike Johnson', coach: 'Coach John', sessionType: 'Coached', status: 'booked', amount: 500 },
  { id: 4, court: 'Court 4', time: '10:00 AM', player: '', coach: '', sessionType: '', status: 'blocked', amount: 0 },
  { id: 5, court: 'Court 5', time: '11:00 AM', player: 'Emily Brown', coach: 'Coach Mike', sessionType: 'Coached', status: 'booked', amount: 250 },
  { id: 6, court: 'Court 1', time: '2:00 PM', player: 'Alex Wong', coach: '', sessionType: 'Personal', status: 'booked', amount: 150 },
  { id: 7, court: 'Court 3', time: '3:00 PM', player: 'Sarah Lee', coach: 'Coach John', sessionType: 'Coached', status: 'booked', amount: 300 },
  { id: 8, court: 'Court 2', time: '4:00 PM', player: 'Tom Wilson', coach: 'Coach Sarah', sessionType: 'Coached', status: 'tentative', amount: 200 },
  { id: 9, court: 'Court 4', time: '5:00 PM', player: 'Lisa Chen', coach: '', sessionType: 'Personal', status: 'booked', amount: 150 },
  { id: 10, court: 'Court 5', time: '6:00 PM', player: 'David Kim', coach: 'Coach Mike', sessionType: 'Coached', status: 'booked', amount: 250 },
];
const mockPlayers = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Emily Brown'];
const mockCoaches = ['Coach Mike', 'Coach Sarah', 'Coach John'];
const mockRevenue = {
  mtd: 12450,
  ytd: 84500,
  daily: [200, 300, 500, 400, 600, 700, 800],
  weekly: [1200, 1500, 1800, 2000, 1700, 1600, 2100],
  monthlyTrend: [
    { month: 'Jan', revenue: 8500, growth: 15 },
    { month: 'Feb', revenue: 9200, growth: 8 },
    { month: 'Mar', revenue: 10500, growth: 14 },
    { month: 'Apr', revenue: 11200, growth: 7 },
    { month: 'May', revenue: 12450, growth: 11 }
  ],
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
};
const mockUtilization = 82;
const mockCancelled = [
  { player: 'Jane Smith', court: 'Court 2', time: '8:00 AM', reason: 'Rescheduled' },
  { player: 'Mike Johnson', court: 'Court 3', time: '9:00 AM', reason: 'Cancelled' },
];
const mockAlerts = [
  { type: 'double', message: 'Double booking detected for Coach Mike at 7:00 AM', level: 'high' },
  { type: 'payment', message: 'Payment not collected for Jane Smith', level: 'medium' },
  { type: 'maintenance', message: 'Court 4 blocked for maintenance', level: 'info' },
];

// Add new type definitions
type PriceOptimization = {
  timeSlot: string;
  currentPrice: number;
  suggestedPrice: number;
  demand: string;
  utilization: number;
  competitorPrice: number;
};

type PromoSlot = {
  timeSlot: string;
  currentPrice: number;
  promoPrice: number;
  averageUtilization: number;
  potentialRevenue: number;
};

type InsightAction = {
  id: number;
  type: 'revenue' | 'utilization' | 'coaching';
  title: string;
  message: string;
  action: string;
  impact: string;
  priority: 'high' | 'medium' | 'low';
  data?: PriceOptimization[] | PromoSlot[];
};

// Update mock insights with early bird promo data
const mockInsights: InsightAction[] = [
  {
    id: 1,
    type: 'revenue',
    title: 'Revenue Opportunity',
    message: 'Peak hour bookings (4-7 PM) have 30% higher revenue potential',
    action: 'Optimize Pricing',
    impact: '+$2,500/month',
    priority: 'high',
    data: [
      {
        timeSlot: '4:00 PM',
        currentPrice: 200,
        suggestedPrice: 250,
        demand: 'High',
        utilization: 95,
        competitorPrice: 240
      },
      {
        timeSlot: '5:00 PM',
        currentPrice: 200,
        suggestedPrice: 260,
        demand: 'Very High',
        utilization: 98,
        competitorPrice: 250
      },
      {
        timeSlot: '6:00 PM',
        currentPrice: 200,
        suggestedPrice: 255,
        demand: 'High',
        utilization: 92,
        competitorPrice: 245
      },
      {
        timeSlot: '7:00 PM',
        currentPrice: 200,
        suggestedPrice: 240,
        demand: 'Medium-High',
        utilization: 85,
        competitorPrice: 235
      }
    ]
  },
  {
    id: 2,
    type: 'utilization',
    title: 'Court Utilization Gap',
    message: 'Courts 3 & 4 are underutilized during morning hours (6-9 AM)',
    action: 'Run Early Bird Promo',
    impact: '+15% utilization',
    priority: 'medium',
    data: [
      {
        timeSlot: '6:00 AM',
        currentPrice: 150,
        promoPrice: 100,
        averageUtilization: 35,
        potentialRevenue: 400
      },
      {
        timeSlot: '7:00 AM',
        currentPrice: 150,
        promoPrice: 110,
        averageUtilization: 45,
        potentialRevenue: 550
      },
      {
        timeSlot: '8:00 AM',
        currentPrice: 180,
        promoPrice: 130,
        averageUtilization: 55,
        potentialRevenue: 650
      },
      {
        timeSlot: '9:00 AM',
        currentPrice: 180,
        promoPrice: 140,
        averageUtilization: 60,
        potentialRevenue: 700
      }
    ]
  },
  {
    id: 3,
    type: 'coaching',
    title: 'Coach Availability',
    message: 'Coach Mike is fully booked for next week',
    action: 'Adjust Schedule',
    impact: '8 pending requests',
    priority: 'high'
  }
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

// Dropdown Component
function Dropdown({ value, onChange, options, placeholder = 'Select...' }: any) {
  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2.5 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
            <span className="block truncate">{value?.label || placeholder}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option: any) => (
                <Listbox.Option
                  key={option.value}
                  className={({ active }) =>
                    classNames(
                      active ? 'text-white bg-indigo-600' : 'text-gray-900',
                      'relative cursor-default select-none py-2 pl-3 pr-9'
                    )
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                      {option.label}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  )
}

export default function BookingScheduling() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('day');
  const [filterCoach, setFilterCoach] = useState('');
  const [filterCourt, setFilterCourt] = useState('');
  const [filterSession, setFilterSession] = useState('');
  const [modal, setModal] = useState<{ court: string; time: string } | null>(null);
  const [form, setForm] = useState({
    court: '',
    player: '',
    sessionType: '',
    coach: '',
    start: '',
    end: '',
    recurring: '',
    fee: '',
    notes: '',
  });
  const [selectedSessionType, setSelectedSessionType] = useState(SESSION_TYPES[0]);
  const [selectedCoach, setSelectedCoach] = useState({ value: '', label: 'All Coaches' });
  const [selectedCourt, setSelectedCourt] = useState({ value: '', label: 'All Courts' });
  const [selectedInsight, setSelectedInsight] = useState<InsightAction | null>(null);
  const [showPriceOptimization, setShowPriceOptimization] = useState(false);
  const [showEarlyBirdPromo, setShowEarlyBirdPromo] = useState(false);
  const [editablePrices, setEditablePrices] = useState<{ [key: string]: number }>({});
  const [editablePromoPrice, setEditablePromoPrice] = useState<{ [key: string]: number }>({});

  // Format date for display
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }).format(selectedDate);

  // Initialize editable prices when modal opens
  useEffect(() => {
    if (selectedInsight?.type === 'revenue' && selectedInsight.data) {
      const priceData = selectedInsight.data as PriceOptimization[];
      const prices = priceData.reduce((acc, slot) => ({
        ...acc,
        [slot.timeSlot]: slot.suggestedPrice
      }), {});
      setEditablePrices(prices);
    } else if (selectedInsight?.type === 'utilization' && selectedInsight.data) {
      const promoData = selectedInsight.data as PromoSlot[];
      const prices = promoData.reduce((acc, slot) => ({
        ...acc,
        [slot.timeSlot]: slot.promoPrice
      }), {});
      setEditablePromoPrice(prices);
    }
  }, [selectedInsight]);

  // Filtered bookings for the grid
  const bookings = mockBookings.filter(b =>
    (!filterCoach || b.coach === filterCoach) &&
    (!filterCourt || b.court === filterCourt) &&
    (!filterSession || b.sessionType === filterSession)
  );

  // Format coaches for dropdown
  const coachOptions = [
    { value: '', label: 'All Coaches' },
    ...mockCoaches.map(coach => ({ value: coach, label: coach }))
  ];

  // Format courts for dropdown
  const courtOptions = [
    { value: '', label: 'All Courts' },
    ...COURTS.map(court => ({ value: court, label: court }))
  ];

  // Booking modal open handler
  function openModal(court: string, time: string) {
    const slot = bookings.find(b => b.court === court && b.time === time);
    setForm({
      court,
      player: slot?.player || '',
      coach: slot?.coach || '',
      sessionType: slot?.sessionType || '',
      start: time,
      end: '',
      recurring: '',
      fee: slot?.amount?.toString() || '',
      notes: '',
    });
    setModal({ court, time });
  }

  // Booking modal close handler
  function closeModal() {
    setModal(null);
    setForm({ court: '', player: '', coach: '', sessionType: '', start: '', end: '', recurring: '', fee: '', notes: '' });
  }

  // Booking modal confirm handler (mock)
  function confirmBooking() {
    closeModal();
    // Add logic to save booking
  }

  // Handle insight click
  const handleInsightClick = (insight: InsightAction) => {
    setSelectedInsight(insight);
    if (insight.type === 'revenue') {
      setShowPriceOptimization(true);
    } else if (insight.type === 'utilization') {
      setShowEarlyBirdPromo(true);
    }
    // Handle other insight types as needed
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Date Selection and Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-center">
        <div className="relative">
          <div 
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-left shadow-sm cursor-pointer hover:bg-gray-50 h-[42px] flex items-center"
            onClick={() => {
              const picker = document.getElementById('date-picker') as HTMLInputElement;
              picker?.showPicker();
            }}
          >
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-gray-400" />
              <div className="text-sm font-medium text-gray-900">{formattedDate}</div>
            </div>
          </div>
          <input 
            id="date-picker"
            type="date" 
            value={selectedDate.toISOString().split('T')[0]} 
            onChange={e => setSelectedDate(new Date(e.target.value))}
            className="absolute inset-0 opacity-0 cursor-pointer" 
          />
        </div>
        <Dropdown
          value={selectedCoach}
          onChange={setSelectedCoach}
          options={coachOptions}
          placeholder="Select Coach"
        />
        <Dropdown
          value={selectedCourt}
          onChange={setSelectedCourt}
          options={courtOptions}
          placeholder="Select Court"
        />
        <Dropdown
          value={selectedSessionType}
          onChange={setSelectedSessionType}
          options={SESSION_TYPES}
          placeholder="Select Session Type"
        />
        <button className="h-[42px] inline-flex items-center justify-center gap-2 px-4 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
          <DocumentPlusIcon className="h-5 w-5" /> Generate Report
        </button>
        <button 
          onClick={() => openModal('', '')}
          className="h-[42px] inline-flex items-center justify-center gap-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusCircleIcon className="h-5 w-5" /> New Booking
        </button>
      </div>

      {/* Revenue & Insights Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Stats */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Revenue Overview</h3>
          <div className="space-y-6">
            {/* Current Month Stats */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-900">${mockRevenue.mtd.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-1">Current Month</p>
              </div>
              <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full">
                <ArrowTrendingUpIcon className="h-5 w-5" />
                <span className="font-medium">+12%</span>
              </div>
            </div>

            {/* Monthly Breakdown */}
            <div className="space-y-3">
              {mockRevenue.monthlyTrend.slice(-3).reverse().map((month, index) => (
                <div key={month.month} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-indigo-600' : 'bg-gray-300'}`} />
                    <span className="text-sm text-gray-600">{month.month}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">${month.revenue.toLocaleString()}</span>
                    <div className={`flex items-center gap-1 text-xs ${
                      month.growth > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {month.growth > 0 ? (
                        <ArrowTrendingUpIcon className="h-4 w-4" />
                      ) : (
                        <ArrowTrendingDownIcon className="h-4 w-4" />
                      )}
                      {Math.abs(month.growth)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <p className="text-sm text-gray-500">Avg. Booking Value</p>
                <p className="text-xl font-semibold text-gray-900 mt-1">$275</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <ArrowTrendingUpIcon className="h-3 w-3" />
                  +5% vs last month
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Bookings</p>
                <p className="text-xl font-semibold text-gray-900 mt-1">432</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <ArrowTrendingUpIcon className="h-3 w-3" />
                  +8% vs last month
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t">
              <div className="text-center p-2 bg-gray-50 rounded">
                <p className="text-2xl font-bold text-indigo-600">85%</p>
                <p className="text-xs text-gray-500 mt-1">Court Utilization</p>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <p className="text-2xl font-bold text-indigo-600">92%</p>
                <p className="text-xs text-gray-500 mt-1">Collection Rate</p>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <p className="text-2xl font-bold text-indigo-600">4.8</p>
                <p className="text-xs text-gray-500 mt-1">Satisfaction</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">AI Insights</h3>
          <div className="space-y-4">
            {mockInsights.map((insight) => (
              <div 
                key={insight.id} 
                className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleInsightClick(insight)}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 flex items-center">
                        <BoltIcon className="h-4 w-4 text-amber-500 mr-1" />
                        {insight.title}
                      </h4>
                      <p className="mt-1 text-sm text-gray-500">{insight.message}</p>
                    </div>
                    <div className={`h-2 w-2 rounded-full ${
                      insight.priority === 'high' ? 'bg-red-500' : 'bg-amber-500'
                    }`} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      insight.impact.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {insight.impact}
                    </span>
                    <button
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500 whitespace-nowrap"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInsightClick(insight);
                      }}
                    >
                      {insight.action}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Bookings</h3>
          <div className="space-y-3">
            {mockBookings.slice(0, 5).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-900">{booking.player}</p>
                  <p className="text-xs text-gray-500">
                    {booking.court} • {booking.time} • {booking.sessionType}
                  </p>
                </div>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  booking.status === 'booked' ? 'bg-green-100 text-green-800' :
                  booking.status === 'tentative' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Court Grid - Desktop */}
      <div className="hidden md:block">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h3 className="text-lg font-medium text-gray-900">Court Schedule</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="sticky left-0 z-10 bg-gray-50 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Time</th>
                  {COURTS.map(court => (
                    <th key={court} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      {court}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {TIMES.map(time => (
                  <tr key={time} className="hover:bg-gray-50">
                    <td className="sticky left-0 z-10 bg-white whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                      {time}
                    </td>
                    {COURTS.map(court => {
                      const slot = bookings.find(b => b.court === court && b.time === time);
                      const status = slot?.status || 'available';
                      return (
                        <td
                          key={court + time}
                          onClick={() => openModal(court, time)}
                          className={`relative px-3 py-4 ${SLOT_COLORS[status]} cursor-pointer transition-colors`}
                        >
                          {slot ? (
                            <div className="space-y-1">
                              <div className="font-medium">{slot.player}</div>
                              <div className="text-xs opacity-75 space-y-0.5">
                                <div>{slot.coach}</div>
                                <div className="flex items-center justify-between">
                                  <span>{slot.sessionType}</span>
                                  <span className="font-medium">${slot.amount}</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="text-sm opacity-40">Available</div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {modal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Book Court</h3>
            </div>
            <div className="px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Court</label>
                    <select 
                      value={form.court} 
                      onChange={e => setForm(f => ({ ...f, court: e.target.value }))}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="">Select court</option>
                      {COURTS.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Player Name</label>
                    <input
                      type="text"
                      value={form.player}
                      onChange={e => setForm(f => ({ ...f, player: e.target.value }))}
                      placeholder="Enter player name"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Session Type</label>
                    <select 
                      value={form.sessionType} 
                      onChange={e => {
                        const newType = e.target.value;
                        setForm(f => ({ 
                          ...f, 
                          sessionType: newType,
                          coach: newType === 'personal' ? '' : f.coach 
                        }));
                      }}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="">Select type</option>
                      {SESSION_TYPES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </div>
                  {form.sessionType === 'coached' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Coach</label>
                      <select 
                        value={form.coach} 
                        onChange={e => setForm(f => ({ ...f, coach: e.target.value }))}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        <option value="">Select coach</option>
                        {mockCoaches.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  )}
                </div>
                {/* Right Column */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                      <select 
                        value={form.start} 
                        onChange={e => setForm(f => ({ ...f, start: e.target.value }))}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        <option value="">Select time</option>
                        {TIMES.map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                      <select 
                        value={form.end} 
                        onChange={e => setForm(f => ({ ...f, end: e.target.value }))}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        <option value="">Select time</option>
                        {TIMES.map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Recurring</label>
                    <select 
                      value={form.recurring} 
                      onChange={e => setForm(f => ({ ...f, recurring: e.target.value }))}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="">No recurring</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fee</label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        value={form.fee}
                        onChange={e => setForm(f => ({ ...f, fee: e.target.value }))}
                        className="w-full rounded-md border-gray-300 pl-7 focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea 
                      value={form.notes} 
                      onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                      rows={3}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Add any special requirements or notes..."
                    />
                  </div>
                </div>
              </div>
              {/* Summary Section */}
              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Booking Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Duration</p>
                    <p className="font-medium">{form.start && form.end ? `${form.start} - ${form.end}` : 'Not selected'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Total Fee</p>
                    <p className="font-medium">{form.fee ? `$${form.fee}` : '$0.00'}</p>
                  </div>
                  {form.recurring && (
                    <div className="col-span-2">
                      <p className="text-gray-500">Recurring Schedule</p>
                      <p className="font-medium capitalize">{form.recurring}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmBooking}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Confirm & Pay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Price Optimization Modal */}
      {showPriceOptimization && selectedInsight?.type === 'revenue' && selectedInsight.data && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Peak Hours Pricing Optimization</h3>
              <button 
                onClick={() => setShowPriceOptimization(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                  <h4 className="text-sm font-medium text-amber-800 flex items-center gap-2">
                    <BoltIcon className="h-4 w-4" />
                    Optimization Insights
                  </h4>
                  <p className="mt-1 text-sm text-amber-700">
                    Based on historical booking patterns, competitor pricing, and demand analysis, 
                    we recommend the following price adjustments for peak hours.
                  </p>
                </div>

                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Time Slot</th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Current Price</th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Suggested Price</th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">New Price</th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Demand</th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Utilization</th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Competitor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {(selectedInsight.data as PriceOptimization[]).map((slot) => (
                        <tr key={slot.timeSlot}>
                          <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{slot.timeSlot}</td>
                          <td className="px-3 py-4 text-sm text-gray-500">${slot.currentPrice}</td>
                          <td className="px-3 py-4 text-sm text-gray-500">${slot.suggestedPrice}</td>
                          <td className="px-3 py-4">
                            <div className="relative rounded-md shadow-sm w-24">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                                <span className="text-gray-500 sm:text-sm">$</span>
                              </div>
                              <input
                                type="number"
                                value={editablePrices[slot.timeSlot] || slot.suggestedPrice}
                                onChange={(e) => setEditablePrices({
                                  ...editablePrices,
                                  [slot.timeSlot]: Number(e.target.value)
                                })}
                                className="block w-full rounded-md border-0 py-1.5 pl-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </td>
                          <td className="px-3 py-4">
                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                              slot.demand.includes('High') ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {slot.demand}
                            </span>
                          </td>
                          <td className="px-3 py-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-indigo-600 h-2 rounded-full" 
                                style={{ width: `${slot.utilization}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-500 mt-1">{slot.utilization}%</span>
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500">${slot.competitorPrice}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-gray-50 rounded-md p-4">
                  <h4 className="text-sm font-medium text-gray-900">Implementation Strategy</h4>
                  <ul className="mt-2 space-y-2 text-sm text-gray-600">
                    <li>• Gradually increase prices over 2 weeks to minimize impact on regular customers</li>
                    <li>• Offer loyalty discounts to frequent peak-hour bookers</li>
                    <li>• Monitor booking patterns and adjust if utilization drops below 85%</li>
                    <li>• Communicate changes to customers with 1-week notice</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                * Changes will be effective from tomorrow
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPriceOptimization(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle price update implementation with editablePrices
                    setShowPriceOptimization(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Apply New Pricing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Early Bird Promo Modal */}
      {showEarlyBirdPromo && selectedInsight?.type === 'utilization' && selectedInsight.data && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Early Bird Promotion</h3>
              <button 
                onClick={() => setShowEarlyBirdPromo(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <h4 className="text-sm font-medium text-blue-800 flex items-center gap-2">
                    <BoltIcon className="h-4 w-4" />
                    Morning Slot Optimization
                  </h4>
                  <p className="mt-1 text-sm text-blue-700">
                    Increase morning court utilization with targeted promotions. 
                    Current morning utilization is below 60%, presenting an opportunity 
                    to attract early players with special rates.
                  </p>
                </div>

                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Time Slot</th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Current Price</th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Suggested Price</th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">New Price</th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Current Utilization</th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Potential Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {(selectedInsight.data as PromoSlot[]).map((slot) => (
                        <tr key={slot.timeSlot}>
                          <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{slot.timeSlot}</td>
                          <td className="px-3 py-4 text-sm text-gray-500">${slot.currentPrice}</td>
                          <td className="px-3 py-4 text-sm font-medium text-green-600">${slot.promoPrice}</td>
                          <td className="px-3 py-4">
                            <div className="relative rounded-md shadow-sm w-24">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                                <span className="text-gray-500 sm:text-sm">$</span>
                              </div>
                              <input
                                type="number"
                                value={editablePromoPrice[slot.timeSlot] || slot.promoPrice}
                                onChange={(e) => setEditablePromoPrice({
                                  ...editablePromoPrice,
                                  [slot.timeSlot]: Number(e.target.value)
                                })}
                                className="block w-full rounded-md border-0 py-1.5 pl-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </td>
                          <td className="px-3 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${slot.averageUtilization}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-500">{slot.averageUtilization}%</span>
                            </div>
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500">+${slot.potentialRevenue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-gray-50 rounded-md p-4 space-y-3">
                  <h4 className="text-sm font-medium text-gray-900">Promotion Strategy</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Launch "Early Bird Special" - Up to 30% off for 6-9 AM slots</li>
                    <li>• Target fitness enthusiasts and pre-work players</li>
                    <li>• Bundle with complimentary coffee or breakfast items</li>
                    <li>• Offer additional discount for bulk bookings (4+ sessions)</li>
                  </ul>
                  <div className="pt-2">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Marketing Channels</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-white p-3 rounded border text-center">
                        <p className="text-sm font-medium text-gray-900">Email</p>
                        <p className="text-xs text-gray-500">2,500 subscribers</p>
                      </div>
                      <div className="bg-white p-3 rounded border text-center">
                        <p className="text-sm font-medium text-gray-900">SMS</p>
                        <p className="text-xs text-gray-500">1,800 opt-ins</p>
                      </div>
                      <div className="bg-white p-3 rounded border text-center">
                        <p className="text-sm font-medium text-gray-900">Social</p>
                        <p className="text-xs text-gray-500">5,000+ followers</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                * Promotion valid for next 30 days
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowEarlyBirdPromo(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle promo implementation with editablePromoPrice
                    setShowEarlyBirdPromo(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Launch Promotion
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 