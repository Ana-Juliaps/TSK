import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Search, Bell, Sun, Moon, LogOut, User, Menu, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  function handleSearch(e) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/pesquisa?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  }

  return (
    <header className="navbar" id="main-navbar">
      <div className="navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo" id="logo-link">
          <img src="/logo_fundo_rosa.png" alt="TSK" className="navbar__logo-img" />
          <span className="navbar__logo-text">
            T<span className="gradient-text">S</span>K
          </span>
        </Link>

        {/* Search */}
        <form className="navbar__search hide-mobile" onSubmit={handleSearch} id="search-form">
          <Search size={18} className="navbar__search-icon" />
          <input
            type="text"
            placeholder="Buscar artistas, músicas..."
            className="navbar__search-input"
            value={query}
            onChange={e => setQuery(e.target.value)}
            id="search-input"
          />
        </form>

        {/* Actions */}
        <div className="navbar__actions">
          <Link to="/pesquisa" className="navbar__icon-btn show-mobile" aria-label="Pesquisar" id="mobile-search-btn">
            <Search size={20} />
          </Link>

          {user && (
            <Link to="/notificacoes" className="navbar__icon-btn" aria-label="Notificações" id="notif-btn">
              <Bell size={20} />
              <span className="navbar__notif-dot" />
            </Link>
          )}

          <button onClick={toggleTheme} className="navbar__icon-btn" aria-label="Alternar tema" id="theme-toggle">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {user ? (
            <div className="navbar__user-menu">
              <button className="navbar__avatar-btn" onClick={() => setMenuOpen(!menuOpen)} id="user-menu-btn">
                <div className="navbar__avatar-circle">
                  {user.name?.[0]?.toUpperCase() || 'U'}
                </div>
              </button>
              {menuOpen && (
                <div className="navbar__dropdown slide-down">
                  <Link to="/perfil" className="navbar__dropdown-item" onClick={() => setMenuOpen(false)}>
                    <User size={16} /> Meu Perfil
                  </Link>
                  <button className="navbar__dropdown-item" onClick={() => { logout(); setMenuOpen(false); navigate('/login'); }}>
                    <LogOut size={16} /> Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary" id="login-btn">Entrar</Link>
          )}
        </div>
      </div>
    </header>
  );
}
