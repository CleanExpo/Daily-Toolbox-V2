import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, Shield, ChevronDown, ChevronRight } from 'lucide-react';

interface ChecklistItem {
  id: string;
  text: string;
  critical: boolean;
}

interface ChecklistGroup {
  id: string;
  title: string;
  items: ChecklistItem[];
}

interface ChecklistSection {
  id: string;
  title: string;
  groups: ChecklistGroup[];
}

export default function SafetyChecklist() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['equipment']));
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const sections: ChecklistSection[] = [
    {
      id: 'equipment',
      title: 'Equipment & Vehicle Safety',
      groups: [
        {
          id: 'equipment-storage',
          title: 'Equipment Storage & Security',
          items: [
            { id: 'equipment-secure', text: 'Equipment properly strapped down and secured', critical: true },
            { id: 'load-distribution', text: 'Load properly distributed and balanced', critical: true },
            { id: 'secure-storage', text: 'Storage compartments properly latched and locked', critical: true }
          ]
        },
        {
          id: 'chemicals',
          title: 'Chemical Management',
          items: [
            { id: 'chemicals-storage', text: 'Chemicals stored correctly and appropriate for tasks', critical: true },
            { id: 'msds-available', text: 'Safety Data Sheets (SDS) readily available', critical: true },
            { id: 'chemical-inventory', text: 'Chemical inventory checked and documented', critical: true }
          ]
        },
        {
          id: 'cleaning-equipment',
          title: 'Cleaning Equipment',
          items: [
            { id: 'vacuum-check', text: 'Vacuums operational with proper filtration', critical: true },
            { id: 'mops-brooms', text: 'Mops and brooms in good condition', critical: true },
            { id: 'extraction-machine', text: 'Extraction machine tested and functioning', critical: true }
          ]
        },
        {
          id: 'tools-equipment',
          title: 'Tools & Technical Equipment',
          items: [
            { id: 'moisture-meters', text: 'Moisture detection equipment calibrated', critical: true },
            { id: 'power-tools', text: 'Power tools inspected and tested', critical: true },
            { id: 'extension-cords', text: 'Extension cords checked for damage', critical: true },
            { id: 'ladders-check', text: 'Ladders inspected and secured properly', critical: true },
            { id: 'rcds-check', text: "RCD's tested and working (min 5 per truck)", critical: true }
          ]
        },
        {
          id: 'supplies',
          title: 'Supplies & Sundries',
          items: [
            { id: 'ppe-complete', text: 'PPE complete and in good condition', critical: true },
            { id: 'first-aid', text: 'First aid kit fully stocked', critical: true },
            { id: 'caution-tape', text: 'Caution tape and safety signage available', critical: true },
            { id: 'emergency-stock', text: 'Emergency response supplies stocked', critical: true }
          ]
        }
      ]
    },
    {
      id: 'vehicle',
      title: 'Vehicle Safety',
      groups: [
        {
          id: 'vehicle-checks',
          title: 'Vehicle Checks',
          items: [
            { id: 'vehicle-roadworthy', text: 'Vehicle is roadworthy and within service history', critical: true },
            { id: 'tires-check', text: 'Tires checked for punctures, pressure, and wear', critical: true },
            { id: 'lights-signals', text: 'All lights and signals functioning properly', critical: true }
          ]
        },
        {
          id: 'trailer-checks',
          title: 'Trailer Safety',
          items: [
            { id: 'trailer-hitch', text: 'Trailer properly hitched and secured', critical: true },
            { id: 'trailer-lights', text: 'Trailer lights and signals functioning', critical: true },
            { id: 'load-secure', text: 'Trailer load properly secured and balanced', critical: true }
          ]
        }
      ]
    },
    {
      id: 'summer-safety',
      title: 'Summer Safety Measures',
      groups: [
        {
          id: 'heat-protection',
          title: 'Heat Protection',
          items: [
            { id: 'hydration', text: 'Water and hydration supplies available', critical: true },
            { id: 'cooling-equipment', text: 'Cooling equipment and shade structures ready', critical: true },
            { id: 'appropriate-clothing', text: 'Team equipped with appropriate summer clothing', critical: true }
          ]
        },
        {
          id: 'break-schedule',
          title: 'Break Schedule',
          items: [
            { id: 'regular-breaks', text: 'Regular break schedule established', critical: true },
            { id: 'shaded-areas', text: 'Shaded break areas identified', critical: true },
            { id: 'heat-monitoring', text: 'Heat stress monitoring system in place', critical: true }
          ]
        }
      ]
    }
  ];

  const toggleItem = (itemId: string) => {
    const newCheckedItems = new Set(checkedItems);
    if (newCheckedItems.has(itemId)) {
      newCheckedItems.delete(itemId);
    } else {
      newCheckedItems.add(itemId);
    }
    setCheckedItems(newCheckedItems);
  };

  const toggleSection = (sectionId: string) => {
    const newExpandedSections = new Set(expandedSections);
    if (newExpandedSections.has(sectionId)) {
      newExpandedSections.delete(sectionId);
    } else {
      newExpandedSections.add(sectionId);
    }
    setExpandedSections(newExpandedSections);
  };

  const toggleGroup = (groupId: string) => {
    const newExpandedGroups = new Set(expandedGroups);
    if (newExpandedGroups.has(groupId)) {
      newExpandedGroups.delete(groupId);
    } else {
      newExpandedGroups.add(groupId);
    }
    setExpandedGroups(newExpandedGroups);
  };

  const getTotalItems = () => {
    return sections.reduce((total, section) => 
      total + section.groups.reduce((groupTotal, group) => 
        groupTotal + group.items.length, 0
      ), 0
    );
  };

  const getCheckedPercentage = () => {
    return Math.round((checkedItems.size / getTotalItems()) * 100);
  };

  const getSectionProgress = (section: ChecklistSection) => {
    const totalItems = section.groups.reduce((total, group) => total + group.items.length, 0);
    const checkedCount = section.groups.reduce((total, group) => 
      total + group.items.filter(item => checkedItems.has(item.id)).length, 0
    );
    return Math.round((checkedCount / totalItems) * 100);
  };

  const getGroupProgress = (group: ChecklistGroup) => {
    const checkedCount = group.items.filter(item => checkedItems.has(item.id)).length;
    return Math.round((checkedCount / group.items.length) * 100);
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
          <div key={section.id} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                {expandedSections.has(section.id) ? (
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
                    style={{ width: `${getSectionProgress(section)}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {getSectionProgress(section)}%
                </span>
              </div>
            </button>

            {expandedSections.has(section.id) && (
              <div className="p-4 space-y-4">
                {section.groups.map((group) => (
                  <div key={group.id} className="border rounded-lg">
                    <button
                      onClick={() => toggleGroup(group.id)}
                      className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {expandedGroups.has(group.id) ? (
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
                            style={{ width: `${getGroupProgress(group)}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">
                          {getGroupProgress(group)}%
                        </span>
                      </div>
                    </button>

                    {expandedGroups.has(group.id) && (
                      <div className="p-3 space-y-2">
                        {group.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <button
                              onClick={() => toggleItem(item.id)}
                              className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center ${
                                checkedItems.has(item.id)
                                  ? 'bg-green-500 border-green-500 text-white'
                                  : 'border-gray-300'
                              }`}
                            >
                              {checkedItems.has(item.id) && <CheckCircle2 className="w-3 h-3" />}
                            </button>
                            
                            <span className="flex-grow text-gray-700 text-sm">{item.text}</span>
                            
                            {item.critical && !checkedItems.has(item.id) && (
                              <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}