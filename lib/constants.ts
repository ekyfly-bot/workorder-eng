// Constants untuk aplikasi

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    SIGNUP: '/auth/signup',
    REFRESH: '/auth/refresh',
  },
  WORK_ORDERS: {
    LIST: '/work-orders',
    CREATE: '/work-orders',
    GET: (id: string) => `/work-orders/${id}`,
    UPDATE: (id: string) => `/work-orders/${id}`,
    DELETE: (id: string) => `/work-orders/${id}`,
    COMMENTS: (id: string) => `/work-orders/${id}/comments`,
    ATTACHMENTS: (id: string) => `/work-orders/${id}/attachments`,
    HISTORY: (id: string) => `/work-orders/${id}/history`,
  },
  ASSIGNMENTS: {
    LIST: '/assignments',
    CREATE: '/assignments',
    GET: (id: string) => `/assignments/${id}`,
    UPDATE: (id: string) => `/assignments/${id}`,
    DELETE: (id: string) => `/assignments/${id}`,
    APPROVE: (id: string) => `/assignments/${id}/approve`,
    REJECT: (id: string) => `/assignments/${id}/reject`,
  },
  USERS: {
    LIST: '/users',
    CREATE: '/users',
    GET: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
    ME: '/users/me',
  },
  ANALYTICS: {
    DASHBOARD: '/analytics/dashboard',
    WORK_ORDERS: '/analytics/work-orders',
    STAFF_PERFORMANCE: '/analytics/staff-performance',
    GENERATE_REPORT: '/analytics/reports/generate',
  },
  UPLOADS: {
    FILE: '/uploads/file',
  },
};

// Work Order Status
export const WORK_ORDER_STATUS = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CLOSED: 'CLOSED',
} as const;

export const WORK_ORDER_STATUS_LABEL = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CLOSED: 'Closed',
} as const;

export const WORK_ORDER_STATUS_COLOR = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  IN_PROGRESS: 'bg-blue-100 text-blue-800',
  COMPLETED: 'bg-green-100 text-green-800',
  CLOSED: 'bg-gray-100 text-gray-800',
} as const;

// Work Order Priority
export const WORK_ORDER_PRIORITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
} as const;

export const WORK_ORDER_PRIORITY_LABEL = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  URGENT: 'Urgent',
} as const;

export const WORK_ORDER_PRIORITY_COLOR = {
  LOW: 'bg-green-100 text-green-800',
  MEDIUM: 'bg-blue-100 text-blue-800',
  HIGH: 'bg-orange-100 text-orange-800',
  URGENT: 'bg-red-100 text-red-800',
} as const;

// User Roles
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  SUPERVISOR: 'SUPERVISOR',
  STAFF: 'STAFF',
  MANAGER: 'MANAGER',
} as const;

export const USER_ROLE_LABEL = {
  ADMIN: 'Administrator',
  SUPERVISOR: 'Supervisor',
  STAFF: 'Staff',
  MANAGER: 'Manager',
} as const;

// Permissions by Role
export const ROLE_PERMISSIONS = {
  ADMIN: [
    'create_work_order',
    'edit_work_order',
    'delete_work_order',
    'assign_work_order',
    'approve_work_order',
    'manage_users',
    'view_analytics',
    'export_reports',
  ],
  SUPERVISOR: [
    'create_work_order',
    'edit_work_order',
    'assign_work_order',
    'approve_work_order',
    'view_team_analytics',
  ],
  STAFF: [
    'view_assigned_work_orders',
    'update_work_order_status',
    'add_comments',
    'upload_attachments',
  ],
  MANAGER: [
    'view_analytics',
    'export_reports',
    'view_team_performance',
  ],
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  THEME: 'theme',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed',
};

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZES = [10, 25, 50, 100];

// File Upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];

// Date Formats
export const DATE_FORMAT = 'dd/MM/yyyy';
export const DATETIME_FORMAT = 'dd/MM/yyyy HH:mm';
export const TIME_FORMAT = 'HH:mm';

// Request Timeout
export const REQUEST_TIMEOUT = 30000; // 30 seconds

// Retry Configuration
export const RETRY_CONFIG = {
  MAX_RETRIES: 3,
  INITIAL_DELAY: 1000,
  MAX_DELAY: 10000,
  BACKOFF_MULTIPLIER: 2,
};

// Notification Types
export const NOTIFICATION_TYPES = {
  ASSIGNMENT: 'ASSIGNMENT',
  APPROVAL: 'APPROVAL',
  COMMENT: 'COMMENT',
  COMPLETION: 'COMPLETION',
  UPDATE: 'UPDATE',
} as const;

// Messages
export const MESSAGES = {
  SUCCESS: 'Operation completed successfully',
  ERROR: 'An error occurred. Please try again.',
  LOADING: 'Loading...',
  NO_DATA: 'No data available',
  CONFIRM_DELETE: 'Are you sure you want to delete this item?',
  CONFIRM_ACTION: 'Are you sure you want to perform this action?',
};
