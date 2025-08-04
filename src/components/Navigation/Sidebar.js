import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ userID }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '🏠',
      path: `/dashboard/${userID}`,
      active: location.pathname === `/dashboard/${userID}`
    },
    {
      id: 'plan',
      label: 'Mi Plan',
      icon: '📋',
      path: `/plan/${userID}`,
      active: location.pathname.includes('/plan/')
    },
    {
      id: 'progress',
      label: 'Progreso',
      icon: '📊',
      path: `/progress/${userID}`,
      active: location.pathname.includes('/progress/')
    },
    {
      id: 'sports',
      label: 'Deportes',
      icon: '⚽',
      path: `/sports/${userID}`,
      active: location.pathname.includes('/sports/')
    },
    {
      id: 'nutrition',
      label: 'Nutrición',
      icon: '🍎',
      path: `/nutrition/${userID}`,
      active: location.pathname.includes('/nutrition/')
    },
    {
      id: 'motivation',
      label: 'Motivación',
      icon: '💪',
      path: `/motivation/${userID}`,
      active: location.pathname.includes('/motivation/')
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">💪</span>
          <h2 className="logo-text">Somos</h2>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-menu">
          {menuItems.map((item) => (
            <li key={item.id} className="nav-item">
              <button
                className={`nav-link ${item.active ? 'active' : ''}`}
                onClick={() => handleNavigation(item.path)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="profile-avatar">
            <span className="avatar-icon">👤</span>
          </div>
          <div className="profile-info">
            <p className="profile-name">Usuario</p>
            <p className="profile-status">Activo</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 