import React, { useState, useEffect } from 'react';
import { MessageSquare, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { ascoraService } from '../services/ascoraService';
import type { Job } from '../types';

export default function JobDiscussion() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [notes, setNotes] = useState({
    clientDiscussion: '',
    improvements: '',
    issues: '',
    followupRequired: false
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const schedule = await ascoraService.getDailySchedule();
        setJobs(schedule);
        if (schedule.length > 0) {
          setSelectedJob(schedule[0].id);
        }
      } catch (err) {
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      if (!selectedJob) return;

      try {
        const jobNotes = await ascoraService.getJobNotes(selectedJob);
        setNotes(jobNotes);
      } catch (err) {
        console.error('Error fetching job notes:', err);
      }
    };

    fetchNotes();
  }, [selectedJob]);

  const handleSave = async () => {
    if (!selectedJob) return;

    setSaving(true);
    try {
      await ascoraService.updateJobNotes(selectedJob, notes);
    } catch (err) {
      console.error('Error saving notes:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Job Discussion</h2>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white" />
          ) : (
            <CheckCircle2 className="w-4 h-4" />
          )}
          Save Notes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Jobs</h3>
          <div className="space-y-3">
            {jobs.map((job) => (
              <button
                key={job.id}
                onClick={() => setSelectedJob(job.id)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedJob === job.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{job.jobNumber}</p>
                    <p className="text-sm text-gray-600">{job.location}</p>
                  </div>
                  <ArrowRight className={`w-4 h-4 ${
                    selectedJob === job.id ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Client Discussion Notes
            </label>
            <textarea
              value={notes.clientDiscussion}
              onChange={(e) => setNotes({ ...notes, clientDiscussion: e.target.value })}
              rows={3}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter notes from client discussions..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Issues Encountered
            </label>
            <textarea
              value={notes.issues}
              onChange={(e) => setNotes({ ...notes, issues: e.target.value })}
              rows={3}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Document any issues or challenges..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Suggested Improvements
            </label>
            <textarea
              value={notes.improvements}
              onChange={(e) => setNotes({ ...notes, improvements: e.target.value })}
              rows={3}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Note any potential improvements..."
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="followup"
              checked={notes.followupRequired}
              onChange={(e) => setNotes({ ...notes, followupRequired: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="followup" className="text-sm font-medium text-gray-700">
              Follow-up Required
            </label>
          </div>

          {notes.followupRequired && (
            <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <p className="text-sm text-yellow-800">
                This job has been marked for follow-up. Please ensure all required actions are documented.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}