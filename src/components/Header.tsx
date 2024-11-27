import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Umbrella, Users, Bell } from 'lucide-react';

export default function Header() {
  const location = useLocation();

  return (
    <header className="bg-white/10 backdrop-blur-md text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 hover:text-blue-100">
              <div className="flex items-center bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                <Umbrella className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Daily Toolbox</h1>
                <p className="text-sm text-blue-100">Disaster Recovery QLD</p>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className={`hover:text-blue-100 transition-colors ${
                  location.pathname === '/' ? 'text-white font-medium' : 'text-blue-100'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/jobs"
                className={`hover:text-blue-100 transition-colors ${
                  location.pathname.startsWith('/jobs') ? 'text-white font-medium' : 'text-blue-100'
                }`}
              >
                Jobs
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}