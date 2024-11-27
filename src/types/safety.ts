export interface ChecklistItem {
  id: string;
  text: string;
  critical: boolean;
}

export interface ChecklistGroup {
  id: string;
  title: string;
  items: ChecklistItem[];
}

export interface ChecklistSection {
  id: string;
  title: string;
  groups: ChecklistGroup[];
}

export interface SafetyChecklistState {
  checkedItems: Set<string>;
  expandedSections: Set<string>;
  expandedGroups: Set<string>;
}