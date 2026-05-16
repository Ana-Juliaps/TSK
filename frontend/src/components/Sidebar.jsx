import { NavLink } from 'react-router-dom';
import { Home, Search, Mic2, User, Bell, Settings } from 'lucide-react';
import './Sidebar.css';

const links = [
  { to: '/',             icon: Home,     label: 'Início' },
  { to: '/pesquisa',     icon: Search,   label: 'Explorar' },
  { to: '/artistas',     icon: Mic2,     label: 'Artistas' },
  { to: '/perfil',       icon: User,     label: 'Perfil' },
  { to: '/notificacoes', icon: Bell,     label: 'Alertas' },
];

export default function Sidebar() {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sidebar" id="sidebar">
        <nav className="sidebar__nav">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
              }
            >
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__footer">
          <span className="sidebar__copy">© 2026 TKS</span>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="bottom-nav" id="bottom-nav">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `bottom-nav__link ${isActive ? 'bottom-nav__link--active' : ''}`
            }
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
