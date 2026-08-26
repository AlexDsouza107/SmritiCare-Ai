import { Brain, Heart, Users, Globe, Music, Home, ArrowRight, CheckCircle2 } from 'lucide-react';

function LandingPage({ onEnterDemo }) {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">SmritiCare</span>
          </div>
          <button
            onClick={onEnterDemo}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Explore Demo
          </button>
        </nav>
      </header>

      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Memories That Matter.
                <span className="text-blue-600"> Care That Connects.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Transform familiar memories, people, places, music, and language into personalized cognitive engagement experiences for people living with dementia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onEnterDemo}
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg flex items-center justify-center space-x-2"
                >
                  <span>Explore Demo</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium text-lg"
                >
                  How It Works
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4 pb-4 border-b">
                  <h3 className="font-semibold text-gray-900">Today's Overview</h3>
                  <span className="text-sm text-gray-500">Demo Dashboard</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Activities</p>
                    <p className="text-2xl font-bold text-blue-600">3</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Interactions</p>
                    <p className="text-2xl font-bold text-purple-600">12</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Engagement</p>
                    <p className="text-2xl font-bold text-green-600">24 min</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Familiarity</p>
                    <p className="text-2xl font-bold text-orange-600">82%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem & Solution */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">The Problem</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Generic cognitive exercises may not feel meaningful or familiar to every person living with dementia. One-size-fits-all approaches often lack the personal connection that makes engagement truly effective.
              </p>
            </div>

            <div className="mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Approach</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Turn a person's own memories and familiar experiences into personalized activities. By using photos, names, places, and experiences that are personally meaningful, we create deeper engagement and emotional connection.
              </p>
            </div>

            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Why Personalization Matters</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Familiar Faces</h3>
                    <p className="text-gray-600">Recognition exercises using actual family members and friends</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Known Places</h3>
                    <p className="text-gray-600">Activities built around personally meaningful locations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Favorite Music</h3>
                    <p className="text-gray-600">Songs and melodies from their own cultural background</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Native Language</h3>
                    <p className="text-gray-600">Interactions in familiar languages and expressions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">
              Four simple steps to create personalized cognitive engagement
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Build a Memory Profile</h3>
              <p className="text-gray-600">
                Add photos, names, places, and important life events
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Understand Preferences</h3>
              <p className="text-gray-600">
                Set language, music, hobbies, and cultural context
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Generate Activities</h3>
              <p className="text-gray-600">
                System creates personalized cognitive exercises
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Track & Support</h3>
              <p className="text-gray-600">
                Monitor engagement and adjust for better results
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Built for India */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Built for India</h2>
            <p className="text-lg text-gray-600">
              Designed with Indian families and cultural diversity in mind
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <Globe className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Multilingual Support</h3>
              <p className="text-gray-600">
                Hindi, English, Tamil, Telugu, Bengali, Marathi, Assamese, and code-mixed interactions
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <Heart className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Local Cultural Context</h3>
              <p className="text-gray-600">
                Activities that respect and incorporate regional traditions and customs
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <Users className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Family Involvement</h3>
              <p className="text-gray-600">
                Caregivers actively contribute memories and preferences
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <Music className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Familiar Music & Songs</h3>
              <p className="text-gray-600">
                Activities using regional music and culturally meaningful melodies
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <Home className="w-12 h-12 text-pink-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Simple Interface</h3>
              <p className="text-gray-600">
                Low-complexity design suitable for older adults and varied tech literacy
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <Brain className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Regional Languages</h3>
              <p className="text-gray-600">
                Support for major Indian languages with natural code-mixing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-gray-600">
              <strong>Important:</strong> This platform is designed for cognitive engagement and caregiver support.
              It is not a medical diagnostic tool and does not replace professional medical advice, diagnosis, or treatment.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Ready to Experience SmritiCare?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Explore our interactive demo to see how personalized memories create meaningful engagement
          </p>
          <button
            onClick={onEnterDemo}
            className="px-10 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg inline-flex items-center space-x-2"
          >
            <span>Start the Demo</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">SmritiCare</span>
          </div>
          <p className="text-gray-400 text-sm">
            Smart India Hackathon 2024 • Dementia Care Innovation
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
