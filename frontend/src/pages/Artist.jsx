import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { artistasAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Heart, HeartOff, Calendar, Disc3, Vote, Users, ExternalLink } from 'lucide-react';
import './Artist.css';

export default function Artist() {
  const { id } = useParams();
  const { user } = useAuth();
  const [artista, setArtista] = useState(null);
  const [mbData, setMbData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const { data } = await artistasAPI.buscar(id);
        setArtista(data);
        setFollowing(data.seguidores?.includes(user?.id));

        // Try MusicBrainz for known groups
        const mbids = {
          'Stray Kids': '29e8012d-ecfb-4730-b214-83525a5a1c07',
          'BTS': '65ea2a78-a8ad-4330-a03b-2c00c0c59289',
          'BLACKPINK': 'a2e2f04d-3c1b-458f-aaed-0d1e92274a8e',
        };
        const mbid = mbids[data.nome];
        if (mbid) {
          try {
            const mbRes = await artistasAPI.musicBrainz(mbid);
            setMbData(mbRes.data);
          } catch (e) { console.log('MusicBrainz unavailable'); }
        }
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    }
    load();
  }, [id, user]);

  async function toggleFollow() {
    if (!user) return;
    try {
      if (following) {
        await artistasAPI.deixarDeSeguir(id, user.id);
      } else {
        await artistasAPI.seguir(id, user.id);
      }
      setFollowing(!following);
    } catch (e) { console.error(e); }
  }

  if (loading) return <div className="loading-center"><div className="spinner" /></div>;
  if (!artista) return <div className="empty-state"><p>Artista não encontrado</p></div>;

  return (
    <div className="artist-page fade-in" id="artist-page">
      {/* Hero */}
      <section className="artist__hero">
        <div className="artist__hero-bg" />
        <div className="artist__hero-content">
          <div className="artist__hero-avatar">
            {artista.nome?.[0]}
          </div>
          <div className="artist__hero-info">
            <span className="tag">Artista</span>
            <h1 className="page-title">{artista.nome}</h1>
            <p className="artist__hero-desc">{artista.descricao}</p>
            <div className="artist__hero-stats">
              <span><Users size={16} /> {artista.seguidores?.length || 0} seguidores</span>
            </div>
            {user && (
              <button className={`btn ${following ? 'btn-ghost' : 'btn-primary'} mt-2`} onClick={toggleFollow} id="follow-btn">
                {following ? <><HeartOff size={16} /> Deixar de seguir</> : <><Heart size={16} /> Seguir</>}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Eventos */}
      {artista.eventos?.length > 0 && (
        <section className="artist__section">
          <h2 className="section-title"><Calendar size={16} /> Eventos</h2>
          <div className="grid-auto">
            {artista.eventos.map((ev, i) => (
              <article className="card artist__event-card" key={i}>
                <Calendar size={20} className="artist__event-icon" />
                <span>{ev}</span>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Álbuns */}
      {artista.albuns?.length > 0 && (
        <section className="artist__section">
          <h2 className="section-title"><Disc3 size={16} /> Álbuns</h2>
          <div className="grid-auto">
            {artista.albuns.map((al, i) => (
              <Link to={`/artista/${id}/album/${encodeURIComponent(al)}`} className="card artist__album-card" key={i}>
                <div className="artist__album-cover">
                  <Disc3 size={28} />
                </div>
                <span className="artist__album-name">{al}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Votações */}
      {artista.votacoes?.length > 0 && (
        <section className="artist__section">
          <h2 className="section-title"><Vote size={16} /> Votações</h2>
          <div className="grid-auto">
            {artista.votacoes.map((v, i) => (
              <article className="card" key={i}>
                <p>{v}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* MusicBrainz */}
      {mbData && (
        <section className="artist__section">
          <h2 className="section-title"><ExternalLink size={16} /> Dados MusicBrainz</h2>

          {mbData.name && (
            <div className="card mb-2">
              <p><strong>Nome oficial:</strong> {mbData.name}</p>
              {mbData.country && <p><strong>País:</strong> {mbData.country}</p>}
              {mbData['life-span']?.begin && <p><strong>Início:</strong> {mbData['life-span'].begin}</p>}
              {mbData.type && <p><strong>Tipo:</strong> {mbData.type}</p>}
            </div>
          )}

          {mbData.releases?.length > 0 && (
            <>
              <h3 className="section-title mt-2">Lançamentos</h3>
              <div className="grid-auto">
                {mbData.releases.slice(0, 12).map((r, i) => (
                  <article className="card artist__mb-release" key={i}>
                    <Disc3 size={16} />
                    <div>
                      <p className="artist__mb-title">{r.title}</p>
                      {r.date && <p className="artist__mb-date">{r.date}</p>}
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>
      )}
    </div>
  );
}
