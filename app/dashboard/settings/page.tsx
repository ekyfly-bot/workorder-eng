'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/FormElements';
import { Bell, Lock, Eye, Sliders } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account and application preferences</p>
      </div>

      {/* Tabs */}
      <Card>
        <CardContent className="pt-0">
          <div className="flex gap-4 border-b border-gray-200">
            {[
              { id: 'profile', label: 'Profile', icon: '👤' },
              { id: 'security', label: 'Security', icon: '🔒' },
              { id: 'notifications', label: 'Notifications', icon: '🔔' },
              { id: 'preferences', label: 'Preferences', icon: '⚙️' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600 font-medium'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center text-3xl">
                  👤
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Profile Photo</h3>
                  <p className="text-sm text-gray-600">JPG, GIF or PNG. 5MB max.</p>
                  <Button size="sm" variant="outline" className="mt-2">
                    Change Photo
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Full Name" placeholder="John Doe" />
                <Input label="Email" placeholder="john@hotel.com" type="email" />
                <Input label="Phone" placeholder="+62 812 3456 7890" />
                <Input label="Department" placeholder="Engineering" disabled />
              </div>

              <Input label="Bio" placeholder="Tell us about yourself..." />

              <div className="flex justify-end pt-6 border-t border-gray-200">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Input label="Current Password" type="password" placeholder="••••••••" />
              <Input label="New Password" type="password" placeholder="••••••••" />
              <Input label="Confirm Password" type="password" placeholder="••••••••" />
              <div className="flex justify-end pt-6 border-t border-gray-200">
                <Button>Update Password</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="font-medium text-gray-900">Status</p>
                  <p className="text-sm text-gray-600">Not enabled</p>
                </div>
                <Button variant="outline">Enable 2FA</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <p className="font-medium text-gray-900">Chrome on macOS</p>
                    <p className="text-sm text-gray-600">192.168.1.1 • Current session</p>
                  </div>
                  <span className="text-xs text-gray-500">Active now</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-gray-900">Safari on iPhone</p>
                    <p className="text-sm text-gray-600">192.168.1.2</p>
                  </div>
                  <Button variant="outline" size="sm">Logout</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'New work order assigned', checked: true },
                { label: 'Work order completed', checked: true },
                { label: 'Assignment reminder', checked: true },
                { label: 'Daily digest', checked: false },
                { label: 'Weekly report', checked: true },
              ].map((notif, i) => (
                <label key={i} className="flex items-center gap-3 py-2">
                  <input type="checkbox" defaultChecked={notif.checked} className="w-4 h-4 rounded" />
                  <span className="text-gray-700">{notif.label}</span>
                </label>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Push Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Urgent tasks', checked: true },
                { label: 'Status updates', checked: true },
                { label: 'Messages', checked: false },
              ].map((notif, i) => (
                <label key={i} className="flex items-center gap-3 py-2">
                  <input type="checkbox" defaultChecked={notif.checked} className="w-4 h-4 rounded" />
                  <span className="text-gray-700">{notif.label}</span>
                </label>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Display Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                <div className="flex gap-3">
                  <button className="px-4 py-2 rounded-lg border-2 border-primary-500 bg-primary-50 text-primary-600 font-medium">
                    Light
                  </button>
                  <button className="px-4 py-2 rounded-lg border-2 border-gray-200 text-gray-700 font-medium hover:border-gray-300">
                    Dark
                  </button>
                  <button className="px-4 py-2 rounded-lg border-2 border-gray-200 text-gray-700 font-medium hover:border-gray-300">
                    Auto
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                <select className="w-full rounded-lg border border-gray-300 px-4 py-2">
                  <option>DD/MM/YYYY</option>
                  <option>MM/DD/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Items Per Page</label>
                <select className="w-full rounded-lg border border-gray-300 px-4 py-2">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                </select>
              </div>

              <div className="flex justify-end pt-6 border-t border-gray-200">
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
