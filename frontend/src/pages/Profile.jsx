import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usuariosAPI, artistasAPI } from '../services/api';
import { Camera, Settings, Heart, Mail, Globe, Bell } from 'lucide-react';
import './Profile.css';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [seguidos, setSeguidos] = useState([]);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    async function load() {
      try {
        const [pRes, aRes] = await Promise.all([
          usuariosAPI.buscar(user.id),
          artistasAPI.listar()
        ]);
        setProfile(pRes.data);
        setFormData(pRes.data);
        // map IDs to full artist objects
        const artistIds = pRes.data.artistasSeguidos || [];
        const all = aRes.data;
        setSeguidos(all.filter(a => artistIds.includes(a.id)));
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    }
    load();
  }, [user, navigate]);

  async function handleSaveProfile(e) {
    e.preventDefault();
    try {
      const { data } = await usuariosAPI.atualizar(user.id, {
        name: formData.name,
        bias: formData.bias,
        idade: formData.idade,
      });
      setProfile(data);
      setEditing(false);
    } catch (e) { console.error(e); }
  }

  async function handleSaveConfig(field, value) {
    try {
      const cfg = { ...profile.configuracoes, [field]: value };
      await usuariosAPI.atualizarConfiguracoes(user.id, cfg);
      setProfile(prev => ({ ...prev, configuracoes: cfg }));
    } catch (e) { console.error(e); }
  }

  if (loading) return <div className="loading-center"><div className="spinner" /></div>;
  if (!profile) return <div className="empty-state"><p>Perfil não encontrado</p></div>;

  return (
    <div className="profile fade-in" id="profile-page">
      {/* Banner */}
      <div className="profile__banner">
        <div className="profile__banner-glow" />
      </div>

      {/* Avatar + Info */}
      <div className="profile__header">
        <div className="profile__avatar-wrap">
          <div className="profile__avatar">
            {profile.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <button className="profile__avatar-edit btn btn-ghost" title="Trocar foto">
            <Camera size={14} />
          </button>
        </div>

        <div className="profile__info">
          {editing ? (
            <form onSubmit={handleSaveProfile} className="profile__edit-form">
              <input className="input-field" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Nome" />
              <input className="input-field" value={formData.bias || ''} onChange={e => setFormData({...formData, bias: e.target.value})} placeholder="Bias favorito" />
              <input className="input-field" type="number" value={formData.idade || ''} onChange={e => setFormData({...formData, idade: Number(e.target.value)})} placeholder="Idade" />
              <div className="profile__edit-actions">
                <button type="submit" className="btn btn-primary">Salvar</button>
                <button type="button" className="btn btn-ghost" onClick={() => { setEditing(false); setFormData(profile); }}>Cancelar</button>
              </div>
            </form>
          ) : (
            <>
              <h1 className="page-title">{profile.name}</h1>
              <div className="profile__meta">
                <span className="tag"><Mail size={12} /> {profile.email}</span>
                {profile.bias && <span className="tag"><Heart size={12} /> Bias: {profile.bias}</span>}
                {profile.idade && <span className="tag">📅 {profile.idade} anos</span>}
              </div>
              <button className="btn btn-ghost mt-2" onClick={() => setEditing(true)}>
                <Settings size={16} /> Editar perfil
              </button>
            </>
          )}
        </div>
      </div>

      {/* Configurações */}
      <section className="profile__section">
        <h2 className="section-title"><Settings size={16} /> Configurações</h2>
        <div className="profile__config-grid">
          <div className="card profile__config-item">
            <Globe size={20} />
            <div>
              <span className="profile__config-label">Idioma</span>
              <select
                className="input-field"
                value={profile.configuracoes?.idioma || 'pt-BR'}
                onChange={e => handleSaveConfig('idioma', e.target.value)}
              >
                <option value="pt-BR">Português (BR)</option>
                <option value="en-US">English (US)</option>
                <option value="ko-KR">한국어</option>
              </select>
            </div>
          </div>
          <div className="card profile__config-item">
            <Bell size={20} />
            <div>
              <span className="profile__config-label">Notificações</span>
              <label className="profile__toggle">
                <input
                  type="checkbox"
                  checked={profile.configuracoes?.notificacoes ?? true}
                  onChange={e => handleSaveConfig('notificacoes', e.target.checked)}
                />
                <span className="profile__toggle-slider" />
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Artistas seguidos */}
      <section className="profile__section">
        <h2 className="section-title"><Heart size={16} /> Artistas seguidos ({seguidos.length})</h2>
        {seguidos.length === 0 ? (
          <div className="empty-state">
            <Heart size={48} />
            <p>Você ainda não segue nenhum artista</p>
            <Link to="/artistas" className="btn btn-primary">Explorar artistas</Link>
          </div>
        ) : (
          <div className="grid-auto">
            {seguidos.map(a => (
              <Link to={`/artista/${a.id}`} className="card profile__artist-card" key={a.id}>
                <div className="profile__artist-avatar">{a.nome?.[0]}</div>
                <span className="profile__artist-name">{a.nome}</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
