const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.resolve(__dirname, '..', 'data', 'db.json');
const MB_BASE = 'https://musicbrainz.org/ws/2';


async function fetchJson(url) {
  const res = await fetch(url, {
    headers: {
    'User-Agent': 'TSK-Kpop/1.0 (ana@exemplo.com)',
    Accept: 'application/json'
}});

  if (!res.ok) {
    if (res.status >= 500) return null;
    throw new Error(`MusicBrainz request failed: ${res.status}`);
  }

  return res.json();
}

function extractWikiTitle(resourceUrl) {
  const match = resourceUrl.match(/\/wiki\/(.+)$/);
  return match ? decodeURIComponent(match[1]) : null;
}

async function fetchWikipediaSummary(title) {
  if (!title) return '';
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'TSK-Kpop/1.0 (ana@exemplo.com)' } });
    if (!res.ok) return '';
    const data = await res.json();
    return data.extract || '';
 } catch (err) {
  console.error('Erro MusicBrainz:', err.message);
  throw err;
}
}

async function getArtistDescription(artistData) {
  if (artistData.disambiguation) return artistData.disambiguation;
  if (artistData.annotation) return artistData.annotation;

  const wikiRelation = (artistData.relations || []).find(r => ['wikipedia', 'wikidata'].includes(r.type));
  if (wikiRelation && wikiRelation.url && wikiRelation.url.resource) {
    const title = extractWikiTitle(wikiRelation.url.resource);
    const summary = await fetchWikipediaSummary(title);
    if (summary) return summary;
  }

  return '';
}

async function getArtistReleaseGroups(mbid) {
  const url = `${MB_BASE}/release-group?artist=${mbid}&fmt=json&limit=100`;
  const data = await fetchJson(url);
  if (!data) return [];
  return (data['release-groups'] || []).map(r => ({
    id: r.id,
    title: r.title,
    primaryType: r['primary-type'] || null,
    secondaryTypes: r['secondary-types'] || [],
    firstReleaseDate: r['first-release-date'] || null,
    releaseCount: r['release-group-count'] || null
  }));
}

async function getArtistReleases(mbid) {
  const url = `${MB_BASE}/release?artist=${mbid}&fmt=json&limit=100`;
  const data = await fetchJson(url);
  if (!data) return [];
  return (data.releases || []).map(r => ({
    id: r.id,
    title: r.title,
    status: r.status || null,
    date: r.date || null,
    country: r.country || null,
    releaseGroupId: r['release-group']?.id || null,
    barcode: r.barcode || null,
    trackCount: r['track-count'] || null,
    format: r['media']?.[0]?.format || null
  }));
}

async function getReleaseTracks(releaseId) {
  const url = `${MB_BASE}/release/${releaseId}?fmt=json&inc=recordings`;
  const data = await fetchJson(url);
  const tracks = [];
  if (!data) return tracks;

  if (Array.isArray(data.media)) {
    data.media.forEach(medium => {
      const mediumTitle = medium.title || medium.format || null;
      (medium.tracks || []).forEach(track => {
        tracks.push({
          id: track.id,
          title: track.title,
          length: track.length || null,
          position: track.position || null,
          number: track.number || null,
          mediumTitle
        });
      });
    });
  }

  return tracks;
}

async function getArtistEvents(mbid) {
  const url = `${MB_BASE}/event?artist=${mbid}&fmt=json`;
  const data = await fetchJson(url);
  if (!data) return [];
  return (data.events || []).map(ev => ({
    id: ev.id,
    nome: ev.name,
    inicio: ev.time || ev.begin || null,
    fim: ev.end || null,
    local: ev.area?.name || null
  }));
}


async function getArtistInfo(mbid) {
  try {
    const url = `${MB_BASE}/artist/${mbid}?fmt=json&inc=url-rels+release-groups`;
    const artistData = await fetchJson(url);

    if (!artistData) {
      return null; // retorna null se não achou nada
    }

    const descricao = await getArtistDescription(artistData).catch(() => null);
    const releaseGroups = await getArtistReleaseGroups(mbid).catch(() => []);
    const releasesArtistaRelease = await getArtistReleases(mbid).catch(() => []);
    const eventos = await getArtistEvents(mbid).catch(() => []);
    const releasesWithTracks = await getReleaseTracks(mbid).catch(() => []);

    return {
      mbid,
      nome: artistData.name || artistData['sort-name'] || '',
      descricao: descricao || '',
      tipo: artistData.type || null,
      area: artistData.area?.name || null,
      pais: artistData.country || null,
      releaseGroups,
      releases: releasesArtistaRelease,
      releasesWithTracks: releasesWithTracks,
      eventos
    };
  } catch (err) {
    console.error('Erro MusicBrainz:', err.message);
    return null; // devolve null em vez de lançar erro
  }
}

function readDB() {
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw);
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

function saveArtistToDB(artist) {
  const db = readDB();
  db.artistas = db.artistas || [];

  const existing = db.artistas.find(a => a.mbid === artist.mbid || (a.nome && artist.nome && a.nome.toLowerCase() === artist.nome.toLowerCase()));
  if (existing) {
    Object.assign(existing, artist);
    writeDB(db);
    return existing;
  }

  const nextId = db.artistas.reduce((max, current) => Math.max(max, Number(current.id) || 0), 0) + 1;
  const newArtist = { id: nextId, ...artist };
  db.artistas.push(newArtist);
  writeDB(db);
  return newArtist;
}

module.exports = { getArtistInfo, saveArtistToDB};
