import React from 'react';
import { Shield } from 'lucide-react';
import SafetyChecklistSection from './SafetyChecklistSection';
import { useSafetyChecklist } from '@/hooks/useSafetyChecklist';
import { sections } from '@/data/safetyChecklist';
import type { ChecklistGroup } from '@/types/safety';

export default function SafetyChecklist() {
  const {
    state,
    toggleItem,
    toggleSection,
    toggleGroup,
    getCheckedPercentage,
    getSectionProgress,
    getGroupProgress
  } = useSafetyChecklist(sections);

  const handleGroupProgress = (group: ChecklistGroup) => {
    return getGroupProgress(group);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Safety Checklist</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Overall Progress:</span>
          <div className="w-32 h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${getCheckedPercentage()}%` }}
            />
          </div>
          <span className="font-bold text-blue-600">{getCheckedPercentage()}%</span>
        </div>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <SafetyChecklistSection
            key={section.id}
            section={section}
            expanded={state.expandedSections.has(section.id)}
            expandedGroups={state.expandedGroups}
            checkedItems={state.checkedItems}
            onToggleSection={toggleSection}
            onToggleGroup={toggleGroup}
            onToggleItem={toggleItem}
            progress={getSectionProgress(section)}
            getGroupProgress={handleGroupProgress}
          />
        ))}
      </div>
    </div>
  );
}