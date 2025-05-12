// src/components/NewsList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NewsList.css';

const NewsList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8000/api/news/articles/')
      .then((res) => {
        setArticles(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load news articles. Please try again later.');
        setLoading(false);
      });
  }, []);

  // Function to handle article click
  const handleArticleClick = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading news articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="news-container">
      <div className="decorative-dots top-left"></div>
      <div className="decorative-dots bottom-right"></div>
      
      <h2 className="news-header">Latest Tech & AI News</h2>
      
      {articles.length === 0 ? (
        <div className="loading-container">No articles found.</div>
      ) : (
        <div className="news-grid">
          {articles.map((article) => (
            <div 
              key={article.id} 
              className="news-card"
              onClick={() => handleArticleClick(article.url)}
            >
              <div className="news-card-image">
                {article.image_url ? (
                  <img src={article.image_url} alt={article.title} />
                ) : (
                  <div style={{ backgroundColor: '#e5e7eb', height: '100%' }} />
                )}
                <div className="news-card-badge">{article.source}</div>
              </div>
              <div className="news-card-content">
                <h3 className="news-card-title">{article.title}</h3>
                <p className="news-card-text">
                  {article.content.length > 150 
                    ? `${article.content.slice(0, 150)}...` 
                    : article.content}
                </p>
                <div className="news-card-meta">
                  <span className="news-card-source">{article.source}</span>
                  <span className="news-card-date">
                    {new Date(article.published_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
              <div className="news-card-shine"></div>
              {article.url && <div className="news-card-link-indicator" title="Click to read full article"></div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsList;
