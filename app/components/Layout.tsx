'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import AIChatButton from './AIChatButton';
import Dashboard from '../pages/Dashboard';
import LeadManagement from '../pages/LeadManagement';
import BookingScheduling from '../pages/BookingScheduling';
import Membership from '../pages/Membership';
import Contacts from '../pages/Contacts';
import Communication from '../pages/Communication';
import CoachDashboard from '../pages/CoachDashboard';
import PlayerProfiles from '../pages/PlayerProfiles';
import Analytics from '../pages/Analytics';

export default function Layout() {
  const [currentPage, setCurrentPage] = useState('Dashboard');

  const renderContent = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Lead Management':
        return <LeadManagement />;
      case 'Booking & Scheduling':
        return <BookingScheduling />;
      case 'Membership & Payments':
        return <Membership />;
      case 'Contacts & Relations':
        return <Contacts />;
      case 'Communication':
        return <Communication />;
      case 'Coach Dashboard':
        return <CoachDashboard />;
      case 'Player Profiles':
        return <PlayerProfiles />;
      case 'Analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Sidebar onPageChange={setCurrentPage} currentPage={currentPage} />
      <div className="min-h-screen">
        <Header title={currentPage} />
        <main className="py-6 px-4 sm:px-6 lg:px-8 lg:pl-72">
          {renderContent()}
        </main>
        <AIChatButton />
      </div>
    </>
  );
}
