import React, { useEffect, useState } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle } from 'lucide-react';
import type { SafetyTopic } from '../types';
import { jobService } from '../services/jobService';

export default function SafetyDashboard() {
  const [topics, setTopics] = useState<SafetyTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await jobService.getSafetyTopics();
        setTopics(data);
      } catch (err) {
        setError('Failed to load safety topics. Please try again later.');
        console.error('Error fetching safety topics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-800">Safety Dashboard</h2>
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          Mark All Reviewed
        </button>
      </div>

      <div className="grid gap-6">
        {topics.map((topic) => (
          <div key={topic.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{topic.title}</h3>
                <p className="text-gray-600 mt-1">{topic.description}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="bg-blue-100 text-blue-800 text-sm px-2.5 py-0.5 rounded">
                    {topic.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    Last reviewed: {new Date(topic.lastReviewed).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}