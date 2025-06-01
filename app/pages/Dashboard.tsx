'use client';

import {
  ChartBarIcon,
  ExclamationCircleIcon,
  PlusCircleIcon,
  CalendarIcon,
  UserPlusIcon,
  DocumentPlusIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  UserIcon,
  BellIcon,
  CheckCircleIcon,
  BoltIcon,
  ArrowTrendingDownIcon,
  XMarkIcon,
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
  LineElement,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { useState } from 'react';

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

// --- MOCK DATA ---
const leadKPIs = [
  { name: 'Total Leads This Month', value: '145', change: '+12.5%', changeType: 'positive' },
  { name: 'Qualified Leads', value: '64', change: '+5.3%', changeType: 'positive' },
  { name: 'Follow-Ups Pending', value: '28', change: '-2.1%', changeType: 'negative' },
  { name: 'AI Priority Leads', value: '15', change: 'New', changeType: 'neutral' },
];
const topFollowUps = [
  { name: 'John Doe', sport: 'Tennis', coach: 'Mike', date: '2024-06-12' },
  { name: 'Jane Smith', sport: 'Swimming', coach: 'Sarah', date: '2024-06-13' },
  { name: 'Mike Johnson', sport: 'Basketball', coach: 'John', date: '2024-06-14' },
];
const upcomingBookings = [
  { court: 'Court 1', time: '6-7 PM', player: 'John Doe', coach: 'Mike' },
  { court: 'Court 2', time: '7-8 PM', player: 'Jane Smith', coach: 'Sarah' },
  { court: 'Court 3', time: '8-9 PM', player: 'Mike Johnson', coach: 'John' },
];
const outstandingPayments = [
  { name: 'Tom Brown', amount: '$450', due: '2024-06-10' },
  { name: 'Lisa Anderson', amount: '$320', due: '2024-06-12' },
  { name: 'David Wilson', amount: '$210', due: '2024-06-15' },
];
const recentPlayers = [
  { name: 'Emily Davis', sport: 'Basketball', joined: '2024-06-09' },
  { name: 'Alex Turner', sport: 'Tennis', joined: '2024-06-08' },
  { name: 'Sophie Clark', sport: 'Swimming', joined: '2024-06-07' },
];
const recentMessages = [
  { sender: 'Coach Mike', subject: 'Session Update', time: '2h ago' },
  { sender: 'Sarah Wilson', subject: 'Payment Query', time: '4h ago' },
  { sender: 'Admin', subject: 'Announcement', time: '1d ago' },
];
const coachLeaderboard = [
  { name: 'Sarah Wilson', engagement: 95 },
  { name: 'Mike Johnson', engagement: 92 },
  { name: 'Emily Brown', engagement: 88 },
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
const attendanceData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Attendance Rate',
      data: [94, 92, 96, 95],
      borderColor: 'rgb(16, 185, 129)',
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      tension: 0.4,
    },
  ],
};
const sportParticipation = {
  labels: ['Tennis', 'Swimming', 'Basketball'],
  datasets: [
    {
      label: 'Players',
      data: [85, 78, 90],
      backgroundColor: [
        'rgba(99, 102, 241, 0.7)',
        'rgba(16, 185, 129, 0.7)',
        'rgba(251, 146, 60, 0.7)',
      ],
    },
  ],
};
const alerts = [
  { type: 'payment', message: 'Payment overdue for Tom Brown', priority: 'high' },
  { type: 'membership', message: 'Membership expiring for Lisa Anderson', priority: 'medium' },
  { type: 'lead', message: 'Follow up with John Doe', priority: 'high' },
];
const quickActions = [
  { name: 'Add Booking', icon: CalendarIcon, onClick: () => {} },
  { name: 'Add Lead', icon: UserPlusIcon, onClick: () => {} },
  { name: 'Record Payment', icon: CurrencyDollarIcon, onClick: () => {} },
  { name: 'Send Message', icon: ChatBubbleLeftRightIcon, onClick: () => {} },
];

type DashboardInsight = {
  id: number;
  type: 'revenue' | 'retention' | 'capacity';
  title: string;
  message: string;
  action: string;
  impact: string;
  priority: 'high' | 'medium' | 'low';
  data?: any;
};

