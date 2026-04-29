// src/integrations/musicbrainz.js
const fetch = require('node-fetch');

async function getArtistInfo(mbid) {
  const url = `https://musicbrainz.org/ws/2/artist/${mbid}?fmt=json&inc=recordings+releases`;
  const res = await fetch(url, { headers: { 'User-Agent': 'TSK-Kpop/1.0 (ana@exemplo.com)' } });
  if (!res.ok) throw new Error(`MusicBrainz request failed: ${res.status}`);
  return await res.json();
}

module.exports = { getArtistInfo };

