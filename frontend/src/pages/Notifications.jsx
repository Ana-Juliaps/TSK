import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notificacoesAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Bell, Check, Archive, Trash2, Filter } from 'lucide-react';
import './Notifications.css';

const FILTERS = [
  { key: '',       label: 'Todas' },
  { key: 'evento', label: 'Eventos' },
  { key: 'album',  label: 'Álbuns' },
];

export default function Notifications() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notifs, setNotifs] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    loadNotifs();
  }, [user, filter, navigate]);

  async function loadNotifs() {
    setLoading(true);
    try {
      const { data } = await notificacoesAPI.listar(filter || undefined);
      setNotifs(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  async function markRead(id) {
    try {
      await notificacoesAPI.marcarLida(id);
      setNotifs(prev => prev.map(n => n.id === id ? { ...n, lida: true } : n));
    } catch (e) { console.error(e); }
  }

  async function archive(id) {
    try {
      await notificacoesAPI.arquivar(id);
      setNotifs(prev => prev.map(n => n.id === id ? { ...n, arquivada: true } : n));
    } catch (e) { console.error(e); }
  }

  async function remove(id) {
    try {
      await notificacoesAPI.remover(id);
      setNotifs(prev => prev.filter(n => n.id !== id));
    } catch (e) { console.error(e); }
  }

  const visible = notifs.filter(n => !n.arquivada);
  const unread = visible.filter(n => !n.lida).length;

  return (
    <div className="notifs fade-in" id="notifications-page">
      <div className="notifs__header">
        <div>
          <h1 className="page-title">Notificações</h1>
          {unread > 0 && <span className="badge">{unread} nova{unread > 1 ? 's' : ''}</span>}
        </div>

        <div className="notifs__filters">
          <Filter size={16} />
          {FILTERS.map(f => (
            <button
              key={f.key}
              className={`btn ${filter === f.key ? 'btn-primary' : 'btn-ghost'} notifs__filter-btn`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loading-center"><div className="spinner" /></div>
      ) : visible.length === 0 ? (
        <div className="empty-state">
          <Bell size={56} />
          <p>Nenhuma notificação por aqui!</p>
        </div>
      ) : (
        <div className="notifs__list">
          {visible.map(n => (
            <div className={`card notifs__item ${n.lida ? '' : 'notifs__item--unread'}`} key={n.id}>
              <div className="notifs__item-body">
                <span className="tag">{n.tipo || 'geral'}</span>
                <p className="notifs__item-msg">{n.mensagem}</p>
              </div>
              <div className="notifs__item-actions">
                {!n.lida && (
                  <button className="btn btn-ghost" onClick={() => markRead(n.id)} title="Marcar como lida">
                    <Check size={16} />
                  </button>
                )}
                <button className="btn btn-ghost" onClick={() => archive(n.id)} title="Arquivar">
                  <Archive size={16} />
                </button>
                <button className="btn btn-danger" onClick={() => remove(n.id)} title="Remover">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
