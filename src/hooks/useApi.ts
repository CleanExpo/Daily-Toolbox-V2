import { useState, useEffect } from 'react';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const MOCK_DATA = {
  jobs: [
    {
      id: '1',
      jobNumber: 'JOB-2024-001',
      location: 'Brisbane CBD',
      team: ['John Smith', 'Sarah Johnson'],
      status: 'in-progress',
      startDate: new Date().toISOString(),
      description: 'Commercial building restoration',
      tasks: []
    }
  ],
  safetyTopics: [
    {
      id: '1',
      title: 'Working at Heights',
      description: 'Safety procedures for elevated work',
      category: 'Fall Protection',
      lastReviewed: new Date().toISOString()
    }
  ]
};

export function useApi<T>(fetchFn: () => Promise<T>) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    // Determine which mock data to return based on the function name
    const endpoint = fetchFn.name.toLowerCase();
    const mockData = MOCK_DATA[endpoint.includes('jobs') ? 'jobs' : 'safetyTopics'];

    setState({
      data: mockData as T,
      loading: false,
      error: null
    });
  }, [fetchFn]);

  return state;
}