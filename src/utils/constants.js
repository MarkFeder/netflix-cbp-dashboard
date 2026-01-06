// Import mock data from JSON files
import projectsData from '@/data/projects.json';
import languagesData from '@/data/languages.json';

export const PRODUCTION_STAGES = {
  PITCH: 'pitch',
  GREENLIGHT: 'greenlight',
  PRE_PRODUCTION: 'pre-production',
  PRODUCTION: 'production',
  POST_PRODUCTION: 'post-production',
};

export const STAGE_NAMES = {
  [PRODUCTION_STAGES.PITCH]: 'Pitch',
  [PRODUCTION_STAGES.GREENLIGHT]: 'Greenlight',
  [PRODUCTION_STAGES.PRE_PRODUCTION]: 'Pre-Prod',
  [PRODUCTION_STAGES.PRODUCTION]: 'Production',
  [PRODUCTION_STAGES.POST_PRODUCTION]: 'Post-Prod',
};

export const GENRES = [
  'Drama',
  'Sci-Fi',
  'Comedy',
  'Thriller',
  'Romance',
  'Fantasy',
  'Documentary',
  'Action',
  'Horror',
  'Mystery',
];

export const PRIORITY_LEVELS = ['Low', 'Medium', 'High', 'Critical'];

export const LOCALIZATION_STATUSES = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  ON_HOLD: 'on-hold',
};

export const INITIAL_PROJECTS = projectsData;
export const INITIAL_LANGUAGES = languagesData;

export const TABS = [
  { id: 'pipeline', label: 'Pipeline' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'localization', label: 'Localization' },
  { id: 'analytics', label: 'Analytics' },
];
