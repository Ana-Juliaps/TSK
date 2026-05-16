import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import './Auth.css';

export default function Login() {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await login(email, password);
    if (res.ok) navigate('/');
  }

  return (
    <div className="auth-page fade-in" id="login-page">
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div className="auth-card glass-card">
        <div className="auth-header">
          <img src="/logo_fundo_rosa.png" alt="TSK" className="auth-logo" />
          <h1 className="auth-title">Entrar no <span className="gradient-text">TSK</span></h1>
          <p className="auth-sub">Bem-vindo de volta! 💖</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form" id="login-form">
          {error && <div className="auth-error">{error}</div>}

          <label className="auth-label">
            <span>E-mail</span>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              id="login-email"
            />
          </label>

          <label className="auth-label">
            <span>Senha</span>
            <div className="auth-pw-wrap">
              <input
                type={showPw ? 'text' : 'password'}
                className="input-field"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                id="login-password"
              />
              <button type="button" className="auth-pw-toggle" onClick={() => setShowPw(!showPw)}>
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          <button type="submit" className="btn btn-primary auth-submit" disabled={loading} id="login-submit">
            <LogIn size={18} /> {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="auth-footer">
          Não tem conta? <Link to="/register" className="auth-link">Cadastre-se</Link>
        </p>
      </div>

      <div className="auth-info mt-4 glass-card" style={{ maxWidth: '420px', width: '100%', padding: '1.5rem', borderRadius: '1.5rem', marginTop: '1.5rem', marginLeft: 'auto', marginRight: 'auto' }}>
        <h3 style={{ marginBottom: '0.5rem', fontFamily: 'Playfair Display, serif' }}>Sobre o TSK</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem' }}>
          Tudo Sobre Kpop é a plataforma definitiva para você acompanhar seus artistas favoritos.
        </p>
        <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
           <li>✨ Acompanhe novidades e lançamentos</li>
           <li>💖 Siga seus artistas preferidos</li>
           <li>🔔 Receba notificações de comebacks</li>
           <li>🎵 Explore álbuns e músicas</li>
        </ul>
      </div>
      </div>
    </div>
  );
}
