'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input, TextArea, Select } from '@/components/common/FormElements';
import { useForm } from '@/lib/hooks/useCustomHooks';
import Link from 'next/link';
import { ChevronLeft, Save } from 'lucide-react';

const initialValues = {
  title: '',
  description: '',
  location: '',
  priority: 'MEDIUM',
  department: 'engineering',
  estimatedHours: '',
};

export default function CreateWorkOrderPage() {
  const form = useForm(initialValues);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    form.setIsSubmitting(true);
    // TODO: Submit to API
    setTimeout(() => {
      form.setIsSubmitting(false);
    }, 1000);
  };

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
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create Work Order</h1>
          <p className="text-gray-600 mt-2">Fill in the details to create a new work order</p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Title"
                placeholder="e.g., Fix HVAC System"
                name="title"
                value={form.values.title}
                onChange={form.handleChange}
                required
              />

              <Select
                label="Priority"
                name="priority"
                value={form.values.priority}
                onChange={form.handleChange}
                options={[
                  { value: 'LOW', label: 'Low' },
                  { value: 'MEDIUM', label: 'Medium' },
                  { value: 'HIGH', label: 'High' },
                  { value: 'URGENT', label: 'Urgent' },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Location"
                placeholder="e.g., Room 301"
                name="location"
                value={form.values.location}
                onChange={form.handleChange}
                required
              />

              <Select
                label="Department"
                name="department"
                value={form.values.department}
                onChange={form.handleChange}
                options={[
                  { value: 'engineering', label: 'Engineering' },
                  { value: 'maintenance', label: 'Maintenance' },
                  { value: 'housekeeping', label: 'Housekeeping' },
                ]}
              />
            </div>

            <TextArea
              label="Description"
              placeholder="Provide detailed description of the work to be done..."
              name="description"
              value={form.values.description}
              onChange={form.handleChange}
              rows={6}
              required
            />

            <Input
              label="Estimated Hours"
              type="number"
              placeholder="2"
              name="estimatedHours"
              value={form.values.estimatedHours}
              onChange={form.handleChange}
            />

            <div className="flex gap-4 justify-end pt-6 border-t border-gray-200">
              <Link href="/dashboard/work-orders">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" loading={form.isSubmitting}>
                <Save className="w-4 h-4 mr-2" />
                Create Work Order
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
