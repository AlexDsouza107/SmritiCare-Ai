import { useState } from 'react';
import { Edit2, Save, X, MapPin, Music, Heart, Users } from 'lucide-react';
import { getPatient, setPatient } from '../utils/storage';

function PatientProfile() {
  const [patient, setPatientState] = useState(getPatient());
  const [isEditing, setIsEditing] = useState(false);
  const [editedPatient, setEditedPatient] = useState(patient);

  const handleSave = () => {
    setPatient(editedPatient);
    setPatientState(editedPatient);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPatient(patient);
    setIsEditing(false);
  };

  const updateField = (field, value) => {
    setEditedPatient({ ...editedPatient, [field]: value });
  };

  const addPerson = () => {
    const newPerson = { name: '', relation: '' };
    updateField('importantPeople', [...editedPatient.importantPeople, newPerson]);
  };

  const updatePerson = (index, field, value) => {
    const updated = [...editedPatient.importantPeople];
    updated[index][field] = value;
    updateField('importantPeople', updated);
  };

  const removePerson = (index) => {
    const updated = editedPatient.importantPeople.filter((_, i) => i !== index);
    updateField('importantPeople', updated);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Profile</h1>
          <p className="text-gray-600">Personal information and preferences</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>

      {/* Profile Content */}
      <div className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedPatient.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900 text-lg">{patient.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              {isEditing ? (
                <input
                  type="number"
                  value={editedPatient.age}
                  onChange={(e) => updateField('age', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900 text-lg">{patient.age} years</p>
              )}
            </div>
          </div>
        </div>

        {/* Language Preferences */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Language Preferences</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Language
              </label>
              {isEditing ? (
                <select
                  value={editedPatient.preferredLanguage}
                  onChange={(e) => updateField('preferredLanguage', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Hindi">Hindi</option>
                  <option value="English">English</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Telugu">Telugu</option>
                  <option value="Bengali">Bengali</option>
                  <option value="Marathi">Marathi</option>
                  <option value="Assamese">Assamese</option>
                </select>
              ) : (
                <p className="text-gray-900 text-lg">{patient.preferredLanguage}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Language
              </label>
              {isEditing ? (
                <select
                  value={editedPatient.secondaryLanguage}
                  onChange={(e) => updateField('secondaryLanguage', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Telugu">Telugu</option>
                  <option value="Bengali">Bengali</option>
                  <option value="Marathi">Marathi</option>
                  <option value="Assamese">Assamese</option>
                </select>
              ) : (
                <p className="text-gray-900 text-lg">{patient.secondaryLanguage}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Familiar Code-Mixing
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedPatient.codeMixing}
                  onChange={(e) => updateField('codeMixing', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Hindi + English"
                />
              ) : (
                <p className="text-gray-900 text-lg">{patient.codeMixing}</p>
              )}
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Preferences & Interests</h2>
          <div className="space-y-6">
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <Music className="w-4 h-4" />
                <span>Favorite Music</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedPatient.favoriteMusic}
                  onChange={(e) => updateField('favoriteMusic', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900 text-lg">{patient.favoriteMusic}</p>
              )}
            </div>
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <Heart className="w-4 h-4" />
                <span>Favorite Food</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedPatient.favoriteFood}
                  onChange={(e) => updateField('favoriteFood', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900 text-lg">{patient.favoriteFood}</p>
              )}
            </div>
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4" />
                <span>Favorite Places</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedPatient.favoritePlaces.join(', ')}
                  onChange={(e) => updateField('favoritePlaces', e.target.value.split(',').map(s => s.trim()))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Separate with commas"
                />
              ) : (
                <p className="text-gray-900 text-lg">{patient.favoritePlaces.join(', ')}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hobbies
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedPatient.hobbies.join(', ')}
                  onChange={(e) => updateField('hobbies', e.target.value.split(',').map(s => s.trim()))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Separate with commas"
                />
              ) : (
                <p className="text-gray-900 text-lg">{patient.hobbies.join(', ')}</p>
              )}
            </div>
          </div>
        </div>

        {/* Important People */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Important People</span>
            </h2>
            {isEditing && (
              <button
                onClick={addPerson}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                + Add Person
              </button>
            )}
          </div>
          <div className="space-y-4">
            {(isEditing ? editedPatient : patient).importantPeople.map((person, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {person.name.charAt(0)}
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={person.name}
                        onChange={(e) => updatePerson(index, 'name', e.target.value)}
                        placeholder="Name"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={person.relation}
                        onChange={(e) => updatePerson(index, 'relation', e.target.value)}
                        placeholder="Relation"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ) : (
                    <>
                      <p className="font-semibold text-gray-900">{person.name}</p>
                      <p className="text-sm text-gray-600">{person.relation}</p>
                    </>
                  )}
                </div>
                {isEditing && (
                  <button
                    onClick={() => removePerson(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientProfile;
