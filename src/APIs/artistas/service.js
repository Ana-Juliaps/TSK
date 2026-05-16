const { getArtistInfo, saveArtistToDB } = require('../../integrations/musicbrainz');
const db = require('../../data/db.json');

async function getArtistByMbid(mbid) {
  let artist = db.artistas.find(a => a.mbid === mbid);
  if (!artist) {
    const info = await getArtistInfo(mbid);
    artist = saveArtistToDB(info);
  }
  return artist;
}

module.exports = { getArtistByMbid };

