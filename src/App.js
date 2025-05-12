// src/App.js
import React from 'react';
import NewsList from './components/NewsList';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-container">
          <h1 className="app-title">TrendVolt</h1>
          <p className="app-subtitle">Stay Ahead with the Latest in Tech & AI</p>
        </div>
      </header>
      
      <main className="main-content">
        <NewsList />
      </main>
      
      <footer className="footer">
        <div className="footer-content">
          <div>&copy; {new Date().getFullYear()} TrendVolt. All rights reserved.</div>
          <div>Keeping you informed on the latest technology trends</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
