import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  Clock,
  TrendingUp,
  Plus,
  PlayCircle,
  CheckCircle2,
  Users,
  MapPin,
  Music,
  Sparkles
} from 'lucide-react';
import { getStats, addNote, getNotes, getPatient } from '../utils/storage';
import { getPersonalContent } from '../utils/personalize';
import { useLanguage } from '../context/LanguageContext';

function Dashboard() {
  const { t } = useLanguage();
  const [stats, setStats] = useState(() => ({
    activitiesCompleted: 0,
    memoryInteractions: 0,
    engagementTime: 0,
    familiarityScore: 0,
    recentActivities: [],
    ...getStats(),
  }));
  const [notes, setNotes] = useState(getNotes());
  const [newNote, setNewNote] = useState('');
  const [showNoteForm, setShowNoteForm] = useState(false);
  const recentActivities = stats.recentActivities || stats.lastActivity || [];
  const patient = getPatient();
  const [personal, setPersonal] = useState(null);

  useEffect(() => {
    getPersonalContent({ approvedOnly: true }).then(setPersonal).catch(() => setPersonal([]));
  }, []);

  const personalSongs = personal?.filter((c) => c.kind === 'song').length || 0;
  const personalPlaces = personal?.filter((c) => c.kind === 'place').length || 0;

  const todaysActivities = [
    {
      id: 1,
      title: 'Who is this?',
      description: 'Recognize family members',
      difficulty: 'Easy',
      time: '5 min',
      status: 'completed',
      icon: Users,
      color: 'blue',
    },
    {
      id: 2,
      title: 'A Walk Through Majuli',
      description: 'Identify familiar places',
      difficulty: 'Medium',
      time: '10 min',
      status: 'available',
      icon: MapPin,
      color: 'green',
    },
    {
      id: 3,
      title: 'Complete the Song',
      description: 'Remember favorite melodies',
      difficulty: 'Easy',
      time: '8 min',
      status: 'available',
      icon: Music,
      color: 'purple',
    },
  ];

  const handleAddNote = (e) => {
    e.preventDefault();
    if (newNote.trim()) {
      addNote(newNote);
      setNotes(getNotes());
      setNewNote('');
      setShowNoteForm(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('goodMorning');
    if (hour < 17) return t('goodAfternoon');
    return t('goodEvening');
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* 1. Header Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-[#2D2820]">
          {getGreeting()}, Ananya
        </h1>
        <p className="text-sm text-[#7A7265]">
          {t('overviewFor')} {patient?.name}
        </p>
      </div>

      {/* SerpApi personalization */}
      <Link
        to="/memory-finder"
        className="flex flex-col gap-3 rounded-2xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-5 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-purple-950">Memory Finder · powered by SerpApi</p>
            <p className="text-xs text-purple-800">
              {personal === null
                ? 'Loading personal songs and places…'
                : personalSongs + personalPlaces > 0
                  ? `${personalSongs} songs from YouTube and ${personalPlaces} places from Google Maps are in today's activities.`
                  : 'Find songs from their youth and photos of the places from their life in one click.'}
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold text-purple-700">Open Memory Finder →</span>
      </Link>

      {/* 2. Top 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 - Mint Green */}
        <div 
          className="rounded-2xl p-4 border border-[#C2DBCB] flex flex-col justify-between shadow-sm"
          style={{ backgroundColor: '#D4EAD9' }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#2D5A3E]">{t('activitiesCompleted')}</span>
            <CheckCircle2 className="w-4 h-4 text-[#2D5A3E]" />
          </div>
          <p className="text-2xl font-bold text-[#1F432D] mt-3">{stats.activitiesCompleted}</p>
          <span className="text-[11px] text-[#487358]">{t('dailyMetric')}</span>
        </div>

        {/* Metric 2 - Lavender / Purple */}
        <div 
          className="rounded-2xl p-4 border border-[#DCBDEB] flex flex-col justify-between shadow-sm"
          style={{ backgroundColor: '#EADAFA' }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#572C73]">{t('memoryInteractions')}</span>
            <Activity className="w-4 h-4 text-[#572C73]" />
          </div>
          <p className="text-2xl font-bold text-[#431F5B] mt-3">{stats.memoryInteractions}</p>
          <span className="text-[11px] text-[#714391]">{t('interactionCount')}</span>
        </div>

        {/* Metric 3 - Soft Blue */}
        <div 
          className="rounded-2xl p-4 border border-[#BAD1F0] flex flex-col justify-between shadow-sm"
          style={{ backgroundColor: '#D5E5FA' }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#2B4C78]">{t('engagementTime')}</span>
            <Clock className="w-4 h-4 text-[#2B4C78]" />
          </div>
          <p className="text-2xl font-bold text-[#1D375B] mt-3">{stats.engagementTime} min</p>
          <span className="text-[11px] text-[#436799]">{t('totalTime')}</span>
        </div>

        {/* Metric 4 - Sage Green / Teal */}
        <div 
          className="rounded-2xl p-4 border border-[#BBE3D5] flex flex-col justify-between shadow-sm"
          style={{ backgroundColor: '#D3EFE4' }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#235C4A]">{t('similarityScore')}</span>
            <TrendingUp className="w-4 h-4 text-[#235C4A]" />
          </div>
          <p className="text-2xl font-bold text-[#184637] mt-3">{stats.familiarityScore}%</p>
          <span className="text-[11px] text-[#3D7864]">{t('recognitionRate')}</span>
        </div>
      </div>

      {/* 3. Main 2-Column Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column (Activities & Recent Activity) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Activities */}
          <div className="bg-[#FAF6EF]/90 border border-[#E2D8C7] rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-stone-800">{t('todaysActivities')}</h2>
              <Link
                to="/activities"
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                {t('viewAll')}
              </Link>
            </div>

            <div className="space-y-3">
              {todaysActivities.map((activity) => {
                const Icon = activity.icon;
                const colorMap = {
                  blue: 'bg-sky-100 text-sky-700',
                  green: 'bg-emerald-100 text-emerald-700',
                  purple: 'bg-violet-100 text-violet-700',
                };

                return (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between gap-4 p-3.5 bg-white/80 rounded-xl border border-[#EBE3D5] transition-all hover:bg-white"
                  >
                    <div className="flex min-w-0 flex-1 items-center space-x-3.5">
                      <div className={`w-10 h-10 ${colorMap[activity.color]} rounded-lg flex items-center justify-center shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-stone-900">{activity.title}</h3>
                        <p className="text-xs text-stone-500">{activity.description}</p>
                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-stone-400">
                          <span>{activity.difficulty}</span>
                          <span>•</span>
                          <span>{activity.time}</span>
                          {activity.status === 'completed' && (
                            <span className="flex items-center text-emerald-600 font-medium ml-1">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              {t('completed')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Link
                      to="/activities"
                      className={`shrink-0 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                        activity.status === 'completed'
                          ? 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                          : 'bg-[#2C6E49] text-white hover:bg-[#23583A]'
                      }`}
                    >
                      {activity.status === 'completed' ? t('review') : t('start')}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#FAF6EF]/90 border border-[#E2D8C7] rounded-2xl p-5 shadow-sm">
            <h2 className="text-sm font-bold text-stone-800 mb-3">{t('recentActivity')}</h2>
            <div className="space-y-3">
              {recentActivities.length > 0 ? recentActivities.map((activity, index) => (
                <div key={activity.id || index} className="flex items-start space-x-3 text-xs">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5"></div>
                  <div className="flex-1">
                    <p className="font-medium text-stone-800">{activity.text || activity.gameId || 'Activity completed'}</p>
                    <p className="text-stone-400">{activity.time || 'Recently'}</p>
                  </div>
                </div>
              )) : (
                <p className="text-xs text-stone-400 py-2">{t('noRecentActivity')}</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (Patient Card, Quick Actions & Caregiver Notes) */}
        <div className="lg:col-span-1 space-y-6">
          {/* Patient Card */}
          <div 
            className="rounded-2xl p-5 border border-[#DAC6EB] shadow-sm space-y-4"
            style={{ backgroundColor: '#E7DCF2' }}
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 bg-[#B696D9] rounded-full flex items-center justify-center text-lg font-bold text-[#3B1963]">
                {patient?.name?.[0]}
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#301A4B]">{patient?.name}</h3>
                <p className="text-xs text-[#6F5B85]">{t('age')} {patient?.age}</p>
              </div>
            </div>
            <div className="space-y-1.5 pt-3 border-t border-[#D5BFEC] text-xs text-[#543F6B]">
              <div className="flex justify-between">
                <span>{t('status')}</span>
                <span className="font-semibold text-[#1F5435]">{t('active')}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('language')}</span>
                <span className="font-semibold text-stone-800">Assamese + English</span>
              </div>
              <div className="flex justify-between">
                <span>{t('patientProfile')}</span>
                <Link to="/profile" className="font-semibold text-[#5B218B] hover:underline">
                  {t('viewDetails')}
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-[#FAF6EF]/90 border border-[#E2D8C7] rounded-2xl p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wide">{t('quickActions')}</h3>
            <div className="space-y-2.5">
              <Link
                to="/activities"
                className="flex items-center space-x-3 p-3 rounded-xl bg-white border border-[#EBE3D5] text-xs font-semibold text-stone-800 hover:bg-stone-50 transition-colors"
              >
                <PlayCircle className="w-4 h-4 text-blue-600" />
                <span>{t('startActivity')}</span>
              </Link>
              <Link
                to="/memory-library"
                className="flex items-center space-x-3 p-3 rounded-xl bg-white border border-[#EBE3D5] text-xs font-semibold text-stone-800 hover:bg-stone-50 transition-colors"
              >
                <Plus className="w-4 h-4 text-purple-600" />
                <span>{t('addMemory')}</span>
              </Link>
              <Link
                to="/insights"
                className="flex items-center space-x-3 p-3 rounded-xl bg-white border border-[#EBE3D5] text-xs font-semibold text-stone-800 hover:bg-stone-50 transition-colors"
              >
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>{t('viewInsights')}</span>
              </Link>
            </div>
          </div>

          {/* Caregiver Notes Card */}
          <div className="bg-[#FAF6EF]/90 border border-[#E2D8C7] rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wide">{t('caregiverNotes')}</h3>
              <button
                onClick={() => setShowNoteForm(!showNoteForm)}
                className="text-stone-600 hover:text-stone-900 font-bold text-base"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {showNoteForm && (
              <form onSubmit={handleAddNote} className="mb-3">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a note..."
                  className="w-full px-3 py-2 text-xs bg-white border border-[#E2D8C7] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2C6E49] mb-2"
                  rows="3"
                />
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="px-3 py-1 bg-[#2C6E49] text-white rounded-md text-xs font-semibold hover:bg-[#23583A]"
                  >
                    {t('save')}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowNoteForm(false);
                      setNewNote('');
                    }}
                    className="px-3 py-1 bg-stone-200 text-stone-700 rounded-md text-xs font-semibold hover:bg-stone-300"
                  >
                    {t('cancel')}
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2">
              {notes.slice(-3).reverse().map((note) => (
                <div key={note.id} className="p-3 bg-white/90 border border-[#EBE3D5] rounded-xl text-xs">
                  <p className="font-medium text-stone-800">{note.text}</p>
                  <p className="text-[10px] text-stone-400 mt-1">
                    {new Date(note.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
              {notes.length === 0 && (
                <p className="text-xs text-stone-400 text-center py-3">
                  {t('noNotes')}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;