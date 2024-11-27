import type { Job, SafetyTopic, JobTask } from '../types';

// Mock data
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
      tasks: [
        {
          id: 'task-1',
          title: 'Site Assessment',
          assignee: 'John Smith',
          status: 'completed',
          hazards: ['Heights', 'Electrical'],
          controls: ['Safety Harness', 'Licensed Electrician']
        }
      ]
    },
    {
      id: '2',
      jobNumber: 'JOB-2024-002',
      location: 'South Bank',
      team: ['Mike Brown', 'Emily White'],
      status: 'pending',
      startDate: new Date().toISOString(),
      description: 'Residential renovation',
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
    },
    {
      id: '2',
      title: 'Electrical Safety',
      description: 'Guidelines for electrical work',
      category: 'Electrical',
      lastReviewed: new Date().toISOString()
    }
  ],
  tasks: [
    {
      id: '1',
      title: 'Equipment Check',
      assignee: 'John Smith',
      status: 'pending',
      hazards: ['Electrical'],
      controls: ['PPE']
    }
  ]
};

class ApiService {
  private static instance: ApiService;

  private constructor() {}

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  async getJobs(): Promise<Job[]> {
    return Promise.resolve(MOCK_DATA.jobs);
  }

  async getJob(id: string): Promise<Job | undefined> {
    return Promise.resolve(MOCK_DATA.jobs.find(job => job.id === id));
  }

  async getSafetyTopics(): Promise<SafetyTopic[]> {
    return Promise.resolve(MOCK_DATA.safetyTopics);
  }

  async getJobTasks(jobId: string): Promise<JobTask[]> {
    const job = MOCK_DATA.jobs.find(j => j.id === jobId);
    return Promise.resolve(job?.tasks || []);
  }

  async testConnection(): Promise<boolean> {
    return Promise.resolve(true);
  }
}

export const apiService = ApiService.getInstance();