'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Plus, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's your work order overview.</p>
        </div>
        <Link href="/dashboard/work-orders/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Work Order
          </Button>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Work Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">247</p>
                <p className="text-sm text-gray-500 mt-2">This month</p>
              </div>
              <div className="bg-primary-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">In Progress</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">43</p>
                <p className="text-sm text-gray-500 mt-2">Active tasks</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Completion Rate</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">87%</p>
                <p className="text-sm text-success-500 mt-2">↑ 5% from last month</p>
              </div>
              <div className="bg-success-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-success-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Avg Resolution Time</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">2.5h</p>
                <p className="text-sm text-gray-500 mt-2">Per task</p>
              </div>
              <div className="bg-warning-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-warning-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Work Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Work Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">Fix HVAC System - Room 301</h4>
                        <p className="text-sm text-gray-600 mt-1">Assigned to John Doe</p>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        In Progress
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/dashboard/work-orders">
                  <Button variant="outline" fullWidth>
                    View All
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Approvals */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="border-l-4 border-warning-500 bg-warning-50 p-3 rounded">
                    <p className="text-sm font-medium text-gray-900">Maintenance Task #{i + 1}</p>
                    <p className="text-xs text-gray-600 mt-1">Waiting for approval</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['John Doe', 'Jane Smith', 'Mike Johnson'].map((name, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-sm font-medium text-primary-600">
                      {i + 1}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{name}</span>
                  </div>
                  <span className="text-sm font-medium text-primary-600">{42 - i * 5} tasks</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Work Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: 'Pending', count: 12, color: 'bg-yellow-500' },
                { label: 'In Progress', count: 43, color: 'bg-blue-500' },
                { label: 'Completed', count: 180, color: 'bg-success-500' },
                { label: 'Closed', count: 12, color: 'bg-gray-500' },
              ].map((status, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{status.label}</span>
                    <span className="text-sm font-medium text-gray-900">{status.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${status.color} h-2 rounded-full`}
                      style={{ width: `${(status.count / 247) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
