import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../Navigation/Sidebar';
import ColorPalette from '../Theme/ColorPalette';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  const { userID } = useParams();

  return (
    <div className="main-layout">
      <Sidebar userID={userID} />
      <main className="main-content">
        <div className="content-header">
          <ColorPalette />
        </div>
        {children}
      </main>
    </div>
  );
};

export default MainLayout; 