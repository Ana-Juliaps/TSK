import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { artistasAPI, musicasAPI } from '../services/api';
import { Disc3, ArrowLeft, Music } from 'lucide-react';
import './Artist.css';

export default function Album() {
  const { id, albumName } = useParams();
  const [musicas, setMusicas] = useState([]);
  const [artista, setArtista] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const artRes = await artistasAPI.buscar(id);
        setArtista(artRes.data);

        // Fetch all musics and filter by artist and album
        const musRes = await musicasAPI.listar();
        const albumMusics = musRes.data.filter(m => m.artistaId == id && m.album === albumName);
        setMusicas(albumMusics);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    }
    load();
  }, [id, albumName]);

  if (loading) return <div className="loading-center"><div className="spinner" /></div>;

  return (
    <div className="artist-page fade-in">
      <Link to={`/artista/${id}`} className="btn btn-ghost mb-2">
        <ArrowLeft size={16} /> Voltar para {artista?.nome}
      </Link>
      
      <div className="card glass-card" style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
         <div className="artist__album-cover" style={{ width: '80px', height: '80px', borderRadius: '12px' }}>
           <Disc3 size={40} />
         </div>
         <div>
           <h1 className="page-title" style={{ marginBottom: '0.2rem' }}>{albumName}</h1>
           <p className="artist__hero-desc" style={{ marginTop: 0 }}>{artista?.nome}</p>
         </div>
      </div>

      <h2 className="section-title"><Music size={16} /> Músicas do Álbum</h2>
      {musicas.length > 0 ? (
        <div className="grid-auto">
          {musicas.map(m => (
            <div className="card" key={m.id}>
              <h3>{m.titulo}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{m.ano}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Music size={48} />
          <p>Nenhuma música encontrada para este álbum.</p>
        </div>
      )}
    </div>
  );
}
