import { useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, X, Music, MapPin, Users, Shuffle, Clock, Volume2, Play, Pause } from 'lucide-react';
import { getMemories, getPatient, updateStats, getStats, addActivity } from '../utils/storage';

// 6 Pairs defined with descriptions and images
const MEMORY_MATCH_PAIRS = [
  {
    id: 'diwali',
    title: 'Diwali at Home',
    description: 'Traditional illuminated clay diyas with festive lights',
    image: '/diwali.png',
  },
  {
    id: 'ganpati',
    title: 'Ganpati 2025',
    description: 'Extended family gathered in festive attire celebrating Ganpati',
    image: '/ganpati.png',
  },
  {
    id: 'first-grandchild',
    title: 'First Grandchild',
    description: 'Mother cradling her newborn baby',
    image: '/first-grandchild.png',
  },
  {
    id: 'first-teaching-job',
    title: 'First Teaching Job',
    description: 'Teacher conducting a lesson at the classroom blackboard',
    image: '/first-teaching-job.png',
  },
  {
    id: 'summer-vacation-pune',
    title: 'Summer Vacation Pune',
    description: 'Family outdoor photo in front of the historic Aga Khan Palace in Pune',
    image: '/summer-vacation-pune.png',
  },
  {
    id: 'wedding-day',
    title: 'Wedding Day',
    description: 'Vintage framed portrait of the bride and groom in traditional wedding attire',
    image: '/wedding.png',
  },
];

