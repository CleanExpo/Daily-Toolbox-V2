import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import SafetyChecklistGroup from './SafetyChecklistGroup';
import type { ChecklistSection } from '@/types';

interface Props {
  section: ChecklistSection;
  expanded: boolean;
  expandedGroups: Set<string>;
  checkedItems: Set<string>;
  onToggleSection: (sectionId: string) => void;
  onToggleGroup: (groupId: string) => void;
  onToggleItem: (itemId: string) => void;
  progress: number;
  getGroupProgress: (group: any) => number;
}

export default function SafetyChecklistSection({
  section,
  expanded,
  expandedGroups,
  checkedItems,
  onToggleSection,
  onToggleGroup,
  onToggleItem,
  progress,
  getGroupProgress
}: Props) {
  if (!section || !section.groups) {
    return null;
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        onClick={() => onToggleSection(section.id)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          {expanded ? (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          )}
          <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-24 h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-600">
            {progress}%
          </span>
        </div>
      </button>

      {expanded && (
        <div className="p-4 space-y-4">
          {section.groups.map((group) => (
            <SafetyChecklistGroup
              key={group.id}
              group={group}
              expanded={expandedGroups.has(group.id)}
              checkedItems={checkedItems}
              onToggleGroup={onToggleGroup}
              onToggleItem={onToggleItem}
              progress={getGroupProgress(group)}
            />
          ))}
        </div>
      )}
    </div>
  );
}