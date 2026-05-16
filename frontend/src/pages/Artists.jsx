import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { artistasAPI } from '../services/api';
import { Mic2 } from 'lucide-react';
import './Artists.css';

export default function Artists() {
  const [artistas, setArtistas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const { data } = await artistasAPI.listar();
        setArtistas(data);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    }
    load();
  }, []);

  if (loading) return <div className="loading-center"><div className="spinner" /></div>;

  return (
    <div className="artists-page fade-in" id="artists-page">
      <h1 className="page-title">Artistas</h1>
      <p className="artists__sub">Descubra e acompanhe seus grupos e solistas favoritos.</p>

      {artistas.length === 0 ? (
        <div className="empty-state">
          <Mic2 size={56} />
          <p>Nenhum artista cadastrado ainda.</p>
        </div>
      ) : (
        <div className="grid-auto mt-3">
          {artistas.map(a => (
            <Link to={`/artista/${a.id}`} className="card artists__card" key={a.id}>
              <div className="artists__avatar">{a.nome?.[0]}</div>
              <h3 className="artists__name">{a.nome}</h3>
              <p className="artists__desc">{a.descricao}</p>
              <div className="artists__tags">
                {a.albuns?.slice(0, 2).map((al, i) => (
                  <span className="tag" key={i}>{al}</span>
                ))}
              </div>
              <span className="artists__followers">{a.seguidores?.length || 0} seguidores</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
