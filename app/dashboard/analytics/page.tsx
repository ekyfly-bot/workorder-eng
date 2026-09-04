'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { BarChart3, Download, TrendingUp } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600 mt-2">View performance metrics and generate reports</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Work Orders', value: '247', change: '+12%', icon: '📋' },
          { label: 'Completion Rate', value: '87%', change: '+5%', icon: '✓' },
          { label: 'Avg Resolution Time', value: '2.5h', change: '-10%', icon: '⏱' },
          { label: 'Staff Utilization', value: '92%', change: '+3%', icon: '👥' },
        ].map((metric, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{metric.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
                  <p className="text-sm text-success-500 mt-2">
                    <TrendingUp className="w-4 h-4 inline mr-1" />
                    {metric.change}
                  </p>
                </div>
                <span className="text-3xl">{metric.icon}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Work Order Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Work Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { status: 'Completed', count: 180, percentage: 73, color: 'bg-success-500' },
                { status: 'In Progress', count: 43, percentage: 17, color: 'bg-blue-500' },
                { status: 'Pending', count: 20, percentage: 8, color: 'bg-yellow-500' },
                { status: 'Closed', count: 4, percentage: 2, color: 'bg-gray-500' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{item.status}</span>
                    <span className="text-sm font-medium text-gray-900">{item.count} ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'John Doe', completed: 42, avgTime: 2.2 },
                { name: 'Jane Smith', completed: 38, avgTime: 2.5 },
                { name: 'Mike Johnson', completed: 35, avgTime: 2.8 },
                { name: 'Sarah Williams', completed: 32, avgTime: 2.4 },
              ].map((staff, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-sm font-bold text-primary-600">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{staff.name}</p>
                      <p className="text-xs text-gray-500">{staff.completed} tasks completed</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-primary-600">{staff.avgTime}h avg</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Department Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Department</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Total WOs</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Completed</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">In Progress</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Completion %</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Avg Time</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { dept: 'Engineering', total: 89, completed: 78, inProgress: 8, completion: 87, avgTime: '2.2h' },
                  { dept: 'Maintenance', total: 102, completed: 88, inProgress: 12, completion: 86, avgTime: '2.5h' },
                  { dept: 'Housekeeping', total: 56, completed: 48, inProgress: 6, completion: 86, avgTime: '1.8h' },
                ].map((dept) => (
                  <tr key={dept.dept} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{dept.dept}</td>
                    <td className="py-3 px-4 text-gray-700">{dept.total}</td>
                    <td className="py-3 px-4 text-gray-700">{dept.completed}</td>
                    <td className="py-3 px-4 text-gray-700">{dept.inProgress}</td>
                    <td className="py-3 px-4">
                      <span className="text-success-600 font-medium">{dept.completion}%</span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{dept.avgTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
