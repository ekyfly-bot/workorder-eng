'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/api';
import { Assignment, PaginatedResponse } from '@/lib/types';
import { API_ENDPOINTS } from '@/lib/constants';

export function useAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchAssignments = async (page = 1, pageSize = 10, filters?: any) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<PaginatedResponse<Assignment>>(
        API_ENDPOINTS.ASSIGNMENTS.LIST,
        {
          params: {
            page,
            pageSize,
            ...filters,
          },
        }
      );

      setAssignments(response.data);
      setTotal(response.total);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createAssignment = async (data: Partial<Assignment>) => {
    try {
      const response = await apiClient.post<Assignment>(
        API_ENDPOINTS.ASSIGNMENTS.CREATE,
        data
      );
      setAssignments((prev) => [response, ...prev]);
      return response;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateAssignment = async (id: string, data: Partial<Assignment>) => {
    try {
      const response = await apiClient.put<Assignment>(
        API_ENDPOINTS.ASSIGNMENTS.UPDATE(id),
        data
      );
      setAssignments((prev) =>
        prev.map((a) => (a.id === id ? response : a))
      );
      return response;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteAssignment = async (id: string) => {
    try {
      await apiClient.delete(API_ENDPOINTS.ASSIGNMENTS.DELETE(id));
      setAssignments((prev) => prev.filter((a) => a.id !== id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    assignments,
    loading,
    error,
    total,
    fetchAssignments,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
}
