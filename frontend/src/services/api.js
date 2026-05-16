import axios from 'axios';

const api = axios.create({
  baseURL: '',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

/* ── Auth ── */
export const authAPI = {
  login:    (email, password) => api.post('/auth/login', { email, password }),
  register: (name, email, password) => api.post('/auth/register', { name, email, password }),
};

/* ── Home ── */
export const homeAPI = {
  getData: (userId) => api.get(`/home${userId ? `?userId=${userId}` : ''}`),
};

/* ── Artistas ── */
export const artistasAPI = {
  listar:            ()               => api.get('/artistas'),
  buscar:            (id)             => api.get(`/artistas/${id}`),
  seguir:            (id, userId)     => api.post(`/artistas/${id}/seguir`, { userId }),
  deixarDeSeguir:    (id, userId)     => api.post(`/artistas/${id}/deixar`, { userId }),
  musicBrainz:       (mbid)           => api.get(`/artistas/musica/artist/${mbid}`),
};

/* ── Usuários ── */
export const usuariosAPI = {
  buscar:                (id)          => api.get(`/usuarios/${id}`),
  atualizar:             (id, data)    => api.put(`/usuarios/${id}`, data),
  atualizarFoto:         (id, foto)    => api.put(`/usuarios/${id}/foto`, { foto }),
  atualizarConfiguracoes:(id, cfg)     => api.put(`/usuarios/${id}/configuracoes`, cfg),
  artistasSeguidos:      (id)          => api.get(`/usuarios/${id}/artistas`),
};

/* ── Notificações ── */
export const notificacoesAPI = {
  listar:      (tipo)  => api.get('/notificacoes', { params: tipo ? { tipo } : {} }),
  buscar:      (id)    => api.get(`/notificacoes/${id}`),
  marcarLida:  (id)    => api.put(`/notificacoes/${id}/lida`),
  arquivar:    (id)    => api.put(`/notificacoes/${id}/arquivar`),
  remover:     (id)    => api.delete(`/notificacoes/${id}`),
  criar:       (data)  => api.post('/notificacoes', data),
};

/* ── Pesquisa ── */
export const pesquisaAPI = {
  pesquisar: (q) => api.get('/pesquisa', { params: { q } }),
};

/* ── Músicas ── */
export const musicasAPI = {
  listar:  ()   => api.get('/musicas'),
  buscar:  (id) => api.get(`/musicas/${id}`),
};

export default api;
