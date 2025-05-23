// src/App.js
import React from 'react';
import NewsList from './components/NewsList';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-container">
          <div className="header-brand">
            <div className="text-logo">TV</div>
            <div>
              <h1 className="app-title">TrendVolt</h1>
              <p className="app-subtitle">Powering your tech insights</p>
            </div>
          </div>
          <nav className="header-nav">
            <button className="nav-button active">Home</button>
            <button className="nav-button">Tech</button>
            <button className="nav-button">AI</button>
            <button className="nav-button">Startups</button>
          </nav>
        </div>
      </header>
      
      <main className="main-content">
      <NewsList />
      </main>
      
      <footer className="footer">
        <div className="footer-content">
          <div>&copy; {new Date().getFullYear()} TrendVolt. All rights reserved.</div>
          <div>
            <button className="footer-link">Terms</button> • <button className="footer-link">Privacy</button> • <button className="footer-link">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
