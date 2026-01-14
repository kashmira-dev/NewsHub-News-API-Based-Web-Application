const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

// Middleware
app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'News API Backend is running!' });
});

// News API endpoint
app.get('/api/news', async (req, res) => {
  try {
    // Get query parameters from frontend
    const { 
      q = '', 
      from = '', 
      to = '', 
      language = 'en', 
      domains = '',
      page = 1,
      pageSize = 20
    } = req.query;

    // Validate query parameters
    if (!q.trim() && !domains.trim()) {
      return res.status(400).json({ 
        error: 'Please provide either a search query or specific domains' 
      });
    }

    // Build query parameters for NewsAPI
    const params = {
      q: q || 'latest news', // Default search if empty
      apiKey: NEWS_API_KEY,
      pageSize: Math.min(parseInt(pageSize), 100), // Max 100 per request
      page: parseInt(page),
      language: language || 'en'
    };

    // Add optional parameters if provided
    if (from) params.from = from;
    if (to) params.to = to;
    if (domains) params.domains = domains;

    // Make request to NewsAPI
    const response = await axios.get(NEWS_API_URL, { params });

    // Check if response is successful
    if (response.data.status === 'ok') {
      // Format the articles for cleaner frontend consumption
      const formattedArticles = response.data.articles.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        image: article.urlToImage,
        source: article.source.name,
        publishedAt: new Date(article.publishedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        author: article.author
      }));

      res.json({
        status: 'success',
        totalResults: response.data.totalResults,
        articles: formattedArticles,
        currentPage: parseInt(page),
        totalPages: Math.ceil(response.data.totalResults / params.pageSize)
      });
    } else {
      res.status(500).json({ 
        error: 'Failed to fetch news from NewsAPI',
        message: response.data.message 
      });
    }
  } catch (error) {
    console.error('Error fetching news:', error.message);
    
    // Handle specific error cases
    if (error.response) {
      // NewsAPI returned an error
      res.status(error.response.status).json({
        error: 'NewsAPI Error',
        message: error.response.data.message || 'Failed to fetch news'
      });
    } else if (error.request) {
      // No response received
      res.status(503).json({
        error: 'Service Unavailable',
        message: 'Unable to connect to NewsAPI. Please try again later.'
      });
    } else {
      // Other errors
      res.status(500).json({
        error: 'Server Error',
        message: 'An unexpected error occurred'
      });
    }
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📰 News API endpoint: http://localhost:${PORT}/api/news`);
});

module.exports = app;