import { Brain, Heart, Users, Globe, Music, Home, ArrowRight, CheckCircle2 } from 'lucide-react';

function LandingPage({ onEnterDemo }) {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-emerald-50 via-sky-50 to-violet-50 text-slate-900">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-6 relative z-10">
        <nav className="flex items-center justify-between rounded-2xl border border-sky-100/90 bg-sky-50/75 px-4 py-3 shadow-[0_12px_35px_rgba(98,126,160,0.10)] backdrop-blur-md sm:px-6">
          <div className="flex items-center space-x-2">
            <img src="/logo.jpg" alt="SMARA Logo" className="w-10 h-10 object-contain" />
            <span className="text-2xl font-bold tracking-tight text-slate-900">SMARA</span>
          </div>
          <button
            onClick={onEnterDemo}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 via-sky-600 to-violet-600 px-6 py-2.5 font-semibold text-white shadow-lg shadow-sky-200 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-xl hover:shadow-violet-200 focus:outline-none focus:ring-4 focus:ring-sky-200"
          >
            Explore Demo
          </button>
        </nav>
      </header>

      <section className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="absolute -top-20 left-0 h-72 w-72 rounded-full bg-emerald-200/45 blur-3xl" />
        <div className="absolute right-0 top-8 h-80 w-80 rounded-full bg-violet-200/45 blur-3xl" />
        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/90 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
                <Brain className="h-4 w-4" />
                Personalized cognitive care
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-[1.08] tracking-tight">
                Memories That Matter.
                <span className="block bg-gradient-to-r from-emerald-600 via-sky-600 to-violet-600 bg-clip-text text-transparent">Care That Connects.</span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Transform familiar memories, people, places, music, and language into personalized cognitive engagement experiences for people living with dementia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onEnterDemo}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-600 via-sky-600 to-violet-600 text-white rounded-xl shadow-xl shadow-sky-200 hover:-translate-y-0.5 hover:shadow-2xl transition-all font-semibold text-lg flex items-center justify-center space-x-2"
                >
                  <span>Explore Demo</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="px-8 py-4 bg-sky-50/80 text-slate-700 border border-sky-100 rounded-xl hover:bg-violet-50 hover:border-violet-200 hover:-translate-y-0.5 transition-all shadow-sm font-semibold text-lg"
                >
                  How It Works
                </button>
              </div>
            </div>
            <div className="relative lg:pl-4">
              <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-emerald-200/60 via-sky-200/50 to-violet-200/60 blur-2xl" />
              <div className="relative rounded-[1.6rem] bg-gradient-to-br from-sky-50/95 via-violet-50/90 to-emerald-50/95 shadow-[0_24px_60px_rgba(78,112,149,0.20)] p-6 border border-sky-100/80 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
                  <h3 className="font-semibold text-slate-800">Today's Overview</h3>
                  <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">Demo Dashboard</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-violet-50 to-violet-100/70 rounded-xl p-4 border border-violet-100">
                    <p className="text-sm text-slate-600">Activities</p>
                    <p className="text-2xl font-bold text-violet-600">3</p>
                  </div>
                  <div className="bg-gradient-to-br from-sky-50 to-sky-100/70 rounded-xl p-4 border border-sky-100">
                    <p className="text-sm text-slate-600">Interactions</p>
                    <p className="text-2xl font-bold text-sky-600">12</p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/70 rounded-xl p-4 border border-emerald-100">
                    <p className="text-sm text-slate-600">Engagement</p>
                    <p className="text-2xl font-bold text-emerald-600">24 min</p>
                  </div>
                  <div className="bg-gradient-to-br from-violet-50 to-sky-50 rounded-xl p-4 border border-violet-100">
                    <p className="text-sm text-slate-600">Familiarity</p>
                    <p className="text-2xl font-bold text-violet-600">82%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem & Solution */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-100/65 via-violet-50 to-emerald-100/65 py-16 lg:py-24">
        <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-sky-200/45 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-violet-200/45 blur-3xl" />
        <div className="relative container mx-auto px-4">
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
      <section id="how-it-works" className="py-16 lg:py-24 bg-gradient-to-br from-emerald-50 via-sky-50 to-violet-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">
              Four simple steps to create personalized cognitive engagement
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-violet-700 text-white rounded-2xl shadow-lg shadow-violet-200 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Build a Memory Profile</h3>
              <p className="text-gray-600">
                Add photos, names, places, and important life events
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-sky-700 text-white rounded-2xl shadow-lg shadow-sky-200 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Understand Preferences</h3>
              <p className="text-gray-600">
                Set language, music, hobbies, and cultural context
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-700 text-white rounded-2xl shadow-lg shadow-emerald-200 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Generate Activities</h3>
              <p className="text-gray-600">
                System creates personalized cognitive exercises
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-sky-600 text-white rounded-2xl shadow-lg shadow-violet-200 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
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
      <section className="py-16 lg:py-24 bg-gradient-to-br from-violet-50 via-sky-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Built for India</h2>
            <p className="text-lg text-gray-600">
              Designed with Indian families and cultural diversity in mind
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-sky-100/90 to-violet-100/70 rounded-2xl p-6 shadow-lg shadow-sky-100/70 border border-sky-100 transition-transform hover:-translate-y-1">
              <Globe className="w-12 h-12 text-brand-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Multilingual Support</h3>
              <p className="text-gray-600">
                Hindi, English, Tamil, Telugu, Bengali, Marathi, Assamese, and code-mixed interactions
              </p>
            </div>

            <div className="bg-gradient-to-br from-violet-100/90 to-sky-100/70 rounded-2xl p-6 shadow-lg shadow-violet-100/70 border border-violet-100 transition-transform hover:-translate-y-1">
              <Heart className="w-12 h-12 text-brand-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Local Cultural Context</h3>
              <p className="text-gray-600">
                Activities that respect and incorporate regional traditions and customs
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-100/90 to-sky-100/70 rounded-2xl p-6 shadow-lg shadow-emerald-100/70 border border-emerald-100 transition-transform hover:-translate-y-1">
              <Users className="w-12 h-12 text-brand-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Family Involvement</h3>
              <p className="text-gray-600">
                Caregivers actively contribute memories and preferences
              </p>
            </div>

            <div className="bg-gradient-to-br from-sky-100/90 to-emerald-100/70 rounded-2xl p-6 shadow-lg shadow-sky-100/70 border border-sky-100 transition-transform hover:-translate-y-1">
              <Music className="w-12 h-12 text-sky-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Familiar Music & Songs</h3>
              <p className="text-gray-600">
                Activities using regional music and culturally meaningful melodies
              </p>
            </div>

            <div className="bg-gradient-to-br from-violet-100/90 to-emerald-100/70 rounded-2xl p-6 shadow-lg shadow-violet-100/70 border border-violet-100 transition-transform hover:-translate-y-1">
              <Home className="w-12 h-12 text-violet-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Simple Interface</h3>
              <p className="text-gray-600">
                Low-complexity design suitable for older adults and varied tech literacy
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-100/90 to-violet-100/70 rounded-2xl p-6 shadow-lg shadow-emerald-100/70 border border-emerald-100 transition-transform hover:-translate-y-1">
              <Brain className="w-12 h-12 text-brand-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Regional Languages</h3>
              <p className="text-gray-600">
                Support for major Indian languages with natural code-mixing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-gradient-to-r from-emerald-100 via-sky-100 to-violet-100">
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
      <section className="py-16 lg:py-24 bg-gradient-to-br from-sky-100/65 via-emerald-50 to-violet-100/65">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto rounded-[2rem] bg-gradient-to-br from-emerald-100 via-sky-100 to-violet-100 p-10 lg:p-14 shadow-xl shadow-sky-100">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Ready to Experience SMARA?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Explore our interactive demo to see how personalized memories create meaningful engagement
          </p>
          <button
            onClick={onEnterDemo}
            className="group mx-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-sky-600 to-violet-600 px-10 py-4 text-lg font-semibold text-white shadow-xl shadow-sky-200 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-2xl hover:shadow-violet-200 focus:outline-none focus:ring-4 focus:ring-sky-200"
          >
            <span>Start the Demo</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 via-sky-950 to-violet-950 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src="/logo.jpg" alt="SMARA Logo" className="w-8 h-8 object-contain" />
            <span className="text-xl font-bold">SMARA</span>
          </div>
          <p className="text-gray-400 text-sm mb-2">
            Remembering Together. Caring Always.
          </p>
          <p className="text-gray-400 text-sm">
            Smart India Hackathon 2026 • Dementia Care Innovation
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
