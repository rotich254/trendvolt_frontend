import React from 'react';
import './NewsCard.css';
import './NewsList.css';

const NewsCard = ({ title, description, urlToImage, url, source }) => {
  // Format description to handle potential HTML entities
  const formatDescription = (text) => {
    if (!text) return "No content preview available.";
    
    // Create a temporary element
    const temp = document.createElement('div');
    temp.innerHTML = text;
    return temp.textContent || temp.innerText || "No content preview available.";
  };

  // Generate a random time for demonstration purposes
  const randomTime = () => {
    const hours = Math.floor(Math.random() * 12) + 1;
    return `${hours}h ago`;
  };

  return (
    <div className="news-card" onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}>
      <div className="news-content">
        <div className="news-footer">
          <span className="source">{source}</span>
          <span className="time-indicator">{randomTime()}</span>
        </div>
        
        <h3>{title}</h3>
        <p>{formatDescription(description)}</p>
        
        {urlToImage ? (
          <div className="news-image">
            <img 
              src={urlToImage} 
              alt={title}
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
              }} 
            />
          </div>
        ) : null}

        <div className="news-engagement">
          <div className="engagement-action">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            Comments
          </div>
          <div className="engagement-action">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17l9.2-9.2M17 17V7H7"></path>
            </svg>
            Share
          </div>
          <div className="engagement-action">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            Save
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