function Activities() {
  const [currentGame, setCurrentGame] = useState(null);
  const [gameState, setGameState] = useState({});
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const voicePlayerRef = useRef(null);
  const memories = getMemories();
  const patient = getPatient();

  const games = [
    {
      id: 'who-is-this',
      title: 'Who is this?',
      description: 'Recognize familiar faces',
      icon: Users,
      color: 'blue',
      difficulty: 'Easy',
      time: '5 min',
    },
    {
      id: 'memory-match',
      title: 'Memory Match',
      description: 'Match people and places',
      icon: Shuffle,
      color: 'purple',
      difficulty: 'Medium',
      time: '8 min',
    },
    {
      id: 'complete-song',
      title: 'Complete the Song',
      description: 'Remember favorite melodies',
      icon: Music,
      color: 'pink',
      difficulty: 'Easy',
      time: '5 min',
    },
    {
      id: 'voice-match',
      title: 'Whose Voice Is It?',
      description: 'Listen to a familiar voice and choose their photo',
      icon: Volume2,
      color: 'purple',
      difficulty: 'Easy',
      time: '5 min',
    },
    {
      id: 'familiar-place',
      title: 'Familiar Place',
      description: 'Remember special locations',
      icon: MapPin,
      color: 'green',
      difficulty: 'Easy',
      time: '5 min',
    },
    {
      id: 'memory-story',
      title: 'Memory Story',
      description: 'Arrange events in order',
      icon: Clock,
      color: 'orange',
      difficulty: 'Medium',
      time: '10 min',
    },
  ];

  const startGame = (gameId) => {
    setCurrentGame(gameId);
    initializeGame(gameId);
  };

  const initializeGame = (gameId) => {
    switch (gameId) {
      case 'who-is-this':
        initWhoIsThis();
        break;
      case 'memory-match':
        initMemoryMatch();
        break;
      case 'complete-song':
        initCompleteSong();
        break;
      case 'voice-match':
        initVoiceMatch();
        break;
      case 'familiar-place':
        initFamiliarPlace();
        break;
      case 'memory-story':
        initMemoryStory();
        break;
      default:
        break;
    }
  };

  const initWhoIsThis = () => {
    const familyMemories = memories.filter(m => m.people && m.people.length > 0);
    if (familyMemories.length > 0) {
      const randomMemory = familyMemories[Math.floor(Math.random() * familyMemories.length)];
      const correctPerson = randomMemory.people[0];
      const allPeople = patient.importantPeople.map(p => p.name);
      const options = [correctPerson];

      while (options.length < 4 && allPeople.length >= 4) {
        const randomPerson = allPeople[Math.floor(Math.random() * allPeople.length)];
        if (!options.includes(randomPerson)) {
          options.push(randomPerson);
        }
      }

      options.sort(() => Math.random() - 0.5);

      setGameState({
        memory: randomMemory,
        correctAnswer: correctPerson,
        options: options,
        answered: false,
        correct: null,
        score: 0,
        round: 1,
        totalRounds: 5,
      });
    }
  };

  // Initialize 12 cards (6 text cards + 6 image cards)
  const initMemoryMatch = () => {
    const cards = [];

    MEMORY_MATCH_PAIRS.forEach((pair) => {
      // Text card
      cards.push({
        id: `text-${pair.id}`,
        type: 'text',
        title: pair.title,
        description: pair.description,
        matchId: pair.id,
        flipped: false,
        matched: false,
      });
      // Image card
      cards.push({
        id: `img-${pair.id}`,
        type: 'image',
        image: pair.image,
        title: pair.title,
        matchId: pair.id,
        flipped: false,
        matched: false,
      });
    });

    cards.sort(() => Math.random() - 0.5);

    setGameState({
      cards: cards,
      flippedCards: [],
      matches: 0,
      moves: 0,
    });
  };

  const initCompleteSong = () => {
    const songs = [
      {
        line: 'Yeh dosti hum nahi...',
        options: ['todenge', 'chodenge', 'bhulenge', 'khatam karenge'],
        correct: 'todenge',
      },
      {
        line: 'Mere sapno ki rani, kab aayegi...',
        options: ['tu', 'woh', 'yeh', 'koi'],
        correct: 'tu',
      },
      {
        line: 'Kuch kuch hota hai, tum nahi...',
        options: ['samjhoge', 'jaante', 'dekhte', 'sochte'],
        correct: 'samjhoge',
      },
    ];

    const randomSong = songs[Math.floor(Math.random() * songs.length)];

    setGameState({
      currentSong: randomSong,
      answered: false,
      correct: null,
      score: 0,
      round: 1,
      totalRounds: 3,
    });
  };

  const shuffle = (items) => [...items].sort(() => Math.random() - 0.5);

  const initVoiceMatch = () => {
    const playableFamilyMembers = (patient?.familyMembers || []).filter(
      (member) => member.photo && member.voice
    );

    if (playableFamilyMembers.length < 4) {
      setGameState({ availableMembers: playableFamilyMembers.length, needsSetup: true });
      return;
    }

    const selectedMembers = shuffle(playableFamilyMembers).slice(0, 4);
    const roundMembers = shuffle(selectedMembers);
    setGameState({
      options: shuffle(selectedMembers),
      roundMembers,
      currentMember: roundMembers[0],
      answered: false,
      correct: null,
      score: 0,
      round: 1,
      totalRounds: 4,
    });
  };

  const initFamiliarPlace = () => {
    const placeMemories = memories.filter(m => m.category === 'Places' || patient.favoritePlaces.some(p => m.title.includes(p)));
    if (placeMemories.length > 0) {
      const randomPlace = placeMemories[Math.floor(Math.random() * placeMemories.length)];

      setGameState({
        place: randomPlace,
        answered: false,
        response: null,
      });
    }
  };

  const initMemoryStory = () => {
    const eventMemories = memories.filter(m => m.category === 'Events' && m.date).slice(0, 4);
    const shuffled = [...eventMemories].sort(() => Math.random() - 0.5);

    setGameState({
      memories: eventMemories,
      shuffledMemories: shuffled,
      userOrder: [],
      completed: false,
      correct: null,
    });
  };

  const handleWhoIsThisAnswer = (answer) => {
    const isCorrect = answer === gameState.correctAnswer;
    const newScore = gameState.score + (isCorrect ? 1 : 0);

    setGameState({
      ...gameState,
      answered: true,
      correct: isCorrect,
      score: newScore,
    });

    const stats = getStats();
    updateStats({
      memoryInteractions: stats.memoryInteractions + 1,
      engagementTime: stats.engagementTime + 1,
    });
  };

  const nextWhoIsThisRound = () => {
    if (gameState.round < gameState.totalRounds) {
      setGameState({ ...gameState, round: gameState.round + 1 });
      initWhoIsThis();
    } else {
      completeGame();
    }
  };

  const handleMemoryMatchClick = (cardId) => {
    if (gameState.flippedCards.length >= 2) return;

    const cards = gameState.cards.map(card =>
      card.id === cardId ? { ...card, flipped: true } : card
    );

    const flippedCards = [...gameState.flippedCards, cardId];

    setGameState({
      ...gameState,
      cards: cards,
      flippedCards: flippedCards,
      moves: gameState.moves + (flippedCards.length === 2 ? 1 : 0),
    });

    if (flippedCards.length === 2) {
      const card1 = cards.find(c => c.id === flippedCards[0]);
      const card2 = cards.find(c => c.id === flippedCards[1]);

      if (card1.matchId === card2.matchId) {
        setTimeout(() => {
          const matchedCards = gameState.cards.map(card =>
            card.matchId === card1.matchId ? { ...card, matched: true } : card
          );
          const updatedMatches = gameState.matches + 1;
          setGameState({
            ...gameState,
            cards: matchedCards,
            flippedCards: [],
            matches: updatedMatches,
          });

          if (updatedMatches === 6) {
            setTimeout(() => {
              completeGame();
            }, 1200);
          }
        }, 800);
      } else {
        setTimeout(() => {
          const resetCards = gameState.cards.map(card =>
            flippedCards.includes(card.id) ? { ...card, flipped: false } : card
          );
          setGameState({
            ...gameState,
            cards: resetCards,
            flippedCards: [],
          });
        }, 1300);
      }
    }
  };

  const handleSongAnswer = (answer) => {
    const isCorrect = answer === gameState.currentSong.correct;
    const newScore = gameState.score + (isCorrect ? 1 : 0);

    setGameState({
      ...gameState,
      answered: true,
      correct: isCorrect,
      score: newScore,
    });
  };

  const nextSongRound = () => {
    if (gameState.round < gameState.totalRounds) {
      setGameState({ ...gameState, round: gameState.round + 1 });
      initCompleteSong();
    } else {
      completeGame();
    }
  };

  const toggleVoicePlayback = () => {
    const player = voicePlayerRef.current;
    if (!player || !gameState.currentMember?.voice) return;

    if (isVoicePlaying) {
      player.pause();
      setIsVoicePlaying(false);
      return;
    }

    player.play().then(() => setIsVoicePlaying(true)).catch(() => setIsVoicePlaying(false));
  };

  const handleVoiceMatchAnswer = (memberId) => {
    const isCorrect = memberId === gameState.currentMember.id;
    const newScore = gameState.score + (isCorrect ? 1 : 0);
    voicePlayerRef.current?.pause();
    setIsVoicePlaying(false);
    setGameState({ ...gameState, answered: true, correct: isCorrect, score: newScore });

    const stats = getStats();
    updateStats({
      memoryInteractions: stats.memoryInteractions + 1,
      engagementTime: stats.engagementTime + 1,
    });
  };

  const nextVoiceMatchRound = () => {
    if (gameState.round >= gameState.totalRounds) {
      completeGame();
      return;
    }

    const nextRound = gameState.round + 1;
    setGameState({
      ...gameState,
      currentMember: gameState.roundMembers[nextRound - 1],
      answered: false,
      correct: null,
      round: nextRound,
    });
  };

  const handlePlaceResponse = (response) => {
    setGameState({
      ...gameState,
      answered: true,
      response: response,
    });

    setTimeout(() => {
      completeGame();
    }, 2000);
  };

  const handleMemoryStorySelect = (memory) => {
    if (gameState.userOrder.find(m => m.id === memory.id)) return;

    const newOrder = [...gameState.userOrder, memory];
    setGameState({
      ...gameState,
      userOrder: newOrder,
    });

    if (newOrder.length === gameState.memories.length) {
      checkMemoryStoryOrder(newOrder);
    }
  };

  const checkMemoryStoryOrder = (userOrder) => {
    const correctOrder = [...gameState.memories].sort((a, b) =>
      new Date(a.date) - new Date(b.date)
    );

    const isCorrect = userOrder.every((mem, idx) => mem.id === correctOrder[idx].id);

    setGameState({
      ...gameState,
      completed: true,
      correct: isCorrect,
    });

    setTimeout(() => {
      completeGame();
    }, 3000);
  };

  const completeGame = () => {
    const stats = getStats();
    updateStats({
      activitiesCompleted: stats.activitiesCompleted + 1,
      engagementTime: stats.engagementTime + 5,
    });

    addActivity({
      gameId: currentGame,
      score: gameState.score || 0,
      completed: true,
    });

    setCurrentGame(null);
    setGameState({});
  };

  const exitGame = () => {
    voicePlayerRef.current?.pause();
    setIsVoicePlaying(false);
    setCurrentGame(null);
    setGameState({});
  };

  const getColorClass = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
      pink: 'bg-pink-50 text-pink-600 border-pink-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      orange: 'bg-orange-50 text-orange-600 border-orange-200',
    };
    return colors[color] || colors.blue;
  };

  if (currentGame === 'who-is-this' && gameState.memory) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Who is this? • यह कौन है?
            </h2>
            <button onClick={exitGame} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="text-center mb-6">
            <p className="text-sm text-gray-600">
              Round {gameState.round} of {gameState.totalRounds} • Score: {gameState.score}
            </p>
          </div>

          <div className="mb-8">
            <img
              src={gameState.memory.imageUrl}
              alt="Memory"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {!gameState.answered ? (
            <div className="grid grid-cols-2 gap-4">
              {gameState.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleWhoIsThisAnswer(option)}
                  className="p-6 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors font-medium text-lg"
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center">
              {gameState.correct ? (
                <div className="mb-6">
                  <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <p className="text-2xl font-bold text-green-600 mb-2">बिल्कुल सही! • That's right!</p>
                  <p className="text-gray-600">This is {gameState.correctAnswer}</p>
                </div>
              ) : (
                <div className="mb-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🤔</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-600 mb-2">Let's try another one</p>
                  <p className="text-gray-600">This is {gameState.correctAnswer}</p>
                </div>
              )}

              <button
                onClick={nextWhoIsThisRound}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                {gameState.round < gameState.totalRounds ? 'Next Memory' : 'Complete Activity'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Memory Match View (6 Pairs / 12 Cards)
  if (currentGame === 'memory-match' && gameState.cards) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-stone-200 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-200">
            <div>
              <h2 className="text-2xl font-bold text-stone-900">Memory Match</h2>
              <p className="text-sm text-stone-500 mt-1">
                Matches: <span className="font-semibold text-emerald-600">{gameState.matches}/6</span> • Moves: <span className="font-semibold text-stone-700">{gameState.moves}</span>
              </p>
            </div>
            <button onClick={exitGame} className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 sm:gap-4">
            {gameState.cards.map((card) => (
              <button
                key={card.id}
                onClick={() => !card.matched && !card.flipped && handleMemoryMatchClick(card.id)}
                className={`relative h-32 sm:h-36 md:h-40 rounded-2xl border-2 transition-all duration-300 overflow-hidden text-left p-0 ${
                  card.matched
                    ? 'border-emerald-500 bg-emerald-50/70 opacity-80 cursor-default'
                    : card.flipped
                    ? 'border-blue-400 bg-[#FAF7F0] shadow-md'
                    : 'border-blue-500 bg-blue-600 hover:bg-blue-700 shadow-md cursor-pointer'
                }`}
                disabled={card.matched || card.flipped}
              >
                {card.flipped || card.matched ? (
                  card.type === 'image' ? (
                    <div className="w-full h-full p-2 flex items-center justify-center">
                      <img 
                        src={card.image} 
                        alt={card.title} 
                        className="w-full h-full object-cover rounded-xl" 
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full p-3 flex flex-col justify-center items-center text-center">
                      <span className="font-bold text-xs sm:text-sm text-stone-900 leading-snug">
                        {card.title}
                      </span>
                      <span className="text-[10px] sm:text-xs text-stone-500 mt-1 line-clamp-3">
                        {card.description}
                      </span>
                    </div>
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <span className="text-3xl font-bold opacity-75">?</span>
                  </div>
                )}
              </button>
            ))}
          </div>

          {gameState.matches === 6 && (
            <div className="mt-6 p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-center flex flex-col items-center justify-center gap-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <span>Great Job! You matched all 6 memories!</span>
              </div>
              <p className="text-sm text-emerald-700">Completed in {gameState.moves} moves.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (currentGame === 'complete-song' && gameState.currentSong) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Complete the Song</h2>
            <button onClick={exitGame} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="text-center mb-6">
            <p className="text-sm text-gray-600">
              Round {gameState.round} of {gameState.totalRounds} • Score: {gameState.score}
            </p>
          </div>

          <div className="mb-8 text-center">
            <Music className="w-16 h-16 text-pink-600 mx-auto mb-4" />
            <p className="text-2xl font-semibold text-gray-900 mb-2">
              {gameState.currentSong.line}
            </p>
            <p className="text-gray-600">Complete this familiar line</p>
          </div>

          {!gameState.answered ? (
            <div className="grid grid-cols-2 gap-4">
              {gameState.currentSong.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSongAnswer(option)}
                  className="p-6 border-2 border-gray-300 rounded-lg hover:border-pink-500 hover:bg-pink-50 transition-colors font-medium text-lg"
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center">
              {gameState.correct ? (
                <div className="mb-6">
                  <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <p className="text-2xl font-bold text-green-600 mb-2">Perfect!</p>
                </div>
              ) : (
                <div className="mb-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Music className="w-8 h-8 text-orange-600" />
                  </div>
                  <p className="text-2xl font-bold text-orange-600 mb-2">Let's try another</p>
                </div>
              )}

              <button
                onClick={nextSongRound}
                className="px-8 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-medium"
              >
                {gameState.round < gameState.totalRounds ? 'Next Song' : 'Complete Activity'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (currentGame === 'voice-match') {
    if (gameState.needsSetup) {
      return (
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Whose Voice Is It?</h2>
              <button onClick={exitGame} className="text-gray-400 hover:text-gray-600" aria-label="Close activity">
                <X className="w-6 h-6" />
              </button>
            </div>
            <Volume2 className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Add four familiar voices first</h3>
            <p className="text-gray-600 max-w-lg mx-auto">
              This activity needs four family members with both a photo and a voice recording. There are currently {gameState.availableMembers || 0} ready.
              Add them in Patient Profile, then come back to play.
            </p>
          </div>
        </div>
      );
    }

    if (gameState.currentMember) {
      return (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Whose Voice Is It? • यह आवाज़ किसकी है?</h2>
                <p className="text-sm text-gray-600 mt-1">Round {gameState.round} of {gameState.totalRounds} • Score: {gameState.score}</p>
              </div>
              <button onClick={exitGame} className="text-gray-400 hover:text-gray-600" aria-label="Close activity">
                <X className="w-6 h-6" />
              </button>
            </div>

            <audio
              ref={voicePlayerRef}
              src={`http://localhost:3000${gameState.currentMember.voice}`}
              onEnded={() => setIsVoicePlaying(false)}
            />

            <div className="bg-purple-50 border border-purple-100 rounded-xl p-6 text-center mb-8">
              <Volume2 className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <p className="text-lg font-semibold text-gray-900 mb-4">Listen carefully, then choose the matching photo.</p>
              <button
                onClick={toggleVoicePlayback}
                disabled={gameState.answered}
                className="inline-flex items-center gap-2 px-7 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-60 font-semibold"
              >
                {isVoicePlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {isVoicePlaying ? 'Pause Voice' : 'Play Voice'}
              </button>
            </div>

            {!gameState.answered ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {gameState.options.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => handleVoiceMatchAnswer(member.id)}
                    className="group overflow-hidden rounded-xl border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-colors text-left"
                  >
                    <img src={`http://localhost:3000${member.photo}`} alt={`Photo of ${member.name}`} className="w-full aspect-square object-cover" />
                    <span className="block p-3 text-center font-semibold text-gray-900">{member.name}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center">
                {gameState.correct ? (
                  <>
                    <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-green-600 mb-2">That’s right!</p>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3"><span className="text-3xl">😊</span></div>
                    <p className="text-2xl font-bold text-orange-600 mb-2">Good try!</p>
                  </>
                )}
                <p className="text-gray-700 mb-6">That was {gameState.currentMember.name}, {gameState.currentMember.relation}.</p>
                <button onClick={nextVoiceMatchRound} className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
                  {gameState.round < gameState.totalRounds ? 'Next Voice' : 'Complete Activity'}
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }
  }

  if (currentGame === 'familiar-place' && gameState.place) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Familiar Place • परिचित जगह
            </h2>
            <button onClick={exitGame} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-8">
            <img
              src={gameState.place.imageUrl}
              alt="Place"
              className="w-full h-80 object-cover rounded-lg mb-4"
            />
            <p className="text-xl text-center font-medium text-gray-900">
              Do you remember this place? • क्या आपको यह जगह याद है?
            </p>
          </div>

          {!gameState.answered ? (
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => handlePlaceResponse('yes')}
                className="p-6 border-2 border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors font-medium text-lg"
              >
                Yes, I remember • हाँ, याद है
              </button>
              <button
                onClick={() => handlePlaceResponse('unsure')}
                className="p-6 border-2 border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors font-medium text-lg"
              >
                I'm not sure • मुझे यकीन नहीं
              </button>
              <button
                onClick={() => handlePlaceResponse('no')}
                className="p-6 border-2 border-gray-300 rounded-lg hover:border-gray-500 hover:bg-gray-50 transition-colors font-medium text-lg"
              >
                I don't remember • मुझे याद नहीं
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600 mb-2">Thank you for sharing!</p>
              <p className="text-gray-600 mb-6">This is {gameState.place.title}</p>
              <p className="text-gray-700">{gameState.place.description}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (currentGame === 'memory-story' && gameState.memories) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Memory Story</h2>
              <p className="text-gray-600">Arrange these memories in chronological order</p>
            </div>
            <button onClick={exitGame} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Your Story ({gameState.userOrder.length}/{gameState.memories.length}):</h3>
            <div className="flex flex-wrap gap-2 min-h-[60px] p-4 border-2 border-dashed border-gray-300 rounded-lg">
              {gameState.userOrder.map((memory, idx) => (
                <div key={memory.id} className="px-4 py-2 bg-blue-100 text-blue-900 rounded-lg font-medium">
                  {idx + 1}. {memory.title}
                </div>
              ))}
            </div>
          </div>

          {!gameState.completed ? (
            <div className="grid grid-cols-2 gap-4">
              {gameState.shuffledMemories.map((memory) => {
                const isSelected = gameState.userOrder.find(m => m.id === memory.id);
                return (
                  <button
                    key={memory.id}
                    onClick={() => handleMemoryStorySelect(memory)}
                    disabled={isSelected}
                    className={`p-4 border-2 rounded-lg transition-colors text-left ${
                      isSelected
                        ? 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
                        : 'border-gray-300 hover:border-orange-500 hover:bg-orange-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={memory.imageUrl}
                        alt={memory.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{memory.title}</p>
                        <p className="text-sm text-gray-600">{memory.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              {gameState.correct ? (
                <>
                  <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <p className="text-2xl font-bold text-green-600 mb-2">Wonderful! Perfect order!</p>
                  <p className="text-gray-600">You remembered the story correctly</p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-blue-600 mb-2">Great effort!</p>
                  <p className="text-gray-600">Every memory shared is meaningful</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Main activities list
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Personalized Activities</h1>
        <p className="text-gray-600">These activities are built around Rituparna's memories</p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-blue-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          AI Memory Companion
        </h2>
        <p className="text-gray-700 mb-4">
          Based on Rituparna's memory profile, we recommend activities using familiar faces, places, and experiences
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            Family Recognition
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
            Assam Memories
          </span>
          <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-medium">
            Music Recall
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            Bihu Traditions
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => {
          const Icon = game.icon;
          return (
            <div
              key={game.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className={`w-16 h-16 ${getColorClass(game.color)} border rounded-xl flex items-center justify-center mb-4`}>
                <Icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{game.title}</h3>
              <p className="text-gray-600 mb-4">{game.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">{game.difficulty}</span>
                <span className="text-sm text-gray-500">{game.time}</span>
              </div>
              <button
                onClick={() => startGame(game.id)}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <span>Start Activity</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Activities;