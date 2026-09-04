'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input, Select } from '@/components/common/FormElements';
import { WORK_ORDER_STATUS_LABEL, WORK_ORDER_PRIORITY_LABEL, WORK_ORDER_STATUS_COLOR, WORK_ORDER_PRIORITY_COLOR } from '@/lib/constants';
import { formatDate } from '@/lib/utils';

// Mock data
const mockWorkOrders = Array.from({ length: 12 }).map((_, i) => ({
  id: `WO-${1000 + i}`,
  title: ['Fix HVAC System', 'Replace Light Bulbs', 'Repair Door Lock', 'Plumbing Issue', 'Paint Room'][i % 5],
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  status: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CLOSED'][i % 4],
  priority: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'][i % 4],
  location: `Room ${200 + i}`,
  assignedTo: ['John Doe', 'Jane Smith', 'Mike Johnson'][i % 3],
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  department: ['Engineering', 'Maintenance', 'Housekeeping'][i % 3],
}));

export default function WorkOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const filteredOrders = mockWorkOrders.filter((order) => {
    const matchesSearch =
      order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    const matchesPriority = !priorityFilter || order.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Work Orders</h1>
          <p className="text-gray-600 mt-2">Manage and track all maintenance tasks</p>
        </div>
        <Link href="/dashboard/work-orders/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Work Order
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search className="w-4 h-4 inline mr-2" />
                Search
              </label>
              <Input
                placeholder="Search by ID or title..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            <Select
              label="Status"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              options={[
                { value: '', label: 'All Statuses' },
                { value: 'PENDING', label: 'Pending' },
                { value: 'IN_PROGRESS', label: 'In Progress' },
                { value: 'COMPLETED', label: 'Completed' },
                { value: 'CLOSED', label: 'Closed' },
              ]}
            />

            <Select
              label="Priority"
              value={priorityFilter}
              onChange={(e) => {
                setPriorityFilter(e.target.value);
                setPage(1);
              }}
              options={[
                { value: '', label: 'All Priorities' },
                { value: 'LOW', label: 'Low' },
                { value: 'MEDIUM', label: 'Medium' },
                { value: 'HIGH', label: 'High' },
                { value: 'URGENT', label: 'Urgent' },
              ]}
            />

            <div className="flex items-end">
              <Button
                variant="outline"
                fullWidth
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('');
                  setPriorityFilter('');
                  setPage(1);
                }}
              >
                <Filter className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Work Orders List */}
      <div className="space-y-3">
        {paginatedOrders.length > 0 ? (
          paginatedOrders.map((order) => (
            <Link key={order.id} href={`/dashboard/work-orders/${order.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="font-semibold text-gray-900">{order.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${WORK_ORDER_STATUS_COLOR[order.status as keyof typeof WORK_ORDER_STATUS_COLOR]}`}>
                          {WORK_ORDER_STATUS_LABEL[order.status as keyof typeof WORK_ORDER_STATUS_LABEL]}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${WORK_ORDER_PRIORITY_COLOR[order.priority as keyof typeof WORK_ORDER_PRIORITY_COLOR]}`}>
                          {WORK_ORDER_PRIORITY_LABEL[order.priority as keyof typeof WORK_ORDER_PRIORITY_LABEL]}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <p className="text-gray-500 text-xs">ID</p>
                          <p className="font-medium">{order.id}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Location</p>
                          <p className="font-medium">{order.location}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Assigned To</p>
                          <p className="font-medium">{order.assignedTo || 'Unassigned'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Created</p>
                          <p className="font-medium">{formatDate(order.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-gray-600">No work orders found</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {((page - 1) * itemsPerPage) + 1} to {Math.min(page * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} results
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setPage(i + 1)}
                      className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium ${
                        page === i + 1
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
