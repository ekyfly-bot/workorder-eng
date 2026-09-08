'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  BarChart3,
  Users,
  Settings,
  Menu,
  X,
} from 'lucide-react';
import { User } from '@/lib/types';
import clsx from 'clsx';

interface SidebarProps {
  user: User | null;
}

const navigationItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/work-orders', icon: CheckSquare, label: 'Work Orders' },
  { href: '/dashboard/assignments', icon: Calendar, label: 'Assignments' },
  { href: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/dashboard/users', icon: Users, label: 'Users', admin: true },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar({ user }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const filteredItems = navigationItems.filter((item) => {
    if (item.admin && user?.role !== 'ADMIN') {
      return false;
    }
    return true;
  });

  return (
    <>
      {/* Mobile menu toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-gray-200 rounded-lg"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={clsx(
          'bg-gray-900 text-white transition-all duration-300 flex flex-col',
          isOpen ? 'w-64' : 'w-20',
          'md:relative fixed md:z-0 z-40 h-screen'
        )}
      >
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-3 px-6 py-6 border-b border-gray-800">
          <div className="text-2xl">🏨</div>
          {isOpen && <span className="font-bold text-lg">WorkOrder</span>}
        </Link>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {filteredItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User info */}
        {isOpen && (
          <div className="px-6 py-4 border-t border-gray-800">
            <div className="flex items-center gap-3">
              <img
                src={user?.avatar || 'https://via.placeholder.com/32'}
                alt={user?.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-gray-400 truncate">{user?.role}</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
