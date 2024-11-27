import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import type { ChecklistItem } from '@/types';

interface Props {
  item: ChecklistItem;
  checked: boolean;
  onToggle: (itemId: string) => void;
}

export default function SafetyChecklistItem({ item, checked, onToggle }: Props) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
      <button
        onClick={() => onToggle(item.id)}
        className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center ${
          checked
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-gray-300'
        }`}
      >
        {checked && <CheckCircle2 className="w-3 h-3" />}
      </button>
      
      <span className="flex-grow text-gray-700 text-sm">{item.text}</span>
      
      {item.critical && !checked && (
        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
      )}
    </div>
  );
}