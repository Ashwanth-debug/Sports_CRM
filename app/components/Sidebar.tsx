'use client';

import { useState } from 'react';
import {
  HomeIcon,
  UserGroupIcon,
  CalendarIcon,
  CreditCardIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  ChartBarIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface SidebarProps {
  onPageChange: (page: string) => void;
  currentPage: string;
}

const navigation = [
  { name: 'Dashboard', icon: HomeIcon },
  { name: 'Lead Management', icon: UserGroupIcon },
  { name: 'Booking & Scheduling', icon: CalendarIcon },
  { name: 'Membership & Payments', icon: CreditCardIcon },
  { name: 'Contacts & Relations', icon: UserIcon },
  { name: 'Communication', icon: ChatBubbleLeftRightIcon },
  { name: 'Coach Dashboard', icon: AcademicCapIcon },
  { name: 'Player Profiles', icon: UserIcon },
  { name: 'Analytics', icon: ChartBarIcon },
];

export default function Sidebar({ onPageChange, currentPage }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handlePageChange = (pageName: string) => {
    onPageChange(pageName);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          type="button"
          className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-[#1a1f36]">
        <div className="flex flex-col flex-grow overflow-y-auto">
          <div className="flex h-16 items-center gap-2 px-4">
            <div className="h-8 w-8 rounded bg-blue-500 flex items-center justify-center text-white font-bold">
              SC
            </div>
            <span className="text-lg font-semibold text-white">SportsCRM</span>
          </div>
          <nav className="flex-1 px-2 py-4">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handlePageChange(item.name)}
                className={clsx(
                  'group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium mb-1',
                  currentPage === item.name
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                )}
              >
                <item.icon
                  className={clsx(
                    'h-5 w-5 flex-shrink-0',
                    currentPage === item.name
                      ? 'text-white'
                      : 'text-gray-400 group-hover:text-white'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3 px-4 py-4 border-t border-gray-800">
            <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-white">
              JS
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">John Smith</p>
              <p className="text-xs text-gray-400">Academy Owner</p>
            </div>
            <button className="p-1 rounded hover:bg-gray-800">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-[#1a1f36]">
            <div className="flex h-16 items-center justify-between px-4 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded bg-blue-500 flex items-center justify-center text-white font-bold">
                  SC
                </div>
                <span className="text-lg font-semibold text-white">SportsCRM</span>
              </div>
              <button
                type="button"
                className="p-2 rounded-md text-gray-400 hover:bg-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 px-2 py-4">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handlePageChange(item.name)}
                  className={clsx(
                    'group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium mb-1',
                    currentPage === item.name
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  )}
                >
                  <item.icon
                    className={clsx(
                      'h-5 w-5 flex-shrink-0',
                      currentPage === item.name
                        ? 'text-white'
                        : 'text-gray-400 group-hover:text-white'
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-3 px-4 py-4 border-t border-gray-800">
              <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-white">
                JS
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">John Smith</p>
                <p className="text-xs text-gray-400">Academy Owner</p>
              </div>
              <button className="p-1 rounded hover:bg-gray-800">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
