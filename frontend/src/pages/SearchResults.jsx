import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { pesquisaAPI } from '../services/api';
import { Search, Mic2, Users } from 'lucide-react';
import './SearchResults.css';

export default function SearchResults() {
  const [params] = useSearchParams();
  const query = params.get('q') || '';
  const [results, setResults] = useState({ artistas: [], usuarios: [] });
  const [localQuery, setLocalQuery] = useState(query);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      search(query);
      setLocalQuery(query);
    }
  }, [query]);

  async function search(q) {
    setLoading(true);
    try {
      const { data } = await pesquisaAPI.pesquisar(q);
      setResults(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  function handleSearch(e) {
    e.preventDefault();
    if (localQuery.trim()) {
      // update URL
      window.history.pushState({}, '', `/pesquisa?q=${encodeURIComponent(localQuery.trim())}`);
      search(localQuery.trim());
    }
  }

  const hasResults = results.artistas.length > 0 || results.usuarios.length > 0;

  return (
    <div className="search-page fade-in" id="search-page">
      <h1 className="page-title">Explorar</h1>

      <form className="search-page__bar" onSubmit={handleSearch} id="search-page-form">
        <Search size={20} className="search-page__bar-icon" />
        <input
          type="text"
          className="input-field search-page__input"
          value={localQuery}
          onChange={e => setLocalQuery(e.target.value)}
          placeholder="Buscar artistas, grupos, usuários..."
          id="search-page-input"
        />
        <button type="submit" className="btn btn-primary">Buscar</button>
      </form>

      {loading ? (
        <div className="loading-center"><div className="spinner" /></div>
      ) : !query ? (
        <div className="empty-state">
          <Search size={56} />
          <p>Digite algo para pesquisar</p>
        </div>
      ) : !hasResults ? (
        <div className="empty-state">
          <Search size={56} />
          <p>Nenhum resultado encontrado para "{query}"</p>
        </div>
      ) : (
        <div className="search-page__results">
          {results.artistas.length > 0 && (
            <section className="search-page__section">
              <h2 className="section-title"><Mic2 size={16} /> Artistas</h2>
              <div className="grid-auto">
                {results.artistas.map(a => (
                  <Link to={`/artista/${a.id}`} className="card search-page__artist-card" key={a.id}>
                    <div className="search-page__artist-avatar">{a.nome?.[0]}</div>
                    <div>
                      <h3 className="search-page__artist-name">{a.nome}</h3>
                      <p className="search-page__artist-desc">{a.descricao}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {results.usuarios.length > 0 && (
            <section className="search-page__section">
              <h2 className="section-title"><Users size={16} /> Usuários</h2>
              <div className="grid-auto">
                {results.usuarios.map(u => (
                  <div className="card search-page__user-card" key={u.id}>
                    <div className="search-page__user-avatar">{u.name?.[0]?.toUpperCase()}</div>
                    <div>
                      <h3>{u.name}</h3>
                      {u.bias && <span className="tag">{u.bias}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
