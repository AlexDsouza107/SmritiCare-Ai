import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Music,
  MapPin,
  Search,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Eye,
  EyeOff,
  ExternalLink,
  Star,
  Database,
  Plus,
  X,
} from 'lucide-react';
import { getPatient } from '../utils/storage';
import {
  getSerpApiStatus,
  getSuggestions,
  getPersonalContent,
  runPersonalization,
  setContentApproved,
} from '../utils/personalize';

function QueryList({ label, items, onChange, placeholder, color }) {
  const [draft, setDraft] = useState('');

  const add = () => {
    const value = draft.trim();
    if (value && !items.includes(value)) onChange([...items, value]);
    setDraft('');
  };

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-stone-500 mb-2">{label}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {items.map((item) => (
          <span key={item} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${color}`}>
            {item}
            <button onClick={() => onChange(items.filter((i) => i !== item))} aria-label={`Remove ${item}`} className="opacity-60 hover:opacity-100">
              <X className="w-3.5 h-3.5" />
            </button>
          </span>
        ))}
        {items.length === 0 && <span className="text-sm text-stone-400">Nothing yet</span>}
      </div>
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
          placeholder={placeholder}
          className="flex-1 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
        />
        <button onClick={add} className="inline-flex items-center gap-1 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50">
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>
    </div>
  );
}

function Reactions({ reactions }) {
  const total = (reactions?.yes || 0) + (reactions?.unsure || 0) + (reactions?.no || 0);
  if (!total) return <p className="text-xs text-stone-400">Not played yet</p>;
  return (
    <p className="text-xs text-stone-600">
      <span className="font-semibold text-emerald-700">Remembered {reactions.yes || 0}</span>
      {' · '}Unsure {reactions.unsure || 0}{' · '}Not yet {reactions.no || 0}
    </p>
  );
}

function ApproveToggle({ item, onToggle }) {
  return (
    <button
      onClick={() => onToggle(item)}
      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
        item.approved
          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
          : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
      }`}
    >
      {item.approved ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
      {item.approved ? 'Shown to patient' : 'Hidden'}
    </button>
  );
}

