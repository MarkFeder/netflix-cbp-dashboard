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

export const INITIAL_PROJECTS = [
  {
    id: 1,
    title: 'Stranger Things S5',
    genre: 'Sci-Fi',
    budget: '$30M',
    priority: 'High',
    stage: 'production',
    releaseDate: '2026-07-15',
    progress: 65,
  },
  {
    id: 2,
    title: 'The Crown S7',
    genre: 'Drama',
    budget: '$25M',
    priority: 'High',
    stage: 'post-production',
    releaseDate: '2026-11-20',
    progress: 85,
  },
  {
    id: 3,
    title: 'Black Mirror: AI Wars',
    genre: 'Sci-Fi',
    budget: '$15M',
    priority: 'Medium',
    stage: 'pre-production',
    releaseDate: '2026-09-10',
    progress: 40,
  },
  {
    id: 4,
    title: 'Bridgerton S4',
    genre: 'Romance',
    budget: '$20M',
    priority: 'High',
    stage: 'production',
    releaseDate: '2026-12-05',
    progress: 55,
  },
  {
    id: 5,
    title: 'Dark Waters',
    genre: 'Thriller',
    budget: '$12M',
    priority: 'Medium',
    stage: 'greenlight',
    releaseDate: '2027-02-14',
    progress: 25,
  },
  {
    id: 6,
    title: "Comedy Special: Dave's Hour",
    genre: 'Comedy',
    budget: '$5M',
    priority: 'Low',
    stage: 'pitch',
    releaseDate: '2026-08-30',
    progress: 10,
  },
  {
    id: 7,
    title: 'The Witcher S4',
    genre: 'Fantasy',
    budget: '$35M',
    priority: 'High',
    stage: 'production',
    releaseDate: '2026-10-20',
    progress: 70,
  },
  {
    id: 8,
    title: 'Squid Game S3',
    genre: 'Thriller',
    budget: '$28M',
    priority: 'High',
    stage: 'post-production',
    releaseDate: '2026-06-15',
    progress: 90,
  },
];

export const INITIAL_LANGUAGES = [
  { name: 'Spanish', code: 'es', progress: 95, status: 'completed' },
  { name: 'French', code: 'fr', progress: 88, status: 'in-progress' },
  { name: 'German', code: 'de', progress: 92, status: 'completed' },
  { name: 'Japanese', code: 'ja', progress: 75, status: 'in-progress' },
  { name: 'Korean', code: 'ko', progress: 85, status: 'in-progress' },
  { name: 'Portuguese', code: 'pt', progress: 98, status: 'completed' },
  { name: 'Italian', code: 'it', progress: 65, status: 'in-progress' },
  { name: 'Arabic', code: 'ar', progress: 45, status: 'in-progress' },
  { name: 'Hindi', code: 'hi', progress: 30, status: 'pending' },
  { name: 'Mandarin', code: 'zh', progress: 80, status: 'in-progress' },
];

export const TABS = [
  { id: 'pipeline', label: 'Pipeline' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'localization', label: 'Localization' },
  { id: 'analytics', label: 'Analytics' },
];
