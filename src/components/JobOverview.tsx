import React, { useEffect, useState } from 'react';
import { ClipboardList, Users, Clock, AlertCircle, Shield, Target, Calendar, CheckCircle2 } from 'lucide-react';
import type { JobTask } from '../types';
import { jobService } from '../services/jobService';

export default function JobOverview() {
  const [tasks, setTasks] = useState<JobTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const jobs = await jobService.getJobs();
        if (jobs.length > 0) {
          const jobTasks = await jobService.getJobTasks(jobs[0].id);
          setTasks(jobTasks);
        }
      } catch (err) {
        setError('Failed to load tasks. Please try again later.');
        console.error('Error fetching tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const kpiStats = [
    { label: 'Overdue Tasks', value: '2', color: 'text-red-600', bg: 'bg-red-100' },
    { label: "Today's Claims", value: '8', color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Completed', value: '5', color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Pending Review', value: '3', color: 'text-yellow-600', bg: 'bg-yellow-100' },
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPI Overview */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Target className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">KPI Overview</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {kpiStats.map((stat, index) => (
            <div key={index} className="p-4 rounded-lg border">
              <div className={`inline-flex items-center justify-center p-2 ${stat.bg} rounded-lg mb-3`}>
                <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
              </div>
              <h3 className="text-gray-600 text-sm">{stat.label}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">Today's Schedule</h2>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">8 Technicians Active</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">Avg. Response Time: 45min</span>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {tasks.map((task) => (
            <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                    <p className="text-gray-600">Assigned to: {task.assignee}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-medium text-gray-700">Hazards:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {task.hazards.map((hazard, index) => (
                          <span key={index} className="bg-red-100 text-red-800 text-sm px-2.5 py-0.5 rounded">
                            {hazard}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-gray-700">Controls:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {task.controls.map((control, index) => (
                          <span key={index} className="bg-green-100 text-green-800 text-sm px-2.5 py-0.5 rounded">
                            {control}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <span className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      Est. Time: 2.5 hrs
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      Team Size: 3
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    task.status === 'completed' ? 'bg-green-100 text-green-800' :
                    task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </span>
                  {task.status === 'completed' && (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}