import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

const INTERVAL_MINUTES = 2;

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(INTERVAL_MINUTES * 60);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    const intervalId = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 0) {
          return INTERVAL_MINUTES * 60;
        }
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isActive]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = (timeLeft / (INTERVAL_MINUTES * 60)) * 100;
  const isWarning = timeLeft <= 30;

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTimeLeft(INTERVAL_MINUTES * 60);
    setIsActive(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 relative overflow-hidden">
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-gray-100 w-full">
        <div 
          className={`h-full transition-all duration-1000 ${
            isWarning ? 'bg-red-500' : 'bg-blue-500'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-full ${
            isWarning ? 'bg-red-100' : 'bg-blue-100'
          }`}>
            {isWarning ? (
              <AlertTriangle className={`w-6 h-6 ${
                isWarning ? 'text-red-600' : 'text-blue-600'
              }`} />
            ) : (
              <Clock className="w-6 h-6 text-blue-600" />
            )}
          </div>
          <div>
            <h2 className="font-medium text-gray-700">Safety Check Timer</h2>
            <p className="text-sm text-gray-500">
              {isActive ? 'Counting down' : 'Timer paused'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="flex items-end gap-1">
              <span className={`text-4xl font-bold tabular-nums ${
                isWarning ? 'text-red-600' : 'text-gray-800'
              }`}>
                {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
              </span>
              <span className="text-sm text-gray-500 mb-1">min</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={toggleTimer}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-red-100 text-red-800 hover:bg-red-200'
                  : 'bg-green-100 text-green-800 hover:bg-green-200'
              }`}
            >
              {isActive ? 'Pause' : 'Resume'}
            </button>
            <button
              onClick={resetTimer}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {!isActive && (
        <div className="mt-4 flex items-center gap-2 text-yellow-600 bg-yellow-50 p-3 rounded-lg">
          <AlertTriangle className="w-5 h-5" />
          <p className="text-sm font-medium">
            Timer is paused. Safety checks may be delayed.
          </p>
        </div>
      )}
      
      {timeLeft <= 30 && isActive && (
        <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg animate-pulse">
          <AlertTriangle className="w-5 h-5" />
          <p className="text-sm font-medium">
            Safety check required soon! Less than 30 seconds remaining.
          </p>
        </div>
      )}
    </div>
  );
}