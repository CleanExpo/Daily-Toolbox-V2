import { apiService } from './api';
import type { Job, JobTask, DailyReport } from '../types';

class AscoraService {
  private static instance: AscoraService;
  
  private constructor() {}

  static getInstance(): AscoraService {
    if (!AscoraService.instance) {
      AscoraService.instance = new AscoraService();
    }
    return AscoraService.instance;
  }

  async getDailySchedule(): Promise<Job[]> {
    const today = new Date().toISOString().split('T')[0];
    return apiService.get<Job[]>(`/jobs/schedule/${today}`);
  }

  async getOverdueKPIs(): Promise<{
    overdueReports: number;
    pendingClaims: number;
    incompleteDocumentation: number;
    averageResponseTime: number;
  }> {
    return apiService.get('/jobs/kpi/overdue');
  }

  async getDailyReport(): Promise<DailyReport> {
    const today = new Date().toISOString().split('T')[0];
    return apiService.get(`/reports/daily/${today}`);
  }

  async getJobNotes(jobId: string): Promise<{
    clientDiscussion: string;
    improvements: string;
    issues: string;
    followupRequired: boolean;
  }> {
    return apiService.get(`/jobs/${jobId}/notes`);
  }

  async updateJobNotes(jobId: string, notes: {
    clientDiscussion: string;
    improvements: string;
    issues: string;
    followupRequired: boolean;
  }): Promise<void> {
    return apiService.put(`/jobs/${jobId}/notes`, notes);
  }
}

export const ascoraService = AscoraService.getInstance();