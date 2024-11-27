import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Briefcase, MapPin, Users, Calendar, ArrowLeft,
  CheckCircle, AlertCircle, Shield
} from 'lucide-react';
import type { Job } from '../types';
import { jobService } from '../services/jobService';

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;
      
      try {
        const data = await jobService.getJob(id);
        setJob(data);
      } catch (err) {
        setError('Failed to load job details. Please try again later.');
        console.error('Error fetching job:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center py-12">
          <p className="text-red-500">{error || 'Job not found'}</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/jobs')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Jobs
      </button>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">{job.jobNumber}</h2>
            </div>
            <p className="text-gray-600">{job.description}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-500" />
            <span className="text-gray-600">{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span className="text-gray-600">
              Started: {new Date(job.startDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-500" />
            <span className="text-gray-600">{job.team.length} team members</span>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Team Members</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {job.team.map((member, index) => (
              <div key={index} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">{member}</span>
              </div>
            ))}
          </div>
        </div>

        {job.tasks.length > 0 && (
          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tasks</h3>
            <div className="space-y-4">
              {job.tasks.map((task) => (
                <div key={task.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{task.title}</h4>
                      <p className="text-gray-600 mt-1">Assigned to: {task.assignee}</p>

                      <div className="mt-4">
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

                      <div className="mt-2">
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
                    <CheckCircle className={`w-5 h-5 ${
                      task.status === 'completed' ? 'text-green-500' : 'text-gray-300'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}