function MemoryFinder() {
  const patient = getPatient();
  const firstName = patient?.name?.split(' ')[0] || 'the patient';
  const their = { Female: 'her', Male: 'his' }[patient?.gender] || 'their';

  const [status, setStatus] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [songQueries, setSongQueries] = useState([]);
  const [placeQueries, setPlaceQueries] = useState([]);
  const [content, setContent] = useState([]);
  const [running, setRunning] = useState(false);
  const [lastRun, setLastRun] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSerpApiStatus().then(setStatus).catch(() => setStatus({ configured: false, offline: true }));
    getSuggestions()
      .then((s) => {
        setSuggestions(s);
        setSongQueries(s.songs);
        setPlaceQueries(s.places);
      })
      .catch(() => {});
    getPersonalContent().then(setContent).catch(() => {});
  }, []);

  const handleRun = async () => {
    setRunning(true);
    setError(null);
    try {
      const result = await runPersonalization(songQueries, placeQueries);
      setContent(result.content);
      setLastRun(result);
      getSerpApiStatus().then(setStatus).catch(() => {});
    } catch (err) {
      setError(err.message);
    } finally {
      setRunning(false);
    }
  };

  const handleToggle = async (item) => {
    const updated = await setContentApproved(item.id, !item.approved).catch(() => null);
    if (updated) setContent((list) => list.map((c) => (c.id === updated.id ? updated : c)));
  };

  const songs = content.filter((c) => c.kind === 'song');
  const places = content.filter((c) => c.kind === 'place');
  const maxSearches = songQueries.length + placeQueries.length * 2;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-800 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Powered by SerpApi
          </span>
          <h1 className="text-3xl font-bold text-gray-900">Memory Finder</h1>
          <p className="text-gray-600 mt-1 max-w-2xl">
            Families rarely have photos of every place or a playlist of old songs. Memory Finder uses {firstName}'s
            profile to find the music of {their} youth and real photos of the places from {their} life. You choose what {firstName} sees.
          </p>
        </div>
      </div>

      {/* SerpApi status */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-stone-200 bg-white/90 p-4">
          <p className="text-xs font-semibold text-stone-500">SerpApi connection</p>
          {status?.configured ? (
            <p className="mt-2 flex items-center gap-2 font-semibold text-emerald-700">
              <CheckCircle2 className="w-5 h-5" /> Connected{status.account?.plan ? ` · ${status.account.plan}` : ''}
            </p>
          ) : (
            <p className="mt-2 flex items-center gap-2 font-semibold text-amber-700">
              <AlertTriangle className="w-5 h-5" /> {status?.offline ? 'Backend not running' : 'Add SERPAPI_KEY to .env'}
            </p>
          )}
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white/90 p-4">
          <p className="text-xs font-semibold text-stone-500">Searches left this month</p>
          <p className="mt-2 text-2xl font-bold text-stone-900">
            {status?.account?.searchesLeft ?? '–'}
            {status?.account?.searchesPerMonth ? (
              <span className="text-sm font-medium text-stone-400"> / {status.account.searchesPerMonth}</span>
            ) : null}
          </p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white/90 p-4">
          <p className="text-xs font-semibold text-stone-500 flex items-center gap-1.5"><Database className="w-3.5 h-3.5" /> Saved by the local cache</p>
          <p className="mt-2 text-2xl font-bold text-stone-900">
            {status?.usage?.cached ?? 0}
            <span className="text-sm font-medium text-stone-400"> repeat searches, 0 credits</span>
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="rounded-2xl border border-stone-200 bg-white/90 p-6 shadow-sm">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Music className="w-5 h-5 text-pink-600" />
              <h2 className="font-bold text-gray-900">Songs from {their} youth</h2>
            </div>
            <p className="text-sm text-stone-500 mb-4">
              YouTube Search API
              {suggestions?.decade ? ` · young adult in the ${suggestions.decade}` : ''}
              {suggestions?.language ? ` · ${suggestions.language}` : ''}
            </p>
            <QueryList
              label="Search for"
              items={songQueries}
              onChange={setSongQueries}
              placeholder="e.g. Bistirno Parore Bhupen Hazarika"
              color="bg-pink-50 text-pink-800"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <h2 className="font-bold text-gray-900">Places from {their} life</h2>
            </div>
            <p className="text-sm text-stone-500 mb-4">Google Maps API + Google Maps Photos API</p>
            <QueryList
              label="Find photos of"
              items={placeQueries}
              onChange={setPlaceQueries}
              placeholder="e.g. Cotton Collegiate School, Guwahati"
              color="bg-emerald-50 text-emerald-800"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-stone-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-stone-500">
            Uses up to {maxSearches} searches. Anything searched before comes from the cache for free.
          </p>
          <button
            onClick={handleRun}
            disabled={running || maxSearches === 0}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-700 px-6 py-3 font-semibold text-white shadow-sm hover:bg-purple-800 disabled:opacity-60"
          >
            {running ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            {running ? 'Searching…' : 'Find songs & places'}
          </button>
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}
        {lastRun && (
          <p className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Done. {lastRun.stats.live} live SerpApi searches, {lastRun.stats.cached} served from cache.
            {lastRun.errors.length > 0 && ` Skipped: ${lastRun.errors.join('; ')}.`}
          </p>
        )}
      </div>

      {/* Songs */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-gray-900">Songs ({songs.filter((s) => s.approved).length} shown)</h2>
          <Link to="/activities" className="text-sm font-semibold text-purple-700 hover:underline">Play in Activities →</Link>
        </div>
        {songs.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-stone-300 bg-white/60 p-6 text-center text-stone-500">
            No songs yet. Press "Find songs &amp; places" to search YouTube.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {songs.map((song) => (
              <div key={song.id} className={`overflow-hidden rounded-2xl border bg-white shadow-sm ${song.approved ? 'border-stone-200' : 'border-stone-200 opacity-60'}`}>
                {song.thumbnail && <img src={song.thumbnail} alt="" className="h-36 w-full object-cover" />}
                <div className="p-4 space-y-2">
                  <p className="font-semibold text-gray-900 leading-snug line-clamp-2">{song.title}</p>
                  <p className="text-xs text-stone-500">{[song.channel, song.length].filter(Boolean).join(' · ')}</p>
                  <Reactions reactions={song.reactions} />
                  <div className="flex items-center justify-between pt-1">
                    <ApproveToggle item={song} onToggle={handleToggle} />
                    <a href={song.link} target="_blank" rel="noreferrer" className="text-stone-400 hover:text-stone-700" aria-label="Open on YouTube">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Places */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-gray-900">Places ({places.filter((p) => p.approved).length} shown)</h2>
          <Link to="/activities" className="text-sm font-semibold text-purple-700 hover:underline">Play in Activities →</Link>
        </div>
        {places.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-stone-300 bg-white/60 p-6 text-center text-stone-500">
            No places yet. Press "Find songs &amp; places" to search Google Maps.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {places.map((place) => (
              <div key={place.id} className={`overflow-hidden rounded-2xl border bg-white shadow-sm ${place.approved ? 'border-stone-200' : 'border-stone-200 opacity-60'}`}>
                <div className="grid grid-cols-3 gap-0.5">
                  {place.photos.slice(0, 3).map((photo, idx) => (
                    <img key={idx} src={photo.image} alt="" className={`h-32 w-full object-cover ${idx === 0 ? 'col-span-2 row-span-2 h-[16.1rem]' : ''}`} />
                  ))}
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-gray-900">{place.title}</p>
                      <p className="text-xs text-stone-500">{place.address}</p>
                    </div>
                    {place.rating ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {place.rating}
                      </span>
                    ) : null}
                  </div>
                  <Reactions reactions={place.reactions} />
                  <div className="flex items-center justify-between pt-1">
                    <ApproveToggle item={place} onToggle={handleToggle} />
                    <a href={place.mapsLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-stone-500 hover:text-stone-800">
                      Open in Maps <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default MemoryFinder;
