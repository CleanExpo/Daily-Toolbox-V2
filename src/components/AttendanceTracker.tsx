import React, { useState, useEffect } from 'react';
import { Users, Save, Check, Loader2 } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useWeather } from '../services/weatherService';
import type { TeamMember, ToolboxMeeting } from '../types';

const teamMembers: TeamMember[] = [
  // Administration Team
  { id: '1', name: 'Tenikka Pesic', role: 'Administration' },
  { id: '2', name: 'Ben Utreja', role: 'Administration' },
  { id: '3', name: 'Kai McGurk', role: 'Administration' },
  { id: '4', name: 'Bronwyn McGurk', role: 'Administration' },
  { id: '5', name: 'Kay Armstrong', role: 'Administration' },
  
  // Technicians
  { id: '6', name: 'Jack Whitfield', role: 'Technician' },
  { id: '7', name: 'Jye Diesing', role: 'Technician' },
  { id: '8', name: 'Anastasia Armor', role: 'Technician' },
  { id: '9', name: 'Phill McGurk', role: 'Technician' },
  { id: '10', name: 'Nick Stark', role: 'Technician' },
  { id: '11', name: 'Robert Parsons', role: 'Technician' }
];

export default function AttendanceTracker() {
  const [meetings, setMeetings] = useLocalStorage<ToolboxMeeting[]>('toolbox-meetings', []);
  const [attendees, setAttendees] = useState<Set<string>>(new Set());
  const [conductor, setConductor] = useState('');
  const [notes, setNotes] = useState('');
  const [weather, setWeather] = useState('');
  const [temperature, setTemperature] = useState('');
  const [saved, setSaved] = useState(false);
  
  const { weather: localWeather, loading: weatherLoading } = useWeather();
  
  useEffect(() => {
    if (localWeather) {
      setWeather(localWeather.conditions);
      setTemperature(localWeather.temperature.toString());
    }
  }, [localWeather]);

  const toggleAttendee = (memberId: string) => {
    const newAttendees = new Set(attendees);
    if (newAttendees.has(memberId)) {
      newAttendees.delete(memberId);
    } else {
      newAttendees.add(memberId);
    }
    setAttendees(newAttendees);
  };

  const saveMeeting = () => {
    const meeting: ToolboxMeeting = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      attendees: Array.from(attendees),
      checklist: [],
      notes,
      conductor,
      weatherConditions: weather,
      temperature: parseFloat(temperature),
    };

    setMeetings([...meetings, meeting]);
    setSaved(true);
    
    setTimeout(() => {
      setSaved(false);
      setAttendees(new Set());
      setNotes('');
      setConductor('');
      if (localWeather) {
        setWeather(localWeather.conditions);
        setTemperature(localWeather.temperature.toString());
      }
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Attendance Tracker</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Wacol, QLD</span>
          <button
            onClick={saveMeeting}
            disabled={attendees.size === 0 || !conductor}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
              saved
                ? 'bg-green-100 text-green-800'
                : attendees.size === 0 || !conductor
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                Saved
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Meeting
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Meeting Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Conductor
              </label>
              <select
                value={conductor}
                onChange={(e) => setConductor(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select conductor</option>
                {teamMembers
                  .filter((member) => member.role === 'Administration')
                  .map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name} ({member.role})
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weather Conditions
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={weather}
                  onChange={(e) => setWeather(e.target.value)}
                  placeholder="Loading weather..."
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  readOnly={weatherLoading}
                />
                {weatherLoading && (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin" />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Temperature (°C)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  placeholder="Loading..."
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  readOnly={weatherLoading}
                  step="0.1"
                />
                {weatherLoading && (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin" />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter any additional notes or observations..."
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Team Attendance</h3>
          <div className="grid gap-3">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-3 p-3 rounded-lg border hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleAttendee(member.id)}
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    attendees.has(member.id)
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300'
                  }`}
                >
                  {attendees.has(member.id) && <Check className="w-4 h-4" />}
                </button>
                
                <div>
                  <p className="font-medium text-gray-800">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}