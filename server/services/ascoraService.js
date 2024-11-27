import axios from 'axios';
import { config } from '../config.js';

export class AscoraService {
  constructor() {
    this.api = axios.create({
      baseURL: config.ascoraApi.baseUrl,
      headers: {
        'Authorization': `Bearer ${config.ascoraApi.key}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async getDailySchedule(date) {
    try {
      const response = await this.api.get(`/schedule/${date}`);
      return response.data;
    } catch (error) {
      console.error('Ascora API Error:', error.response?.data || error.message);
      throw error;
    }
  }

  async getJobDetails(jobId) {
    try {
      const response = await this.api.get(`/jobs/${jobId}`);
      return response.data;
    } catch (error) {
      console.error('Ascora API Error:', error.response?.data || error.message);
      throw error;
    }
  }

  async getKPIs(date) {
    try {
      const response = await this.api.get(`/kpis/${date}`);
      return response.data;
    } catch (error) {
      console.error('Ascora API Error:', error.response?.data || error.message);
      throw error;
    }
  }

  async updateJobNotes(jobId, notes) {
    try {
      const response = await this.api.put(`/jobs/${jobId}/notes`, notes);
      return response.data;
    } catch (error) {
      console.error('Ascora API Error:', error.response?.data || error.message);
      throw error;
    }
  }

  async getTeamAttendance(date) {
    try {
      const response = await this.api.get(`/attendance/${date}`);
      return response.data;
    } catch (error) {
      console.error('Ascora API Error:', error.response?.data || error.message);
      throw error;
    }
  }
}