// LocalStorage helper functions for SmritiCare demo

const STORAGE_KEYS = {
  PATIENT: 'smriticare_patient',
  MEMORIES: 'smriticare_memories',
  ACTIVITIES: 'smriticare_activities',
  NOTES: 'smriticare_notes',
  TIMELINE: 'smriticare_timeline',
  SETTINGS: 'smriticare_settings',
  STATS: 'smriticare_stats',
};

// Demo patient data
const DEMO_PATIENT = {
  id: 1,
  name: 'Meera Sharma',
  age: 72,
  preferredLanguage: 'Hindi',
  secondaryLanguage: 'English',
  codeMixing: 'Hindi + English',
  favoriteMusic: 'Old Hindi film songs',
  favoriteFood: 'Dal Makhani, Gulab Jamun',
  favoritePlaces: ['Mumbai', 'Pune', 'Nashik'],
  hobbies: ['Gardening', 'Cooking', 'Listening to music'],
  importantPeople: [
    { name: 'Priya', relation: 'Daughter' },
    { name: 'Rahul', relation: 'Son' },
    { name: 'Anaya', relation: 'Granddaughter' },
  ],
};

// Demo memories
const DEMO_MEMORIES = [
  {
    id: 1,
    title: 'Family Trip to Goa',
    category: 'Events',
    description: 'Beautiful family vacation at the beach in 2015',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
    people: ['Priya', 'Rahul', 'Anaya'],
    date: '2015-12-20',
  },
  {
    id: 2,
    title: "Priya's Graduation",
    category: 'Family',
    description: 'Proud moment when Priya graduated from university',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400',
    people: ['Priya'],
    date: '2005-05-15',
  },
  {
    id: 3,
    title: 'Old Mumbai Home',
    category: 'Places',
    description: 'The house where we raised our family in Bandra',
    imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400',
    people: [],
    date: '1985-01-01',
  },
  {
    id: 4,
    title: "Anaya's Birthday",
    category: 'Events',
    description: "Celebrating granddaughter's 10th birthday party",
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400',
    people: ['Anaya', 'Priya', 'Rahul'],
    date: '2020-08-12',
  },
  {
    id: 5,
    title: 'Favorite Garden',
    category: 'Places',
    description: 'The beautiful garden where Meera loves to spend time',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400',
    people: [],
    date: '2010-03-01',
  },
  {
    id: 6,
    title: 'Wedding Anniversary',
    category: 'Events',
    description: '40th wedding anniversary celebration with family',
    imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400',
    people: ['Priya', 'Rahul'],
    date: '2012-02-14',
  },
  {
    id: 7,
    title: 'Rahul with Family',
    category: 'Family',
    description: 'Son Rahul with his family at Diwali celebration',
    imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400',
    people: ['Rahul'],
    date: '2018-11-07',
  },
  {
    id: 8,
    title: 'Priya at Home',
    category: 'People',
    description: 'Daughter Priya visiting during the weekend',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    people: ['Priya'],
    date: '2023-06-10',
  },
];

// Demo timeline events
const DEMO_TIMELINE = [
  { id: 1, year: 1954, title: 'Born in Pune', description: 'Meera was born in Pune, Maharashtra' },
  { id: 2, year: 1972, title: 'Married', description: 'Wedding ceremony in Mumbai' },
  { id: 3, year: 1978, title: 'Moved to Mumbai', description: 'Started new life in Bandra' },
  { id: 4, year: 1982, title: 'Priya was born', description: 'First child, daughter Priya' },
  { id: 5, year: 1985, title: 'Rahul was born', description: 'Second child, son Rahul' },
  { id: 6, year: 1990, title: 'Started gardening', description: 'Developed passion for plants and flowers' },
  { id: 7, year: 2005, title: "Priya's graduation", description: 'Priya graduated from Mumbai University' },
  { id: 8, year: 2010, title: 'Anaya was born', description: 'First grandchild, Priya\'s daughter' },
  { id: 9, year: 2015, title: 'Family trip to Goa', description: 'Memorable beach vacation with entire family' },
  { id: 10, year: 2024, title: "Anaya's birthday", description: 'Celebrated granddaughter turning 14' },
];

// Demo stats
const DEMO_STATS = {
  activitiesCompleted: 3,
  memoryInteractions: 12,
  engagementTime: 24,
  familiarityScore: 82,
  recentActivities: [
    { id: 1, text: 'Recognized daughter — Priya', time: '10 minutes ago' },
    { id: 2, text: 'Identified family home', time: '25 minutes ago' },
    { id: 3, text: 'Completed favorite song activity', time: '1 hour ago' },
  ],
};

// Demo settings
const DEMO_SETTINGS = {
  language: 'Hindi',
  fontSize: 'normal',
  highContrast: false,
  notifications: true,
  sound: true,
  reduceAnimation: false,
};

// Initialize demo data
export const initializeDemoData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.PATIENT)) {
    localStorage.setItem(STORAGE_KEYS.PATIENT, JSON.stringify(DEMO_PATIENT));
  }
  if (!localStorage.getItem(STORAGE_KEYS.MEMORIES)) {
    localStorage.setItem(STORAGE_KEYS.MEMORIES, JSON.stringify(DEMO_MEMORIES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TIMELINE)) {
    localStorage.setItem(STORAGE_KEYS.TIMELINE, JSON.stringify(DEMO_TIMELINE));
  }
  if (!localStorage.getItem(STORAGE_KEYS.STATS)) {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(DEMO_STATS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEMO_SETTINGS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.NOTES)) {
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ACTIVITIES)) {
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify([]));
  }
};

// Get functions
export const getPatient = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.PATIENT) || 'null');
};

export const getMemories = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.MEMORIES) || '[]');
};

export const getTimeline = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.TIMELINE) || '[]');
};

export const getStats = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.STATS) || 'null');
};

export const getSettings = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS) || 'null');
};

export const getNotes = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTES) || '[]');
};

export const getActivities = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVITIES) || '[]');
};

// Set functions
export const setPatient = (patient) => {
  localStorage.setItem(STORAGE_KEYS.PATIENT, JSON.stringify(patient));
};

export const addMemory = (memory) => {
  const memories = getMemories();
  const newMemory = { ...memory, id: Date.now() };
  memories.push(newMemory);
  localStorage.setItem(STORAGE_KEYS.MEMORIES, JSON.stringify(memories));
  return newMemory;
};

export const addTimelineEvent = (event) => {
  const timeline = getTimeline();
  const newEvent = { ...event, id: Date.now() };
  timeline.push(newEvent);
  timeline.sort((a, b) => a.year - b.year);
  localStorage.setItem(STORAGE_KEYS.TIMELINE, JSON.stringify(timeline));
  return newEvent;
};

export const updateStats = (updates) => {
  const stats = getStats();
  const updatedStats = { ...stats, ...updates };
  localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(updatedStats));
  return updatedStats;
};

export const setSettings = (settings) => {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
};

export const addNote = (note) => {
  const notes = getNotes();
  const newNote = { id: Date.now(), text: note, timestamp: new Date().toISOString() };
  notes.push(newNote);
  localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  return newNote;
};

export const addActivity = (activity) => {
  const activities = getActivities();
  const newActivity = { ...activity, id: Date.now(), timestamp: new Date().toISOString() };
  activities.push(newActivity);
  localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
  return newActivity;
};

export const resetDemoData = () => {
  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  initializeDemoData();
};
