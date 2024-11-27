import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import SafetyChecklist from './safety/SafetyChecklist';
import SafetyDashboard from './SafetyDashboard';
import JobOverview from './JobOverview';
import CountdownTimer from './CountdownTimer';
import DailyStats from './DailyStats';
import AttendanceTracker from './AttendanceTracker';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CountdownTimer />
        </div>
        <DailyStats />
      </div>
      <AttendanceTracker />
      <SafetyChecklist />
      <SafetyDashboard />
      <JobOverview />
    </div>
  );
}