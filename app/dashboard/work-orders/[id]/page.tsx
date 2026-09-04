'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Select } from '@/components/common/FormElements';
import Link from 'next/link';
import { ChevronLeft, Clock, MapPin, AlertCircle, User, Calendar } from 'lucide-react';
import { WORK_ORDER_STATUS_LABEL, WORK_ORDER_PRIORITY_LABEL, WORK_ORDER_STATUS_COLOR, WORK_ORDER_PRIORITY_COLOR } from '@/lib/constants';

// Mock data
const mockWorkOrder = {
  id: 'WO-1000',
  title: 'Fix HVAC System - Room 301',
  description: 'The HVAC system in room 301 is not functioning properly. Temperature control is inconsistent.',
  status: 'IN_PROGRESS' as const,
  priority: 'HIGH' as const,
  location: 'Room 301',
  assignedTo: 'John Doe',
  createdBy: 'Jane Smith',
  createdAt: '2024-01-15',
  updatedAt: '2024-01-16',
  estimatedHours: 2,
  actualHours: 1.5,
  department: 'Engineering',
};

export default function WorkOrderDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/work-orders">
          <Button variant="outline" size="sm">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{mockWorkOrder.id}</h1>
          <p className="text-gray-600 mt-2">{mockWorkOrder.title}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status & Priority */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-2">Status</p>
                  <select className={`px-4 py-2 rounded-lg border-2 ${WORK_ORDER_STATUS_COLOR[mockWorkOrder.status]}`}>
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS" selected>In Progress</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CLOSED">Closed</option>
                  </select>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-2">Priority</p>
                  <span className={`px-4 py-2 rounded-lg text-sm font-medium ${WORK_ORDER_PRIORITY_COLOR[mockWorkOrder.priority]}`}>
                    {WORK_ORDER_PRIORITY_LABEL[mockWorkOrder.priority]}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{mockWorkOrder.description}</p>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Activity & Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { user: 'John Doe', action: 'Started work', time: '2 hours ago' },
                  { user: 'Jane Smith', action: 'Assigned to John Doe', time: '1 day ago' },
                  { user: 'Admin', action: 'Created work order', time: '2 days ago' },
                ].map((activity, i) => (
                  <div key={i} className="flex gap-4 pb-4 border-b border-gray-200 last:border-b-0">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.user}</p>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Details */}
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Location</p>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-900">{mockWorkOrder.location}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm font-medium text-gray-600">Department</p>
                <p className="text-gray-900 mt-1">{mockWorkOrder.department}</p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm font-medium text-gray-600">Assigned To</p>
                <p className="text-gray-900 mt-1">{mockWorkOrder.assignedTo}</p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm font-medium text-gray-600">Estimated Time</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-900">{mockWorkOrder.estimatedHours} hours</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm font-medium text-gray-600">Actual Time</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-900">{mockWorkOrder.actualHours || '-'} hours</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm font-medium text-gray-600">Created</p>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-900">{mockWorkOrder.createdAt}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-2">
            <Button fullWidth variant="primary">
              Update Status
            </Button>
            <Button fullWidth variant="outline">
              Reassign
            </Button>
            <Button fullWidth variant="danger">
              Cancel Work Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
