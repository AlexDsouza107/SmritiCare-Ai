# SmritiCare - AI-Assisted Dementia Care Platform

**Smart India Hackathon 2024 Solution**

SmritiCare is a personalized cognitive engagement platform designed for dementia care. It transforms familiar memories, people, places, music, and experiences into meaningful interactive activities.

## 🎯 Key Features

### Personalization Through Memory
- **Memory Library**: Store and organize personal photographs, family members, familiar places, and important life events
- **Patient Profiles**: Comprehensive profiles including language preferences, favorite music, hobbies, and important people
- **Memory Journey**: Visual timeline of life events that creates context for activities

### Interactive Cognitive Activities
All activities are personalized using the patient's own memories:

1. **Who is this?** - Family recognition using actual family photos
2. **Memory Match** - Match people and places from personal memories
3. **Complete the Song** - Remember familiar melodies and lyrics
4. **Familiar Place** - Identify personally meaningful locations
5. **Memory Story** - Arrange personal events in chronological order

### Built for India
- **Multilingual Support**: Hindi, English, Tamil, Telugu, Bengali, Marathi, Assamese, and more
- **Code-Mixed Interactions**: Natural Hindi-English mixing where appropriate
- **Cultural Context**: Activities respect regional traditions and customs
- **Family-Centered**: Caregivers actively contribute memories and preferences

### Accessibility First
- Large readable text with adjustable font sizes
- High contrast mode for better visibility
- Simple, clutter-free interface suitable for older adults
- Large touch targets and clear focus states
- Reduced animation options

### Caregiver Dashboard
- Real-time engagement metrics (not medical scores)
- Activity tracking and completion history
- Caregiver notes system
- Progress insights and trends
- Quick actions for common tasks

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

```bash
# Navigate to the project directory
cd smriticare

# Install dependencies (already done)
npm install

# Start the development server
npm run dev
```

The application will be available at **http://localhost:5173/**

### Build for Production

```bash
npm run build
npm run preview
```

## 📋 Demo Data

The application comes with realistic demo data pre-loaded:

- **Patient**: Meera Sharma, 72 years old
- **Languages**: Hindi (primary), English (secondary)
- **8 Pre-loaded Memories**: Family photos, places, events
- **10 Timeline Events**: Life journey from 1954 to 2024
- **Important People**: Daughter Priya, Son Rahul, Granddaughter Anaya

You can add your own memories, timeline events, and notes. Use **Settings → Reset Demo Data** to restore defaults.

## 🗂️ Project Structure

```
smriticare/
├── src/
│   ├── components/
│   │   └── Layout.jsx          # Main layout with navigation
│   ├── pages/
│   │   ├── LandingPage.jsx     # Product landing page
│   │   ├── Dashboard.jsx       # Caregiver dashboard
│   │   ├── PatientProfile.jsx  # Patient information
│   │   ├── MemoryLibrary.jsx   # Memory management
│   │   ├── Activities.jsx      # Interactive games
│   │   ├── MemoryJourney.jsx   # Life timeline
│   │   ├── Insights.jsx        # Engagement analytics
│   │   └── Settings.jsx        # Accessibility settings
│   ├── utils/
│   │   └── storage.js          # LocalStorage helpers
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🎨 Technology Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Lucide React** - Icon library
- **LocalStorage** - Demo data persistence

## 🔒 Privacy & Medical Disclaimer

**Important**: This platform is designed for **cognitive engagement and caregiver support**. It is **not a medical diagnostic tool** and does not replace professional medical advice, diagnosis, or treatment.

- Engagement metrics are interaction tracking, not clinical assessments
- All demo data is stored locally in the browser
- No data is sent to external servers
- Production deployment should implement strong encryption and privacy controls

## 💡 Innovation Highlights

### 1. Personal Memory-Based Activities
Activities use familiar personal experiences instead of generic cognitive exercises.

### 2. Multilingual & Code-Mixed Interaction
Designed for India's linguistic diversity with natural language mixing.

### 3. Family-Centered Care
Caregivers contribute memories and context, creating a collaborative care environment.

### 4. Adaptive Personalization
Activities dynamically adjust based on patient preferences and engagement patterns.

### 5. Accessibility First
Large text, high contrast, simple interactions designed for older adults.

### 6. Privacy-Conscious Design
Local-first architecture with no external API dependencies in the demo.

## 🎯 SIH Demonstration Flow

1. **Landing Page** - Overview of the problem and solution
2. **Enter Demo** - See the caregiver dashboard
3. **View Patient Profile** - See Meera's personalized information
4. **Explore Memory Library** - Browse and add memories
5. **Start Activities** - Try interactive cognitive games
6. **Check Memory Journey** - View life timeline
7. **Review Insights** - See engagement metrics
8. **Adjust Settings** - Test accessibility features

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Adding New Activities

Activities are defined in `src/pages/Activities.jsx`. Each game includes:
- Initialization logic
- State management
- User interaction handlers
- Completion and scoring

### Customizing Demo Data

Edit `src/utils/storage.js` to modify:
- Demo patient information
- Pre-loaded memories
- Timeline events
- Initial statistics

## 📄 License

This project was created for Smart India Hackathon 2024.

## 👥 Contact

For questions about this SIH solution, please reach out to the development team.

---

**Built with ❤️ for Smart India Hackathon 2024**
