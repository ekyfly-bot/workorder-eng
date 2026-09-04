// Work Order Types
export type WorkOrderStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CLOSED';
export type WorkOrderPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface WorkOrder {
  id: string;
  title: string;
  description: string;
  status: WorkOrderStatus;
  priority: WorkOrderPriority;
  location: string;
  assignedTo?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  department: string;
  estimatedHours?: number;
  actualHours?: number;
}

// Assignment Types
export interface Assignment {
  id: string;
  workOrderId: string;
  staffId: string;
  assignedAt: string;
  startedAt?: string;
  completedAt?: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'IN_PROGRESS' | 'COMPLETED';
}

// User Types
export type UserRole = 'ADMIN' | 'SUPERVISOR' | 'STAFF' | 'MANAGER';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  department: string;
  avatar?: string;
  skills?: string[];
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

// Auth Types
export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  department: string;
}

// Comment Types
export interface Comment {
  id: string;
  workOrderId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

// Attachment Types
export interface Attachment {
  id: string;
  workOrderId: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  uploadedBy: string;
  uploadedAt: string;
  description?: string;
}

// Activity/History Types
export interface ActivityLog {
  id: string;
  workOrderId: string;
  userId: string;
  userName: string;
  action: string;
  oldValue?: string;
  newValue?: string;
  timestamp: string;
}

// Analytics Types
export interface KPIMetrics {
  totalWorkOrders: number;
  completedWorkOrders: number;
  pendingWorkOrders: number;
  inProgressWorkOrders: number;
  completionRate: number;
  averageResolutionTime: number;
  averageResolutionTimeUnit: 'hours' | 'days';
}

export interface StaffPerformance {
  staffId: string;
  staffName: string;
  totalAssigned: number;
  completed: number;
  pending: number;
  completionRate: number;
  averageTime: number;
}

export interface WorkOrderChartData {
  status: string;
  count: number;
  percentage: number;
}

// Pagination Types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Filter Types
export interface WorkOrderFilter {
  status?: WorkOrderStatus[];
  priority?: WorkOrderPriority[];
  department?: string;
  assignedTo?: string;
  createdBy?: string;
  startDate?: string;
  endDate?: string;
  searchQuery?: string;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'ASSIGNMENT' | 'APPROVAL' | 'COMMENT' | 'COMPLETION' | 'UPDATE';
  title: string;
  message: string;
  relatedId: string;
  relatedType: string;
  isRead: boolean;
  createdAt: string;
}

// Error Types
export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, string>;
}
