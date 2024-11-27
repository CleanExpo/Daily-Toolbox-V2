import React from 'react';
import { Users, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

export default function DailyStats() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Today's Overview</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-600">Team Members</span>
          </div>
          <span className="text-2xl font-bold text-blue-600">8</span>
        </div>

        <div className="p-3 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-600">Tasks Complete</span>
          </div>
          <span className="text-2xl font-bold text-green-600">12</span>
        </div>

        <div className="p-3 bg-yellow-50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-yellow-600" />
            <span className="text-sm text-gray-600">Avg Response</span>
          </div>
          <span className="text-2xl font-bold text-yellow-600">45m</span>
        </div>

        <div className="p-3 bg-red-50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span className="text-sm text-gray-600">Pending Safety</span>
          </div>
          <span className="text-2xl font-bold text-red-600">3</span>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Daily Progress</span>
          <span className="text-sm text-gray-500">75%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div className="w-3/4 h-full bg-blue-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}