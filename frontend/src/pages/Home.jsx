import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { homeAPI, artistasAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Music, CalendarDays, TrendingUp, Star, ChevronRight } from 'lucide-react';
import './Home.css';

export default function Home() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [artistas, setArtistas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [homeRes, artRes] = await Promise.all([
          homeAPI.getData(user?.id),
          artistasAPI.listar()
        ]);
        setData(homeRes.data);
        setArtistas(artRes.data);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    }
    load();
  }, []);

  if (loading) return <div className="loading-center"><div className="spinner" /></div>;

  return (
    <div className="home fade-in" id="home-page">
      {/* Hero */}
      <section className="home__hero" id="hero-section">
        <div className="home__hero-content">
          <h1 className="page-title">
            {user ? `Olá, ${user.name} 💖` : 'Bem-vindo ao TSK'}
          </h1>
          <p className="home__hero-sub">
            Tudo Sobre Kpop — acompanhe seus artistas, lançamentos e novidades em um só lugar.
          </p>
          {!user && (
            <div className="home__hero-actions">
              <Link to="/register" className="btn btn-primary">Criar conta grátis</Link>
              <Link to="/login" className="btn btn-ghost">Já tenho conta</Link>
            </div>
          )}
        </div>
        <div className="home__hero-glow" />
      </section>

      {/* Artistas seguidos */}
      {data?.artistasSeguidos?.length > 0 && (
        <section className="home__section">
          <h2 className="section-title"><Star size={16} /> Artistas seguidos</h2>
          <div className="home__artists-row">
            {data.artistasSeguidos.map((a, i) => (
              <Link to={`/artista/${a.id}`} className="home__artist-chip card" key={i}>
                <span className="home__artist-icon">{a.icone || '🎤'}</span>
                <span>{a.nome}</span>
                <ChevronRight size={14} />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Atualizações recentes */}
      {data?.atualizacoesRecentes?.length > 0 && (
        <section className="home__section">
          <h2 className="section-title"><TrendingUp size={16} /> Novidades</h2>
          <div className="grid-auto">
            {data.atualizacoesRecentes.map((item, i) => (
              <article className="card home__news-card" key={i}>
                <span className="tag"><Music size={12} /> {item.artista}</span>
                <p className="home__news-text">{item.noticia}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Comebacks */}
      {data?.comebacks?.length > 0 && (
        <section className="home__section">
          <h2 className="section-title"><CalendarDays size={16} /> Comebacks</h2>
          <div className="grid-auto">
            {data.comebacks.map((cb, i) => (
              <article className="card home__comeback-card" key={i}>
                <h3 className="home__comeback-group">{cb.grupo}</h3>
                <p className="home__comeback-msg">{cb.mensagem}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Recomendações */}
      {data?.recomendacoes?.length > 0 && (
        <section className="home__section">
          <h2 className="section-title"><Star size={16} /> Recomendações</h2>
          <div className="grid-auto">
            {data.recomendacoes.map((rec, i) => (
              <article className="card home__rec-card" key={i}>
                <h3>{rec.grupo}</h3>
                <p className="home__rec-reason">{rec.motivo}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Todos os artistas */}
      {artistas.length > 0 && (
        <section className="home__section">
          <h2 className="section-title"><Music size={16} /> Artistas populares</h2>
          <div className="grid-auto">
            {artistas.map(a => (
              <Link to={`/artista/${a.id}`} className="card home__full-artist-card" key={a.id}>
                <div className="home__full-artist-avatar">
                  {a.nome?.[0]}
                </div>
                <h3>{a.nome}</h3>
                <p className="home__full-artist-desc">{a.descricao}</p>
                <div className="home__full-artist-tags">
                  {a.albuns?.slice(0, 2).map((al, i) => (
                    <span className="tag" key={i}>{al}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
