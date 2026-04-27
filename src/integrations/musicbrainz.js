const fetch = require('node-fetch');

async function searchRecording(title, artist) {
  const q = encodeURIComponent(`${title}${artist ? ' ' + artist : ''}`);
  const url = `https://musicbrainz.org/ws/2/recording/?query=${q}&fmt=json&limit=1`;
  const res = await fetch(url, { headers: { 'User-Agent': 'TKS/1.0 (seu-email@exemplo.com)' } });
  if (!res.ok) throw new Error('MusicBrainz request failed');
  const json = await res.json();
  const rec = (json.recordings && json.recordings[0]) || null;
  if (!rec) return null;
  return {
    title: rec.title,
    artist: (rec['artist-credit'] && rec['artist-credit'][0].name) || '',
    releaseDate: (rec.releases && rec.releases[0] && rec.releases[0].date) || '',
    releaseTitle: (rec.releases && rec.releases[0] && rec.releases[0].title) || ''
  };
}

module.exports = { searchRecording };