// Mock data for dashboard insights
const mockDashboardInsights: DashboardInsight[] = [
  {
    id: 1,
    type: 'revenue',
    title: 'Revenue Growth Opportunity',
    message: 'Peak hour pricing can be optimized based on 90% utilization rate',
    action: 'Review Pricing',
    impact: '+$8,500/month',
    priority: 'high',
    data: {
      peakHours: [
        { time: '4:00 PM - 5:00 PM', utilization: 92, currentPrice: 180, suggestedPrice: 220 },
        { time: '5:00 PM - 6:00 PM', utilization: 95, currentPrice: 180, suggestedPrice: 230 },
        { time: '6:00 PM - 7:00 PM', utilization: 88, currentPrice: 180, suggestedPrice: 210 },
      ],
      analysis: {
        currentMonthlyRevenue: 45000,
        projectedIncrease: 8500,
        implementationTime: '2 weeks',
        competitorPricing: {
          average: 200,
          highest: 250,
          lowest: 150
        }
      }
    }
  },
  {
    id: 2,
    type: 'retention',
    title: 'Member Churn Risk',
    message: '15 members showing decreased activity in last 30 days',
    action: 'View Members',
    impact: '$4,500 at risk',
    priority: 'high',
    data: {
      atRiskMembers: [
        { name: 'John Smith', lastVisit: '2 weeks ago', membership: 'Premium', monthlyValue: 300 },
        { name: 'Sarah Johnson', lastVisit: '18 days ago', membership: 'Standard', monthlyValue: 200 },
        // ... more members
      ],
      retentionStrategies: [
        'Send personalized re-engagement emails',
        'Offer complimentary training session',
        'Schedule follow-up calls',
        'Provide membership pause option'
      ]
    }
  },
  {
    id: 3,
    type: 'capacity',
    title: 'Capacity Optimization',
    message: 'Off-peak hours (1-4 PM) showing 40% average utilization',
    action: 'Optimize Schedule',
    impact: '+35% utilization',
    priority: 'medium',
    data: {
      offPeakAnalysis: [
        { time: '1:00 PM', utilization: 35, potential: 70 },
        { time: '2:00 PM', utilization: 40, potential: 75 },
        { time: '3:00 PM', utilization: 45, potential: 80 },
        { time: '4:00 PM', utilization: 50, potential: 85 }
      ],
      recommendations: [
        {
          title: 'Introduce Lunch Break Special',
          description: 'Discounted rates for 1-2 PM slots',
          potentialImpact: '+25% utilization'
        },
        {
          title: 'Corporate Packages',
          description: 'Target nearby offices for team sports',
          potentialImpact: '+30% utilization'
        },
        {
          title: 'School Programs',
          description: 'Partner with local schools for afternoon activities',
          potentialImpact: '+40% utilization'
        }
      ]
    }
  }
];

