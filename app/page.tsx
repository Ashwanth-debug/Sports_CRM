'use client';

import Layout from './components/Layout';
import {
  CalendarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const stats = [
  {
    name: "Today's Sessions",
    value: '12',
    icon: CalendarIcon,
    change: '+2.1%',
    changeType: 'positive',
  },
  {
    name: 'Upcoming Bookings',
    value: '28',
    icon: CalendarIcon,
    change: '+12.5%',
    changeType: 'positive',
  },
  {
    name: 'Revenue this Month',
    value: '$12,420',
    icon: CurrencyDollarIcon,
    change: '+8.3%',
    changeType: 'positive',
  },
  {
    name: 'Attendance Rate',
    value: '94%',
    icon: UserGroupIcon,
    change: '-1.2%',
    changeType: 'negative',
  },
  {
    name: 'Active Players',
    value: '156',
    icon: UserGroupIcon,
    change: '+4.3%',
    changeType: 'positive',
  },
  {
    name: 'Active Coaches',
    value: '8',
    icon: UserGroupIcon,
    change: '0%',
    changeType: 'neutral',
  },
];

const revenueData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [12000, 19000, 15000, 22000, 18000, 24000],
      backgroundColor: 'rgba(99, 102, 241, 0.5)',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Monthly Revenue',
    },
  },
};

const incomeData = {
  labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  datasets: [
    {
      data: [1200, 1900, 3000, 2567, 1800, 2400, 2800],
      backgroundColor: '#818CF8',
      borderRadius: 8,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

const recentProjects = [
  {
    id: 1,
    name: 'Web Development Project',
    rate: '$10/hour',
    status: 'Paid',
    location: 'Germany',
    time: '2h ago',
    tags: ['Remote', 'Part-time'],
    description: 'This project involves implementing both frontend and backend functionalities, as well as integrating with third-party APIs.',
  },
  {
    id: 2,
    name: 'Copyright Project',
    rate: '$10/hour',
    status: 'Not Paid',
    location: 'United States',
    time: '3h ago',
    tags: ['Remote', 'Full-time'],
    description: 'Creating and managing copyright documentation for digital content.',
  },
];

export default function Home() {
  return <Layout />;
}
