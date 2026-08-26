import { useState } from 'react';
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
  Music
} from 'lucide-react';
import { getStats, addNote, getNotes } from '../utils/storage';

function Dashboard() {
  const [stats, setStats] = useState(getStats());
  const [notes, setNotes] = useState(getNotes());
  const [newNote, setNewNote] = useState('');
  const [showNoteForm, setShowNoteForm] = useState(false);

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
      title: 'A Walk Through Mumbai',
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
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {getGreeting()}, Ananya
        </h1>
        <p className="text-gray-600">
          Here's today's overview for Meera Sharma
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Activities Completed</p>
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.activitiesCompleted}</p>
          <p className="text-xs text-gray-500 mt-1">Demo engagement metric</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Memory Interactions</p>
            <Activity className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.memoryInteractions}</p>
          <p className="text-xs text-gray-500 mt-1">Interaction count today</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Engagement Time</p>
            <Clock className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.engagementTime} min</p>
          <p className="text-xs text-gray-500 mt-1">Total time today</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Familiarity Score</p>
            <TrendingUp className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.familiarityScore}%</p>
          <p className="text-xs text-gray-500 mt-1">Recognition rate</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Today's Activities */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Today's Activities</h2>
              <Link
                to="/activities"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {todaysActivities.map((activity) => {
                const Icon = activity.icon;
                const colorMap = {
                  blue: 'bg-blue-50 text-blue-600',
                  green: 'bg-green-50 text-green-600',
                  purple: 'bg-purple-50 text-purple-600',
                };

                return (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className={`w-12 h-12 ${colorMap[activity.color]} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500">
                            {activity.difficulty}
                          </span>
                          <span className="text-xs text-gray-500">
                            {activity.time}
                          </span>
                          {activity.status === 'completed' && (
                            <span className="text-xs text-green-600 flex items-center">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Completed
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Link
                      to="/activities"
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        activity.status === 'completed'
                          ? 'bg-gray-100 text-gray-600'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {activity.status === 'completed' ? 'Review' : 'Start'}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {stats.recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-gray-900">{activity.text}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Patient Card */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                M
              </div>
              <div>
                <h3 className="text-xl font-bold">Meera Sharma</h3>
                <p className="text-blue-100">Age 72</p>
              </div>
            </div>
            <div className="space-y-2 pt-4 border-t border-white/20">
              <div className="flex justify-between">
                <span className="text-blue-100">Status</span>
                <span className="font-medium">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-100">Language</span>
                <span className="font-medium">Hindi + English</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-100">Profile</span>
                <Link to="/profile" className="font-medium hover:underline">
                  View Details
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to="/activities"
                className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <PlayCircle className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900">Start Activity</span>
              </Link>
              <Link
                to="/memory-library"
                className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors"
              >
                <Plus className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-gray-900">Add Memory</span>
              </Link>
              <Link
                to="/insights"
                className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors"
              >
                <Activity className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-900">View Insights</span>
              </Link>
            </div>
          </div>

          {/* Caregiver Notes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Caregiver Notes</h3>
              <button
                onClick={() => setShowNoteForm(!showNoteForm)}
                className="text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {showNoteForm && (
              <form onSubmit={handleAddNote} className="mb-4">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a note..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                  rows="3"
                />
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowNoteForm(false);
                      setNewNote('');
                    }}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-3">
              {notes.slice(-3).reverse().map((note) => (
                <div key={note.id} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-gray-900">{note.text}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(note.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
              {notes.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  No notes yet. Click + to add one.
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