export default function Dashboard() {
  const [selectedInsight, setSelectedInsight] = useState<DashboardInsight | null>(null);
  const [showInsightModal, setShowInsightModal] = useState(false);

  // Handle insight click
  const handleInsightClick = (insight: DashboardInsight) => {
    setSelectedInsight(insight);
    setShowInsightModal(true);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$45,200</p>
            </div>
            <div className="bg-green-50 rounded-lg p-2">
              <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-green-600">
            <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
            <span>15% vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Members</p>
              <p className="text-2xl font-bold text-gray-900">428</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-2">
              <UserGroupIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-green-600">
            <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
            <span>8% vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Court Utilization</p>
              <p className="text-2xl font-bold text-gray-900">82%</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-2">
              <ChartBarIcon className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-green-600">
            <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
            <span>5% vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Bookings Today</p>
              <p className="text-2xl font-bold text-gray-900">45</p>
            </div>
            <div className="bg-amber-50 rounded-lg p-2">
              <CalendarIcon className="h-6 w-6 text-amber-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-green-600">
            <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
            <span>12% vs last week</span>
          </div>
        </div>
      </div>

      {/* AI Insights and Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Insights */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">AI Insights</h3>
          <div className="space-y-4">
            {mockDashboardInsights.map((insight) => (
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

        {/* Enhanced Actionable Alerts */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Alerts</h3>
            <span className="bg-red-100 text-red-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {alerts.length} Active
            </span>
          </div>
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className={`rounded-full p-1.5 flex-shrink-0 ${
                    alert.priority === 'high' ? 'bg-red-100' : 'bg-yellow-100'
                  }`}>
                    <ExclamationCircleIcon className={`h-5 w-5 ${
                      alert.priority === 'high' ? 'text-red-600' : 'text-yellow-600'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                        <p className={`text-xs font-medium mt-1 ${
                          alert.priority === 'high' ? 'text-red-600' : 'text-yellow-600'
                        }`}>
                          {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)} Priority
                        </p>
                      </div>
                      <span className="text-xs text-gray-500">Just now</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  {alert.type === 'payment' && (
                    <>
                      <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                        View Details
                      </button>
                      <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                        Send Reminder
                      </button>
                    </>
                  )}
                  {alert.type === 'membership' && (
                    <>
                      <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                        Contact Member
                      </button>
                      <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                        Renew Membership
                      </button>
                    </>
                  )}
                  {alert.type === 'lead' && (
                    <>
                      <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                        View Lead
                      </button>
                      <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                        Schedule Call
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
                {selectedInsight.type === 'revenue' && (
                  <>
                    <div className="bg-green-50 border border-green-200 rounded-md p-4">
                      <h4 className="text-sm font-medium text-green-800">Peak Hour Analysis</h4>
                      <div className="mt-3 space-y-3">
                        {selectedInsight.data.peakHours.map((hour: any, index: number) => (
                          <div key={index} className="grid grid-cols-4 gap-4 items-center">
                            <div className="text-sm text-gray-600">{hour.time}</div>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-600 h-2 rounded-full" 
                                  style={{ width: `${hour.utilization}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-500">{hour.utilization}%</span>
                            </div>
                            <div className="text-sm text-gray-500">${hour.currentPrice}</div>
                            <div className="text-sm font-medium text-green-600">${hour.suggestedPrice}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-md p-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Current Revenue</h4>
                        <p className="text-2xl font-bold text-gray-900">
                          ${selectedInsight.data.analysis.currentMonthlyRevenue.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">Monthly</p>
                      </div>
                      <div className="bg-gray-50 rounded-md p-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Projected Increase</h4>
                        <p className="text-2xl font-bold text-green-600">
                          +${selectedInsight.data.analysis.projectedIncrease.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">Monthly</p>
                      </div>
                    </div>
                  </>
                )}

                {selectedInsight.type === 'retention' && (
                  <>
                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                      <h4 className="text-sm font-medium text-red-800">At-Risk Members</h4>
                      <div className="mt-3 space-y-3">
                        {selectedInsight.data.atRiskMembers.map((member: any, index: number) => (
                          <div key={index} className="grid grid-cols-4 gap-4 items-center">
                            <div className="text-sm font-medium text-gray-900">{member.name}</div>
                            <div className="text-sm text-red-600">{member.lastVisit}</div>
                            <div className="text-sm text-gray-500">{member.membership}</div>
                            <div className="text-sm font-medium text-gray-900">${member.monthlyValue}/mo</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Retention Strategies</h4>
                      <ul className="space-y-2">
                        {selectedInsight.data.retentionStrategies.map((strategy: string, index: number) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                            {strategy}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                {selectedInsight.type === 'capacity' && (
                  <>
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                      <h4 className="text-sm font-medium text-blue-800">Off-Peak Analysis</h4>
                      <div className="mt-3 space-y-3">
                        {selectedInsight.data.offPeakAnalysis.map((hour: any, index: number) => (
                          <div key={index} className="grid grid-cols-3 gap-4 items-center">
                            <div className="text-sm text-gray-600">{hour.time}</div>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${hour.utilization}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-500">{hour.utilization}%</span>
                            </div>
                            <div className="text-sm font-medium text-blue-600">
                              Target: {hour.potential}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Recommendations</h4>
                      <div className="space-y-4">
                        {selectedInsight.data.recommendations.map((rec: any, index: number) => (
                          <div key={index} className="bg-gray-50 rounded-md p-4">
                            <h5 className="text-sm font-medium text-gray-900">{rec.title}</h5>
                            <p className="text-sm text-gray-500 mt-1">{rec.description}</p>
                            <p className="text-sm font-medium text-green-600 mt-2">{rec.potentialImpact}</p>
                          </div>
                        ))}
                      </div>
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.name}
            onClick={action.onClick}
            className="flex items-center justify-center gap-2 p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors"
          >
            <action.icon className="h-5 w-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">{action.name}</span>
          </button>
        ))}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Trend</h3>
          <div className="h-64">
            <Bar
              data={revenueData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  y: { beginAtZero: true },
                },
              }}
            />
          </div>
        </div>

        {/* Attendance Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Attendance Rate</h3>
          <div className="h-64">
            <Line
              data={attendanceData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Sport Participation */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Sport Distribution</h3>
          <div className="h-64">
            <Pie
              data={sportParticipation}
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
      </div>

      {/* Secondary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Bookings */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Bookings</h3>
            <div className="space-y-4">
              {upcomingBookings.map((booking, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{booking.court}</p>
                    <p className="text-sm text-gray-500">{booking.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-900">{booking.player}</p>
                    <p className="text-sm text-gray-500">{booking.coach}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Outstanding Payments */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Outstanding Payments</h3>
            <div className="space-y-4">
              {outstandingPayments.map((payment, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{payment.name}</p>
                    <p className="text-sm text-gray-500">Due: {payment.due}</p>
                  </div>
                  <p className="text-sm font-medium text-red-600">{payment.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Players */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Players</h3>
            <div className="space-y-4">
              {recentPlayers.map((player, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{player.name}</p>
                    <p className="text-sm text-gray-500">{player.sport}</p>
                  </div>
                  <p className="text-sm text-gray-500">{player.joined}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Messages */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Messages</h3>
            <div className="space-y-4">
              {recentMessages.map((message, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{message.sender}</p>
                    <p className="text-sm text-gray-500">{message.subject}</p>
                  </div>
                  <p className="text-sm text-gray-500">{message.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coach Leaderboard */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Coach Leaderboard</h3>
            <div className="space-y-4">
              {coachLeaderboard.map((coach, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-indigo-100 rounded-full p-2">
                      <AcademicCapIcon className="h-5 w-5 text-indigo-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-900">{coach.name}</p>
                  </div>
                  <p className="text-sm font-medium text-green-600">{coach.engagement}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Alerts</h3>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`rounded-full p-1 ${
                    alert.priority === 'high' ? 'bg-red-100' : 'bg-yellow-100'
                  }`}>
                    <ExclamationCircleIcon className={`h-5 w-5 ${
                      alert.priority === 'high' ? 'text-red-600' : 'text-yellow-600'
                    }`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                    <p className={`text-xs font-medium ${
                      alert.priority === 'high' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)} Priority
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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
    </div>
  );
} 