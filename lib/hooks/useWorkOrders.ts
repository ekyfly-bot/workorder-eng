'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/api';
import { WorkOrder, PaginatedResponse } from '@/lib/types';
import { API_ENDPOINTS } from '@/lib/constants';

export function useWorkOrders() {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchWorkOrders = async (page = 1, pageSize = 10, filters?: any) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<PaginatedResponse<WorkOrder>>(
        API_ENDPOINTS.WORK_ORDERS.LIST,
        {
          params: {
            page,
            pageSize,
            ...filters,
          },
        }
      );

      setWorkOrders(response.data);
      setTotal(response.total);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createWorkOrder = async (data: Partial<WorkOrder>) => {
    try {
      const response = await apiClient.post<WorkOrder>(
        API_ENDPOINTS.WORK_ORDERS.CREATE,
        data
      );
      setWorkOrders((prev) => [response, ...prev]);
      return response;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateWorkOrder = async (id: string, data: Partial<WorkOrder>) => {
    try {
      const response = await apiClient.put<WorkOrder>(
        API_ENDPOINTS.WORK_ORDERS.UPDATE(id),
        data
      );
      setWorkOrders((prev) =>
        prev.map((wo) => (wo.id === id ? response : wo))
      );
      return response;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteWorkOrder = async (id: string) => {
    try {
      await apiClient.delete(API_ENDPOINTS.WORK_ORDERS.DELETE(id));
      setWorkOrders((prev) => prev.filter((wo) => wo.id !== id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    workOrders,
    loading,
    error,
    total,
    fetchWorkOrders,
    createWorkOrder,
    updateWorkOrder,
    deleteWorkOrder,
  };
}
