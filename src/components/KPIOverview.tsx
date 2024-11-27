import React, { useEffect, useState } from 'react';
import { AlertTriangle, Clock, FileText, Users } from 'lucide-react';
import { ascoraService } from '../services/ascoraService';

interface KPIData {
  overdueReports: number;
  pendingClaims: number;
  incompleteDocumentation: number;
  averageResponseTime: number;
}

export default function KPIOverview() {
  const [kpiData, setKpiData] = useState<KPIData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        const data = await ascoraService.getOverdueKPIs();
        setKpiData(data);
      } catch (err) {
        setError('Failed to load KPI data');
        console.error('Error fetching KPIs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchKPIs();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !kpiData) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  const kpiItems = [
    {
      icon: FileText,
      label: 'Overdue Reports',
      value: kpiData.overdueReports,
      color: 'text-red-600',
      bg: 'bg-red-50',
      warning: kpiData.overdueReports > 0
    },
    {
      icon: Users,
      label: 'Pending Claims',
      value: kpiData.pendingClaims,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
      warning: kpiData.pendingClaims > 5
    },
    {
      icon: AlertTriangle,
      label: 'Incomplete Docs',
      value: kpiData.incompleteDocumentation,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      warning: kpiData.incompleteDocumentation > 0
    },
    {
      icon: Clock,
      label: 'Avg Response Time',
      value: `${kpiData.averageResponseTime}m`,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      warning: kpiData.averageResponseTime > 60
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">KPI Overview</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {kpiItems.map((item, index) => (
          <div
            key={index}
            className={`${item.bg} p-4 rounded-lg ${
              item.warning ? 'animate-pulse' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <item.icon className={`w-5 h-5 ${item.color}`} />
              {item.warning && (
                <AlertTriangle className="w-4 h-4 text-red-500" />
              )}
            </div>
            <div className={`text-2xl font-bold ${item.color}`}>
              {item.value}
            </div>
            <div className="text-sm text-gray-600">{item.label}</div>
          </div>
        ))}
      </div>

      {kpiItems.some(item => item.warning) && (
        <div className="mt-4 p-3 bg-red-50 rounded-lg">
          <div className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="w-5 h-5" />
            <p className="text-sm font-medium">
              Action required: Some KPIs are not meeting targets
            </p>
          </div>
        </div>
      )}
    </div>
  );
}