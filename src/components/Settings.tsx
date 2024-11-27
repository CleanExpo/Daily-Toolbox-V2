import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Key, Save, X, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { apiService } from '../services/api';

export default function Settings() {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useLocalStorage<string>('ascora-api-key', '');
  const [tempApiKey, setTempApiKey] = useState(apiKey);
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const testApiKey = async (key: string) => {
    setStatus('testing');
    try {
      // Test the API key by making a simple request
      await apiService.testConnection(key);
      setStatus('success');
      setErrorMessage('');
      return true;
    } catch (error) {
      setStatus('error');
      setErrorMessage('Invalid API key or connection failed');
      return false;
    }
  };

  const handleSave = async () => {
    if (!tempApiKey) {
      setStatus('error');
      setErrorMessage('API key is required');
      return;
    }

    const isValid = await testApiKey(tempApiKey);
    if (isValid) {
      setApiKey(tempApiKey);
      // Reload the application to apply new API key
      window.location.reload();
    }
  };

  const handleReset = () => {
    setTempApiKey(apiKey);
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
        title="Settings"
      >
        <SettingsIcon className="w-6 h-6 text-gray-600" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Settings</h2>
              <button
                onClick={() => {
                  handleReset();
                  setIsOpen(false);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ASCORA API Key
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={tempApiKey}
                    onChange={(e) => {
                      setTempApiKey(e.target.value);
                      setStatus('idle');
                    }}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your API key"
                  />
                </div>
                {status === 'error' && (
                  <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{errorMessage}</span>
                  </div>
                )}
                {status === 'success' && (
                  <div className="mt-2 flex items-center gap-2 text-green-600 text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>API key validated successfully</span>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  Your API key is stored securely in your browser's local storage.
                  The key is required to fetch data from the ASCORA CRM system.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-4 border-t bg-gray-50 rounded-b-lg">
              <button
                onClick={() => {
                  handleReset();
                  setIsOpen(false);
                }}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={status === 'testing'}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {status === 'testing' ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}