import { useState, useCallback } from 'react';
import type { ChecklistSection, ChecklistGroup, SafetyChecklistState } from '@/types/safety';

export function useSafetyChecklist(initialSections: ChecklistSection[]) {
  const [state, setState] = useState<SafetyChecklistState>({
    checkedItems: new Set(),
    expandedSections: new Set(['equipment']),
    expandedGroups: new Set()
  });

  const toggleItem = useCallback((itemId: string) => {
    setState(prev => {
      const newCheckedItems = new Set(prev.checkedItems);
      if (newCheckedItems.has(itemId)) {
        newCheckedItems.delete(itemId);
      } else {
        newCheckedItems.add(itemId);
      }
      return { ...prev, checkedItems: newCheckedItems };
    });
  }, []);

  const toggleSection = useCallback((sectionId: string) => {
    setState(prev => {
      const newExpandedSections = new Set(prev.expandedSections);
      if (newExpandedSections.has(sectionId)) {
        newExpandedSections.delete(sectionId);
      } else {
        newExpandedSections.add(sectionId);
      }
      return { ...prev, expandedSections: newExpandedSections };
    });
  }, []);

  const toggleGroup = useCallback((groupId: string) => {
    setState(prev => {
      const newExpandedGroups = new Set(prev.expandedGroups);
      if (newExpandedGroups.has(groupId)) {
        newExpandedGroups.delete(groupId);
      } else {
        newExpandedGroups.add(groupId);
      }
      return { ...prev, expandedGroups: newExpandedGroups };
    });
  }, []);

  const getTotalItems = useCallback(() => {
    if (!initialSections) return 0;
    return initialSections.reduce((total, section) => 
      total + (section.groups || []).reduce((groupTotal, group) => 
        groupTotal + (group.items || []).length, 0
      ), 0
    );
  }, [initialSections]);

  const getCheckedPercentage = useCallback(() => {
    const total = getTotalItems();
    if (total === 0) return 0;
    return Math.round((state.checkedItems.size / total) * 100);
  }, [state.checkedItems, getTotalItems]);

  const getSectionProgress = useCallback((section: ChecklistSection) => {
    if (!section || !section.groups) return 0;
    const totalItems = section.groups.reduce((total, group) => 
      total + (group.items || []).length, 0
    );
    if (totalItems === 0) return 0;
    
    const checkedCount = section.groups.reduce((total, group) => 
      total + (group.items || []).filter(item => state.checkedItems.has(item.id)).length, 0
    );
    return Math.round((checkedCount / totalItems) * 100);
  }, [state.checkedItems]);

  const getGroupProgress = useCallback((group: ChecklistGroup) => {
    if (!group || !group.items || group.items.length === 0) return 0;
    const checkedCount = group.items.filter(item => state.checkedItems.has(item.id)).length;
    return Math.round((checkedCount / group.items.length) * 100);
  }, [state.checkedItems]);

  return {
    state,
    toggleItem,
    toggleSection,
    toggleGroup,
    getTotalItems,
    getCheckedPercentage,
    getSectionProgress,
    getGroupProgress
  };
}