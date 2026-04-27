const nock = require('nock');
const { searchRecording } = require('../../src/integrations/musicbrainz');

describe('Integração MusicBrainz', () => {
  afterEach(() => nock.cleanAll());

  test('Busca metadados de uma música (mock)', async () => {
    const title = 'Jump';
    const artist = 'BLACKPINK';
    const mockResp = {
      recordings: [
        {
          title: 'Jump',
          'artist-credit': [{ name: 'BLACKPINK' }],
          releases: [{ title: 'Jump Single', date: '2025-01-01' }]
        }
      ]
    };

    nock('https://musicbrainz.org')
      .get(/\/ws\/2\/recording/)
      .reply(200, mockResp);

    const meta = await searchRecording(title, artist);
    expect(meta).toMatchObject({
      title: 'Jump',
      artist: 'BLACKPINK',
      releaseTitle: 'Jump Single',
      releaseDate: '2025-01-01'
    });
  });
});
