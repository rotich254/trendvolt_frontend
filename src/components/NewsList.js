// src/components/NewsList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsCard from './NewsCard';
import './NewsList.css';

const NewsList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTopic, setActiveTopic] = useState('all');

  // Available topics
  const topics = [
    { id: 'all', name: 'All' },
    { id: 'tech', name: 'Technology' },
    { id: 'ai', name: 'AI' },
    { id: 'startups', name: 'Startups' }
  ];

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8000/api/news/articles/')
      .then((res) => {
        setArticles(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
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

  // Function to handle search
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Here you would typically filter articles or make an API call
  };

  const renderHeader = () => (
    <div className="feed-header">
      <h2 className="news-header">Tech News Feed</h2>
      
      <div className="feed-controls">
        <div className="feed-left-controls">
          <form className="search-form" onSubmit={handleSearch}>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search news..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
          
          <div className="topic-filters">
            {topics.map(topic => (
              <div 
                key={topic.id}
                className={`topic-chip ${activeTopic === topic.id ? 'active' : ''}`}
                onClick={() => setActiveTopic(topic.id)}
              >
                {topic.name}
              </div>
            ))}
          </div>
        </div>
        
        <div className="feed-right-controls">
          <div className="feed-navigation">
            <div 
              className={`feed-nav-item ${activeTab === 'trending' ? 'active' : ''}`}
              onClick={() => setActiveTab('trending')}
            >
              Trending
            </div>
            <div 
              className={`feed-nav-item ${activeTab === 'latest' ? 'active' : ''}`}
              onClick={() => setActiveTab('latest')}
            >
              Latest
            </div>
            <div 
              className={`feed-nav-item ${activeTab === 'top' ? 'active' : ''}`}
              onClick={() => setActiveTab('top')}
            >
              Top
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="news-container">
        {renderHeader()}
      <div className="loading-container">
        <div className="loading-spinner"></div>
          <p>Loading your personalized feed...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="news-container">
        {renderHeader()}
      <div className="error-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="news-container">
      {renderHeader()}
      
      {articles.length === 0 ? (
        <div className="loading-container">No articles found at the moment. Check back soon!</div>
      ) : (
        <div className="news-grid">
          {articles.map((article, index) => (
            <NewsCard
              key={article.id || index}
              title={article.title || "Untitled Article"}
              description={article.content || "No content preview available for this article."}
              urlToImage={article.image_url}
              url={article.url}
              source={article.source || "TechNews"}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsList;
