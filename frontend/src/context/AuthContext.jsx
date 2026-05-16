import { createContext, useContext, useState } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('tks-user');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function login(email, password) {
    setLoading(true);
    setError(null);
    try {
      const { data } = await authAPI.login(email, password);
      const userData = data.user;
      setUser(userData);
      localStorage.setItem('tks-user', JSON.stringify(userData));
      return { ok: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Erro ao fazer login';
      setError(msg);
      return { ok: false, msg };
    } finally {
      setLoading(false);
    }
  }

  async function register(name, email, password) {
    setLoading(true);
    setError(null);
    try {
      const { data } = await authAPI.register(name, email, password);
      const userData = data.user;
      setUser(userData);
      localStorage.setItem('tks-user', JSON.stringify(userData));
      return { ok: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Erro ao cadastrar';
      setError(msg);
      return { ok: false, msg };
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('tks-user');
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
