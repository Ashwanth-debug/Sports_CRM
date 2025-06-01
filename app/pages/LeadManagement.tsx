'use client';

import { useState } from 'react';
import { 
  UserIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  ChartBarIcon,
  UserGroupIcon,
  ClockIcon,
  SparklesIcon,
  TableCellsIcon,
  Squares2X2Icon,
  PlusIcon,
  FunnelIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  PencilIcon,
  BoltIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AddLeadForm from '../components/AddLeadForm';
import AIChatAssistant from '../components/AIChatAssistant';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const kpiData = [
  {
    title: 'Total Leads This Month',
    value: '145',
    change: '+12.5%',
  },
  {
    title: 'Qualified Leads',
    value: '64',
    change: '+5.3%',
  },
  {
    title: 'Follow-Ups Pending',
    value: '28',
    change: '-2.1%',
  },
  {
    title: 'AI Priority Leads',
    value: '15',
    change: 'New',
  }
];

const leads = [
  {
    id: 1,
    name: 'John Doe',
    age: 15,
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    sport: 'Tennis',
    source: 'Website',
    status: 'New',
    followUpDate: '2024-03-15',
    assignedTo: 'Coach Mike',
    lastContact: '2024-03-10',
  },
  {
    id: 2,
    name: 'Jane Smith',
    age: 16,
    email: 'jane.smith@example.com',
    phone: '+1 234 567 8901',
    sport: 'Swimming',
    source: 'WhatsApp',
    status: 'In Progress',
    followUpDate: '2024-03-16',
    assignedTo: 'Coach Sarah',
    lastContact: '2024-03-09',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    age: 14,
    email: 'mike.johnson@example.com',
    phone: '+1 234 567 8902',
    sport: 'Basketball',
    source: 'Referral',
    status: 'Qualified',
    followUpDate: '2024-03-17',
    assignedTo: 'Coach John',
    lastContact: '2024-03-08',
  },
  {
    id: 4,
    name: 'Sarah Williams',
    age: 17,
    email: 'sarah.w@example.com',
    phone: '+1 234 567 8903',
    sport: 'Tennis',
    source: 'Website',
    status: 'New',
    followUpDate: '2024-03-18',
    assignedTo: 'Coach Mike',
    lastContact: '2024-03-11',
  },
  {
    id: 5,
    name: 'Tom Brown',
    age: 15,
    email: 'tom.b@example.com',
    phone: '+1 234 567 8904',
    sport: 'Swimming',
    source: 'Social Media',
    status: 'Converted',
    followUpDate: '2024-03-19',
    assignedTo: 'Coach Sarah',
    lastContact: '2024-03-12',
  },
  {
    id: 6,
    name: 'Emily Davis',
    age: 16,
    email: 'emily.d@example.com',
    phone: '+1 234 567 8905',
    sport: 'Basketball',
    source: 'Walk-in',
    status: 'In Progress',
    followUpDate: '2024-03-20',
    assignedTo: 'Coach John',
    lastContact: '2024-03-13',
  },
  {
    id: 7,
    name: 'Alex Turner',
    age: 14,
    email: 'alex.t@example.com',
    phone: '+1 234 567 8906',
    sport: 'Tennis',
    source: 'Referral',
    status: 'Qualified',
    followUpDate: '2024-03-21',
    assignedTo: 'Coach Mike',
    lastContact: '2024-03-14',
  },
  {
    id: 8,
    name: 'Lisa Anderson',
    age: 15,
    email: 'lisa.a@example.com',
    phone: '+1 234 567 8907',
    sport: 'Swimming',
    source: 'Website',
    status: 'New',
    followUpDate: '2024-03-22',
    assignedTo: 'Coach Sarah',
    lastContact: '2024-03-15',
  },
  {
    id: 9,
    name: 'David Wilson',
    age: 16,
    email: 'david.w@example.com',
    phone: '+1 234 567 8908',
    sport: 'Basketball',
    source: 'WhatsApp',
    status: 'Converted',
    followUpDate: '2024-03-23',
    assignedTo: 'Coach John',
    lastContact: '2024-03-16',
  },
  {
    id: 10,
    name: 'Sophie Clark',
    age: 17,
    email: 'sophie.c@example.com',
    phone: '+1 234 567 8909',
    sport: 'Tennis',
    source: 'Social Media',
    status: 'In Progress',
    followUpDate: '2024-03-24',
    assignedTo: 'Coach Mike',
    lastContact: '2024-03-17',
  }
];

const sportOptions = ['All Sports', 'Tennis', 'Badminton', 'Cricket', 'Swimming', 'Basketball'];
const sourceOptions = ['All Sources', 'Website', 'WhatsApp', 'Referral', 'Social Media', 'Walk-in'];
const statusOptions = ['All Status', 'New', 'Contacted', 'Qualified', 'Converted', 'Lost'];

// Analytics Data
const sourceDistribution = {
  labels: ['Website', 'WhatsApp', 'Referral', 'Social Media', 'Walk-in'],
  datasets: [
    {
      data: [35, 25, 20, 15, 5],
      backgroundColor: [
        'rgba(99, 102, 241, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(251, 146, 60, 0.8)',
        'rgba(147, 51, 234, 0.8)',
        'rgba(239, 68, 68, 0.8)',
      ],
    },
  ],
};

const conversionFunnel = {
  labels: ['Total Leads', 'Contacted', 'Qualified', 'Converted'],
  datasets: [
    {
      label: 'Leads',
      data: [100, 70, 45, 20],
      backgroundColor: 'rgba(99, 102, 241, 0.5)',
    },
  ],
};

const sportConversion = {
  labels: ['Tennis', 'Badminton', 'Cricket', 'Swimming', 'Basketball'],
  datasets: [
    {
      label: 'Conversion Rate %',
      data: [75, 68, 82, 71, 65],
      backgroundColor: 'rgba(99, 102, 241, 0.5)',
    },
  ],
};

const followUps = [
  {
    id: 1,
    leadName: 'John Doe',
    dueDate: '2024-03-15',
    status: 'overdue',
    type: 'Call',
    notes: 'Discuss training schedule',
  },
  {
    id: 2,
    leadName: 'Jane Smith',
    dueDate: '2024-03-16',
    status: 'upcoming',
    type: 'WhatsApp',
    notes: 'Send trial session details',
  },
  {
    id: 3,
    leadName: 'Mike Johnson',
    dueDate: '2024-03-17',
    status: 'upcoming',
    type: 'Email',
    notes: 'Share pricing information',
  },
];

type LeadInsight = {
  id: number;
  type: 'conversion' | 'engagement' | 'followup';
  title: string;
  message: string;
  action: string;
  impact: string;
  priority: 'high' | 'medium' | 'low';
  data?: any;
};

// Mock data for lead insights
const mockLeadInsights: LeadInsight[] = [
  {
    id: 1,
    type: 'conversion',
    title: 'High-Value Lead Opportunity',
    message: 'Corporate inquiry from Tech Corp showing interest in bulk court bookings',
    action: 'Schedule Call',
    impact: '+$15,000/month',
    priority: 'high',
    data: {
      companyName: 'Tech Corp',
      contactPerson: 'Sarah Miller',
      position: 'HR Director',
      requirement: '20 court hours/week',
      preferredTiming: 'Weekday mornings',
      potentialValue: 15000,
      lastContact: '2 days ago',
      nextSteps: [
        'Schedule follow-up call',
        'Prepare corporate package proposal',
        'Arrange facility tour'
      ]
    }
  },
  {
    id: 2,
    type: 'engagement',
    title: 'Lead Response Time Alert',
    message: '8 leads from website contact form awaiting first response (>4 hours)',
    action: 'Review Leads',
    impact: '85% conversion risk',
    priority: 'high',
    data: {
      pendingLeads: [
        { name: 'John Doe', source: 'Website Form', waitTime: '4.5 hours', interest: 'Personal Training' },
        { name: 'Emma Wilson', source: 'Website Form', waitTime: '5 hours', interest: 'Group Classes' },
        // ... more leads
      ]
    }
  },
  {
    id: 3,
    type: 'followup',
    title: 'Follow-up Optimization',
    message: 'Trial session leads have 40% higher conversion rate with same-day follow-up',
    action: 'Optimize Process',
    impact: '+25% conversion',
    priority: 'medium',
    data: {
      conversionRates: [
        { followupTime: 'Same day', rate: '65%' },
        { followupTime: 'Next day', rate: '45%' },
        { followupTime: '2-3 days', rate: '25%' },
        { followupTime: '>3 days', rate: '10%' }
      ],
      recommendedActions: [
        'Implement automated same-day follow-up emails',
        'Set up SMS reminders for sales team',
        'Create follow-up call schedule template'
      ]
    }
  }
];

export default function LeadManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('table');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [selectedSport, setSelectedSport] = useState('All Sports');
  const [selectedSource, setSelectedSource] = useState('All Sources');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  const [editingLead, setEditingLead] = useState<any>(null);
  const [selectedInsight, setSelectedInsight] = useState<LeadInsight | null>(null);
  const [showInsightModal, setShowInsightModal] = useState(false);

  const filteredLeads = leads.filter(lead =>
    (searchTerm === '' || 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm)
    ) &&
    (selectedSport === 'All Sports' || lead.sport === selectedSport) &&
    (selectedSource === 'All Sources' || lead.source === selectedSource) &&
    (selectedStatus === 'All Status' || lead.status === selectedStatus)
  );

  const handleEditLead = (lead: any) => {
    setEditingLead(lead);
    setIsAddLeadOpen(true);
  };

  const handleAddLead = (data: any) => {
    setIsAddLeadOpen(false);
    setEditingLead(null);
  };

  const handleKPIClick = (kpi: any) => {
    // Handle KPI card click - you can add specific actions here
    console.log('KPI clicked:', kpi);
  };

  // Handle insight click
  const handleInsightClick = (insight: LeadInsight) => {
    setSelectedInsight(insight);
    setShowInsightModal(true);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <button
            key={kpi.title}
            onClick={() => handleKPIClick(kpi)}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow hover:bg-gray-50 transition-colors text-left w-full"
          >
            <p className="truncate text-sm font-medium text-gray-500">
              {kpi.title}
            </p>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {kpi.value}
              </p>
              <p
                className={`ml-2 text-sm font-semibold ${
                  kpi.change === 'New' ? 'text-blue-600' :
                  kpi.change.startsWith('+') ? 'text-green-600' :
                  kpi.change.startsWith('-') ? 'text-red-600' :
                  'text-gray-500'
                }`}
              >
                {kpi.change}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search input */}
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search leads by name or contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-lg border-0 py-2 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 sm:text-sm"
            />
          </div>

          {/* Date Range Picker */}
          <div className="w-[200px]">
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => setDateRange(update)}
              placeholderText="Select date range"
              className="block w-full rounded-lg border-0 py-2 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm"
            />
          </div>

          {/* Dropdowns */}
          <div className="w-[150px] relative">
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="block w-full rounded-lg border-0 py-2 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm bg-white appearance-none"
            >
              {sportOptions.map(sport => (
                <option key={sport} value={sport}>{sport}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <div className="w-[150px] relative">
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="block w-full rounded-lg border-0 py-2 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm bg-white appearance-none"
            >
              {sourceOptions.map(source => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <div className="w-[150px] relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="block w-full rounded-lg border-0 py-2 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm bg-white appearance-none"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* View Toggle and Add Lead Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg ${viewMode === 'table' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
            >
              <TableCellsIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-2 rounded-lg ${viewMode === 'kanban' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
            >
              <Squares2X2Icon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsAddLeadOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
            >
              <PlusIcon className="h-5 w-5" />
              Add Lead
            </button>
          </div>
        </div>
      </div>

      {/* Lead List */}
      {viewMode === 'table' ? (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Age</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Sport</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Source</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Follow-up</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Assigned To</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">{lead.name}</div>
                        <div className="text-sm text-gray-500">{lead.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{lead.age}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{lead.sport}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{lead.source}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      lead.status === 'New' ? 'bg-blue-100 text-blue-800' :
                      lead.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                      lead.status === 'Qualified' ? 'bg-green-100 text-green-800' :
                      lead.status === 'Converted' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{lead.followUpDate}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{lead.assignedTo}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button 
                      onClick={() => handleEditLead(lead)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button className="text-green-600 hover:text-green-900">Call</button>
                    <button className="text-purple-600 hover:text-purple-900">Convert</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {['New', 'In Progress', 'Qualified', 'Converted'].map((status) => (
            <div key={status} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {status}
                <span className="ml-2 text-sm text-gray-500">
                  ({filteredLeads.filter(lead => lead.status === status).length})
                </span>
              </h3>
              <div className="space-y-4">
                {filteredLeads
                  .filter(lead => lead.status === status)
                  .map(lead => (
                    <div key={lead.id} className="bg-white p-4 rounded-lg shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{lead.name}</h4>
                          <p className="text-sm text-gray-500">{lead.sport}</p>
                        </div>
                        <button
                          onClick={() => handleEditLead(lead)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        <p>{lead.email}</p>
                        <p>{lead.phone}</p>
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          Follow-up: {lead.followUpDate}
                        </span>
                        <span className="text-xs text-gray-500">
                          {lead.assignedTo}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Analytics Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Source Distribution */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Lead Sources</h3>
          <div className="h-[300px]">
            <Pie 
              data={sourceDistribution} 
              options={{ 
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                    align: 'center'
                  }
                }
              }} 
            />
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Conversion Funnel</h3>
          <div className="h-[300px]">
            <Bar
              data={conversionFunnel}
              options={{
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: { 
                  legend: { display: false }
                },
                scales: {
                  x: {
                    beginAtZero: true,
                    grid: {
                      display: false
                    }
                  },
                  y: {
                    grid: {
                      display: false
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Sport-wise Conversion */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Sport-wise Conversion</h3>
          <div className="h-[300px]">
            <Bar
              data={sportConversion}
              options={{
                maintainAspectRatio: false,
                plugins: { 
                  legend: { display: false }
                },
                scales: {
                  x: {
                    grid: {
                      display: false
                    }
                  },
                  y: {
                    beginAtZero: true,
                    grid: {
                      display: false
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* AI Insights and Follow-up Reminders Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Insights */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">AI Insights</h3>
          <div className="space-y-4">
            {mockLeadInsights.map((insight) => (
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
                      insight.priority === 'high' ? 'bg-red-500' : 
                      insight.priority === 'medium' ? 'bg-amber-500' : 
                      'bg-green-500'
                    }`} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      insight.impact.includes('+') ? 'bg-green-100 text-green-700' : 
                      insight.impact.includes('-') ? 'bg-red-100 text-red-700' : 
                      'bg-blue-100 text-blue-700'
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

        {/* Follow-up Reminders */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Follow-up Reminders</h3>
            <p className="mt-1 text-sm text-gray-500">Track and manage your follow-ups</p>
          </div>
          <div className="divide-y divide-gray-200">
            {followUps.map((followUp) => (
              <div key={followUp.id} className="p-4 sm:px-6">
                <div className="flex items-start gap-3">
                  <div className={`rounded-full p-1.5 flex-shrink-0 ${
                    followUp.status === 'overdue' ? 'bg-red-100' : 'bg-green-100'
                  }`}>
                    {followUp.status === 'overdue' ? (
                      <ExclamationCircleIcon className="h-5 w-5 text-red-600" />
                    ) : (
                      <CheckCircleIcon className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-gray-900">{followUp.leadName}</p>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        followUp.status === 'overdue'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {followUp.status === 'overdue' ? 'Overdue' : 'Upcoming'}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                        {followUp.type}
                      </span>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm text-gray-500">Due: {followUp.dueDate}</p>
                      <p className="text-sm text-gray-500 mt-1">{followUp.notes}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Reschedule
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                  >
                    Complete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bulk Actions Panel */}
      {selectedLeads.length > 0 && (
        <div className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-blue-600 p-2 shadow-lg sm:p-3">
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex w-0 flex-1 items-center">
                  <span className="flex rounded-lg bg-blue-800 p-2">
                    <UserGroupIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </span>
                  <p className="ml-3 font-medium text-white">
                    <span className="md:hidden">Selected {selectedLeads.length} leads</span>
                    <span className="hidden md:inline">{selectedLeads.length} leads selected</span>
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button className="flex items-center justify-center rounded-md border border-transparent bg-blue-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
                    Assign Coach
                  </button>
                  <button className="flex items-center justify-center rounded-md border border-transparent bg-blue-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
                    Export CSV
                  </button>
                  <button className="flex items-center justify-center rounded-md border border-transparent bg-blue-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
                    Send Trial Invite
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant */}
      <div className="fixed bottom-6 right-6">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-indigo-600 p-4 text-white shadow-lg hover:bg-indigo-500"
        >
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
          <span className="sr-only">Open CRM Assistant</span>
        </button>
      </div>

      {/* Add/Edit Lead Form */}
      <AddLeadForm
        isOpen={isAddLeadOpen}
        onClose={() => {
          setIsAddLeadOpen(false);
          setEditingLead(null);
        }}
        onSubmit={handleAddLead}
        initialData={editingLead}
      />

      {/* Insight Modal */}
      {showInsightModal && selectedInsight && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">{selectedInsight.title}</h3>
              <button 
                onClick={() => setShowInsightModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-4">
                {selectedInsight.type === 'conversion' && (
                  <>
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                      <h4 className="text-sm font-medium text-blue-800">Corporate Lead Details</h4>
                      <div className="mt-3 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Company</p>
                          <p className="font-medium">{selectedInsight.data.companyName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Contact</p>
                          <p className="font-medium">{selectedInsight.data.contactPerson}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Requirement</p>
                          <p className="font-medium">{selectedInsight.data.requirement}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Potential Value</p>
                          <p className="font-medium text-green-600">${selectedInsight.data.potentialValue}/month</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Next Steps</h4>
                      <ul className="space-y-2">
                        {selectedInsight.data.nextSteps.map((step: string, index: number) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <div className="h-2 w-2 rounded-full bg-indigo-600 mr-2" />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                {selectedInsight.type === 'engagement' && (
                  <>
                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                      <h4 className="text-sm font-medium text-red-800">Pending Responses</h4>
                      <p className="mt-1 text-sm text-red-600">
                        Quick response time is crucial for lead conversion. These leads require immediate attention.
                      </p>
                    </div>
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Name</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Source</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Wait Time</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Interest</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {selectedInsight.data.pendingLeads.map((lead: any, index: number) => (
                            <tr key={index}>
                              <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{lead.name}</td>
                              <td className="px-3 py-4 text-sm text-gray-500">{lead.source}</td>
                              <td className="px-3 py-4 text-sm text-red-600 font-medium">{lead.waitTime}</td>
                              <td className="px-3 py-4 text-sm text-gray-500">{lead.interest}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}

                {selectedInsight.type === 'followup' && (
                  <>
                    <div className="bg-green-50 border border-green-200 rounded-md p-4">
                      <h4 className="text-sm font-medium text-green-800">Conversion Rate Analysis</h4>
                      <div className="mt-3 space-y-3">
                        {selectedInsight.data.conversionRates.map((rate: any, index: number) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{rate.followupTime}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-600 h-2 rounded-full" 
                                  style={{ width: rate.rate }}
                                />
                              </div>
                              <span className="text-sm font-medium text-gray-900">{rate.rate}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Recommended Actions</h4>
                      <ul className="space-y-2">
                        {selectedInsight.data.recommendedActions.map((action: string, index: number) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => setShowInsightModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  // Handle action implementation
                  setShowInsightModal(false);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                {selectedInsight.action}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 