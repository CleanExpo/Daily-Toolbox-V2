import type { Job, SafetyTopic, JobTask } from '../types';

export const mockJobs: Job[] = [
  {
    id: '1',
    jobNumber: 'JOB-2024-001',
    location: 'Downtown Construction Site',
    team: ['John Smith', 'Sarah Johnson', 'Mike Williams'],
    status: 'in-progress',
    startDate: '2024-03-01',
    description: 'Commercial building renovation project with focus on safety compliance',
    tasks: [
      {
        id: '1',
        title: 'Scaffold Installation',
        assignee: 'John Smith',
        status: 'completed',
        hazards: ['Falls', 'Falling Objects'],
        controls: ['Safety Harness', 'Hard Hats', 'Safety Nets']
      },
      {
        id: '2',
        title: 'Electrical Wiring',
        assignee: 'Sarah Johnson',
        status: 'in-progress',
        hazards: ['Electrical Shock', 'Fire Risk'],
        controls: ['Lockout/Tagout', 'Insulated Tools']
      }
    ]
  },
  {
    id: '2',
    jobNumber: 'JOB-2024-002',
    location: 'Riverside Project',
    team: ['Robert Brown', 'Emily Davis'],
    status: 'scheduled',
    startDate: '2024-03-15',
    description: 'Infrastructure maintenance and repair',
    tasks: []
  }
];

export const mockSafetyTopics: SafetyTopic[] = [
  {
    id: '1',
    title: 'Working at Heights',
    description: 'Review of fall protection requirements and proper harness usage',
    category: 'Fall Protection',
    lastReviewed: '2024-03-01'
  },
  {
    id: '2',
    title: 'Electrical Safety',
    description: 'Proper procedures for working with live electrical systems',
    category: 'Electrical',
    lastReviewed: '2024-03-05'
  },
  {
    id: '3',
    title: 'PPE Requirements',
    description: 'Daily personal protective equipment inspection and usage',
    category: 'PPE',
    lastReviewed: '2024-03-10'
  }
];