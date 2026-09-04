'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/FormElements';
import { Search, Calendar, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const mockAssignments = Array.from({ length: 8 }).map((_, i) => ({
  id: `ASN-${1000 + i}`,
  workOrderId: `WO-${1000 + i}`,
  staffName: ['John Doe', 'Jane Smith', 'Mike Johnson'][i % 3],
  task: ['Fix HVAC', 'Replace Bulbs', 'Repair Door'][i % 3],
  location: `Room ${200 + i}`,
  scheduledDate: new Date(Date.now() + i * 86400000).toLocaleDateString(),
  status: ['PENDING', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED'][i % 4],
}));

export default function AssignmentsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
          <p className="text-gray-600 mt-2">Manage work order assignments and staff schedules</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Assignments</p>
                <p className="text-2xl font-bold text-gray-900">42</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">15</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-success-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-success-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">19</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignments List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Assignments</CardTitle>
            <div className="w-64">
              <Input placeholder="Search assignments..." />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Assignment</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Staff</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Location</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Scheduled</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockAssignments.map((assignment) => (
                  <tr key={assignment.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{assignment.workOrderId}</td>
                    <td className="py-3 px-4 text-gray-700">{assignment.staffName}</td>
                    <td className="py-3 px-4 text-gray-700">{assignment.location}</td>
                    <td className="py-3 px-4 text-gray-700">{assignment.scheduledDate}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        assignment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        assignment.status === 'ACCEPTED' ? 'bg-blue-100 text-blue-800' :
                        assignment.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                        'bg-success-100 text-success-800'
                      }`}>
                        {assignment.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Button size="sm" variant="outline">View</Button>
                    </td>
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
