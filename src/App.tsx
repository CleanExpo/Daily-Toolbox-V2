import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Jobs from './components/Jobs';
import JobDetails from './components/JobDetails';
import Notifications from './components/Notifications';
import Settings from './components/Settings';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-500">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
          </Routes>
        </div>
      </main>
      <Notifications />
      <Settings />
    </div>
  );
}

export default App;