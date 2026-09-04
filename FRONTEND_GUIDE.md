# Frontend Implementation Guide

## Components Overview

### Common Components

#### Button
```tsx
import { Button } from '@/components/common/Button';

// Basic button
<Button>Click me</Button>

// With variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
<Button variant="outline">Outline</Button>

// With size
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Loading state
<Button loading={isLoading}>Submit</Button>

// Full width
<Button fullWidth>Full Width</Button>
```

#### Card
```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/common/Card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
  <CardFooter>
    Footer with actions
  </CardFooter>
</Card>
```

#### Form Elements
```tsx
import { Input, TextArea, Select } from '@/components/common/FormElements';

// Input
<Input 
  label="Email"
  type="email"
  placeholder="user@example.com"
  error="Email is required"
/>

// TextArea
<TextArea
  label="Description"
  rows={5}
/>

// Select
<Select
  label="Status"
  options={[
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ]}
/>
```

#### Modal
```tsx
import { Modal } from '@/components/common/Modal';

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  size="md"
>
  <p>Are you sure you want to proceed?</p>
</Modal>
```

#### Alert
```tsx
import { Alert } from '@/components/common/Alert';

<Alert type="success" title="Success" message="Operation completed successfully" closeable />
<Alert type="error" title="Error" message="Something went wrong" closeable />
<Alert type="warning" title="Warning" message="Please check your input" closeable />
<Alert type="info" title="Info" message="This is an informational message" closeable />
```

### Custom Hooks

#### useAuth
```tsx
import { useAuth } from '@/lib/hooks/useCustomHooks';

const { user, isAuthenticated, isLoading, login, logout } = useAuth();

// Login
const result = await login(email, password);
if (result.success) {
  // Redirect to dashboard
}

// Logout
await logout();
```

#### useForm
```tsx
import { useForm } from '@/lib/hooks/useCustomHooks';

const form = useForm({
  email: '',
  password: '',
});

// In JSX
<Input
  name="email"
  value={form.values.email}
  onChange={form.handleChange}
  onBlur={form.handleBlur}
  error={form.touched.email ? form.errors.email : ''}
/>

// Submit
const handleSubmit = async (e) => {
  e.preventDefault();
  form.setIsSubmitting(true);
  try {
    await submitForm(form.values);
  } finally {
    form.setIsSubmitting(false);
  }
};
```

#### useWorkOrders
```tsx
import { useWorkOrders } from '@/lib/hooks/useWorkOrders';

const {
  workOrders,
  loading,
  error,
  total,
  fetchWorkOrders,
  createWorkOrder,
  updateWorkOrder,
  deleteWorkOrder,
} = useWorkOrders();

// Fetch work orders
useEffect(() => {
  fetchWorkOrders(1, 10);
}, []);

// Create
await createWorkOrder({
  title: 'New Task',
  description: 'Description',
  priority: 'HIGH',
});

// Update
await updateWorkOrder('wo-123', {
  status: 'COMPLETED',
});

// Delete
await deleteWorkOrder('wo-123');
```

## Routing Structure

```
/ → Home page with features
/auth/login → Login page
/auth/register → Registration page
/auth/forgot-password → Password recovery
/dashboard → Dashboard home (protected)
/dashboard/work-orders → Work orders list
/dashboard/work-orders/create → Create work order
/dashboard/work-orders/:id → Work order detail
/dashboard/assignments → Assignments management
/dashboard/analytics → Analytics dashboard
/dashboard/users → User management
/dashboard/settings → User settings
```

## API Integration

### Making API Requests

```tsx
import { apiClient } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';

// GET
const data = await apiClient.get(API_ENDPOINTS.WORK_ORDERS.LIST);

// POST
const newOrder = await apiClient.post(
  API_ENDPOINTS.WORK_ORDERS.CREATE,
  { title: 'New Order', ... }
);

// PUT
const updated = await apiClient.put(
  API_ENDPOINTS.WORK_ORDERS.UPDATE('wo-123'),
  { status: 'COMPLETED' }
);

// DELETE
await apiClient.delete(API_ENDPOINTS.WORK_ORDERS.DELETE('wo-123'));
```

### Error Handling

```tsx
try {
  const data = await apiClient.get('/endpoint');
} catch (error) {
  // Error object has: message, code, details
  console.error(error.message);
  console.error(error.code);
}
```

## Styling

### Tailwind CSS Custom Colors

```tsx
// Primary colors
<div className="bg-primary-500 text-primary-900">
  Primary content
</div>

// Status colors
<div className="bg-success-500">Success</div>
<div className="bg-danger-500">Danger</div>
<div className="bg-warning-500">Warning</div>
```

### Responsive Design

```tsx
// Mobile-first approach
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 1 column on mobile, 2 on tablet, 3 on desktop */}
</div>
```

## Building & Deployment

### Development
```bash
npm run dev
# Open http://localhost:3000
```

### Production Build
```bash
npm run build
npm run start
```

### Deployment Options
- Vercel (recommended for Next.js)
- AWS S3 + CloudFront
- DigitalOcean App Platform
- Google Cloud Run
- Docker + Kubernetes
