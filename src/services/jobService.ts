import { apiService } from './api';
import type { Job, JobTask, SafetyTopic } from '../types';

class JobService {
  async getJobs(): Promise<Job[]> {
    return apiService.getJobs();
  }

  async getJob(id: string): Promise<Job | undefined> {
    return apiService.getJob(id);
  }

  async getJobTasks(jobId: string): Promise<JobTask[]> {
    return apiService.getJobTasks(jobId);
  }

  async getSafetyTopics(): Promise<SafetyTopic[]> {
    return apiService.getSafetyTopics();
  }
}

export const jobService = new JobService();