export interface SafetyTopic {
  id: string;
  title: string;
  description: string;
  category: string;
  lastReviewed: string;
}

export interface JobTask {
  id: string;
  title: string;
  assignee: string;
  status: 'pending' | 'in-progress' | 'completed';
  hazards: string[];
  controls: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
}

export interface ToolboxMeeting {
  id: string;
  date: string;
  attendees: string[];
  checklist: string[];
  notes: string;
  conductor: string;
  weatherConditions: string;
  temperature: number;
}

export interface DailyReport {
  date: string;
  weatherConditions: string;
  crewSize: number;
  tasks: JobTask[];
  safetyTopics: SafetyTopic[];
  signatures: string[];
}

export interface Job {
  id: string;
  jobNumber: string;
  location: string;
  team: string[];
  status: 'scheduled' | 'in-progress' | 'completed' | 'on-hold';
  startDate: string;
  description: string;
  tasks: JobTask[];
}