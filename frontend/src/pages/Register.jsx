import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Eye, EyeOff } from 'lucide-react';
import './Auth.css';

export default function Register() {
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await register(name, email, password);
    if (res.ok) navigate('/');
  }

  return (
    <div className="auth-page fade-in" id="register-page">
      <div className="auth-card glass-card">
        <div className="auth-header">
          <img src="/logo_fundo_rosa.png" alt="TSK" className="auth-logo" />
          <h1 className="auth-title">Criar conta no <span className="gradient-text">TSK</span></h1>
          <p className="auth-sub">Junte-se à comunidade K-pop! ✨</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form" id="register-form">
          {error && <div className="auth-error">{error}</div>}

          <label className="auth-label">
            <span>Nome</span>
            <input
              type="text"
              className="input-field"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Seu nome"
              required
              id="register-name"
            />
          </label>

          <label className="auth-label">
            <span>E-mail</span>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              id="register-email"
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
                minLength={6}
                id="register-password"
              />
              <button type="button" className="auth-pw-toggle" onClick={() => setShowPw(!showPw)}>
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          <button type="submit" className="btn btn-primary auth-submit" disabled={loading} id="register-submit">
            <UserPlus size={18} /> {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <p className="auth-footer">
          Já tem conta? <Link to="/login" className="auth-link">Entrar</Link>
        </p>
      </div>
    </div>
  );
}
