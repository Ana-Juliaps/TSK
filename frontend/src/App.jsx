import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Artist from './pages/Artist';
import Album from './pages/Album';
import Artists from './pages/Artists';
import Notifications from './pages/Notifications';
import SearchResults from './pages/SearchResults';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function MainLayout() {
  const { user } = useAuth();
  return (
    <div className="app-layout">
      {user && <Sidebar />}
      <div className="main-content">
        {user && <Navbar />}
        <main className="page-body">
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/perfil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/artista/:id" element={<ProtectedRoute><Artist /></ProtectedRoute>} />
            <Route path="/artista/:id/album/:albumName" element={<ProtectedRoute><Album /></ProtectedRoute>} />
            <Route path="/artistas" element={<ProtectedRoute><Artists /></ProtectedRoute>} />
            <Route path="/notificacoes" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
            <Route path="/pesquisa" element={<ProtectedRoute><SearchResults /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <MainLayout />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
