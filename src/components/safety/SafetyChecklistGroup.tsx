import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import SafetyChecklistItem from './SafetyChecklistItem';
import type { ChecklistGroup } from '@/types';

interface Props {
  group: ChecklistGroup;
  expanded: boolean;
  checkedItems: Set<string>;
  onToggleGroup: (groupId: string) => void;
  onToggleItem: (itemId: string) => void;
  progress: number;
}

export default function SafetyChecklistGroup({
  group,
  expanded,
  checkedItems,
  onToggleGroup,
  onToggleItem,
  progress
}: Props) {
  return (
    <div className="border rounded-lg">
      <button
        onClick={() => onToggleGroup(group.id)}
        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          {expanded ? (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          )}
          <h4 className="font-medium text-gray-700">{group.title}</h4>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-20 h-1.5 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm text-gray-600">
            {progress}%
          </span>
        </div>
      </button>

      {expanded && (
        <div className="p-3 space-y-2">
          {group.items.map((item) => (
            <SafetyChecklistItem
              key={item.id}
              item={item}
              checked={checkedItems.has(item.id)}
              onToggle={onToggleItem}
            />
          ))}
        </div>
      )}
    </div>
  );
}