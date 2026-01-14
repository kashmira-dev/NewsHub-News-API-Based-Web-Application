// Configuration
const API_BASE_URL = 'http://localhost:3000/api/news';

// DOM Elements
const elements = {
    // Forms
    newsForm: document.getElementById('newsForm'),
    searchQuery: document.getElementById('searchQuery'),
    
    // Filters
    fromDate: document.getElementById('fromDate'),
    toDate: document.getElementById('toDate'),
    language: document.getElementById('language'),
    domains: document.getElementById('domains'),
    pageSize: document.getElementById('pageSize'),
    
    // Toggles
    filtersToggle: document.getElementById('filtersToggle'),
    filtersPanel: document.getElementById('filtersPanel'),
    themeToggle: document.getElementById('themeToggle'),
    
    // Actions
    resetFilters: document.getElementById('resetFilters'),
    backToTop: document.getElementById('backToTop'),
    
    // Results
    newsGrid: document.getElementById('newsGrid'),
    loading: document.getElementById('loading'),
    errorMessage: document.getElementById('errorMessage'),
    emptyState: document.getElementById('emptyState'),
    resultsInfo: document.getElementById('resultsInfo'),
    resultsTitle: document.getElementById('resultsTitle'),
    totalResults: document.getElementById('totalResults'),
    currentPage: document.getElementById('currentPage'),
    totalPages: document.getElementById('totalPages'),
    searchTerm: document.getElementById('searchTerm'),
    
    // Pagination
    pagination: document.getElementById('pagination'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    pageNumbers: document.getElementById('pageNumbers'),
    
    // Suggestions
    suggestions: document.querySelectorAll('.suggestion'),
    topicChips: document.querySelectorAll('.topic-chip'),
    
    // Date/Time
    currentDate: document.getElementById('currentDate'),
    currentTime: document.getElementById('currentTime'),
    currentYear: document.getElementById('currentYear'),
    
    // Video Elements
    bgVideo: document.getElementById('bgVideo'),
    videoMuteBtn: document.getElementById('videoMuteBtn'),
    playBtn: document.getElementById('playBtn'),
    effectsBtn: document.getElementById('effectsBtn'),
    globalMuteBtn: document.getElementById('globalMuteBtn'),
    soundStatus: document.getElementById('soundStatus'),
    soundWaves: document.getElementById('soundWaves'),
    tickerContent: document.getElementById('tickerContent'),
    
    // Animation Elements
    particles: document.getElementById('particles'),
    bubbles: document.getElementById('bubbles'),
    sparkles: document.getElementById('sparkles')
};

// State Management
let state = {
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
    currentQuery: '',
    isDarkMode: false,
    isVideoMuted: true,
    isGlobalSoundOn: false,
    areEffectsActive: true,
    soundEnabled: false
};

// Animation Functions
function createBubbles() {
    if (!elements.bubbles || !state.areEffectsActive) return;
    
    elements.bubbles.innerHTML = '';
    
    // Create 20 bubbles
    for (let i = 0; i < 20; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        // Random properties
        const size = Math.random() * 60 + 20;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        
        // Random animation duration
        const duration = Math.random() * 20 + 20;
        bubble.style.animationDuration = `${duration}s`;
        
        // Random animation delay
        const delay = Math.random() * 15;
        bubble.style.animationDelay = `${delay}s`;
        
        // Random opacity
        bubble.style.opacity = Math.random() * 0.4 + 0.1;
        
        elements.bubbles.appendChild(bubble);
    }
}

function createSparkles() {
    if (!elements.sparkles || !state.areEffectsActive) return;
    
    elements.sparkles.innerHTML = '';
    
    // Create 50 sparkles
    for (let i = 0; i < 50; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        // Random position
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        
        // Random animation delay
        const delay = Math.random() * 5;
        sparkle.style.animationDelay = `${delay}s`;
        
        elements.sparkles.appendChild(sparkle);
    }
}

function createParticles() {
    if (!elements.particles || !state.areEffectsActive) return;
    
    elements.particles.innerHTML = '';
    
    // Create 30 particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = `${Math.random() * 3 + 1}px`;
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = state.isDarkMode ? 
            'rgba(96, 165, 250, 0.1)' : 'rgba(37, 99, 235, 0.1)';
        particle.style.borderRadius = '50%';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animation = `float ${Math.random() * 30 + 20}s infinite linear`;
        
        elements.particles.appendChild(particle);
    }
}

function updateTicker() {
    if (!elements.tickerContent) return;
    
    const headlines = [
        "Breaking: Global Summit Addresses Climate Change",
        "Technology: New AI Model Achieves Breakthrough",
        "Sports: Championship Final Set for Tomorrow",
        "Business: Stock Markets Reach New Highs",
        "Health: New Treatment Shows Promise in Trials",
        "Entertainment: Award Season Kicks Off in Hollywood"
    ];
    
    elements.tickerContent.innerHTML = '';
    headlines.forEach(headline => {
        const span = document.createElement('span');
        span.textContent = `• ${headline} •`;
        elements.tickerContent.appendChild(span);
    });
}

// Date and Time Functions
function updateDateTime() {
    const now = new Date();
    
    // Format date
    const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const formattedDate = now.toLocaleDateString('en-US', dateOptions);
    
    // Format time
    const timeOptions = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
    };
    const formattedTime = now.toLocaleTimeString('en-US', timeOptions);
    
    // Update DOM
    if (elements.currentDate) {
        elements.currentDate.textContent = formattedDate;
    }
    
    if (elements.currentTime) {
        elements.currentTime.textContent = formattedTime;
    }
    
    if (elements.currentYear) {
        elements.currentYear.textContent = now.getFullYear();
    }
}

function initDateTime() {
    updateDateTime();
    setInterval(updateDateTime, 1000);
}

// Sound Control Functions
function initSoundControls() {
    // Start with video muted (required for autoplay)
    if (elements.bgVideo) {
        elements.bgVideo.muted = true;
        state.isVideoMuted = true;
        updateSoundUI();
    }
    
    // Video mute button
    if (elements.videoMuteBtn) {
        elements.videoMuteBtn.addEventListener('click', toggleVideoMute);
    }
    
    // Global sound button
    if (elements.globalMuteBtn) {
        elements.globalMuteBtn.addEventListener('click', toggleGlobalSound);
    }
    
    // Play/Pause button
    if (elements.playBtn) {
        elements.playBtn.addEventListener('click', toggleVideoPlay);
    }
    
    // Effects button
    if (elements.effectsBtn) {
        elements.effectsBtn.addEventListener('click', toggleEffects);
    }
    
    // Try to enable sound after user interaction
    document.addEventListener('click', enableSound, { once: true });
}

function enableSound() {
    state.soundEnabled = true;
    if (elements.bgVideo && !state.isVideoMuted) {
        elements.bgVideo.muted = false;
    }
}

function toggleVideoMute() {
    if (!elements.bgVideo) return;
    
    state.isVideoMuted = !state.isVideoMuted;
    elements.bgVideo.muted = state.isVideoMuted;
    
    // Show sound waves when unmuted
    if (!state.isVideoMuted && state.soundEnabled) {
        elements.soundWaves.classList.add('active');
        setTimeout(() => {
            elements.soundWaves.classList.remove('active');
        }, 2000);
    }
    
    updateSoundUI();
}

function toggleGlobalSound() {
    state.isGlobalSoundOn = !state.isGlobalSoundOn;
    
    // If global sound is off, mute everything
    if (elements.bgVideo) {
        elements.bgVideo.muted = !state.isGlobalSoundOn || state.isVideoMuted;
    }
    
    updateSoundUI();
    
    // Play a sound effect
    if (state.isGlobalSoundOn && state.soundEnabled) {
        playSoundEffect('toggle');
    }
}

function toggleVideoPlay() {
    if (!elements.bgVideo) return;
    
    if (elements.bgVideo.paused) {
        elements.bgVideo.play();
        elements.playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        elements.playBtn.title = 'Pause Video';
    } else {
        elements.bgVideo.pause();
        elements.playBtn.innerHTML = '<i class="fas fa-play"></i>';
        elements.playBtn.title = 'Play Video';
    }
}

function toggleEffects() {
    state.areEffectsActive = !state.areEffectsActive;
    
    if (state.areEffectsActive) {
        elements.effectsBtn.innerHTML = '<i class="fas fa-magic"></i>';
        elements.effectsBtn.title = 'Disable Effects';
        createBubbles();
        createSparkles();
        createParticles();
    } else {
        elements.effectsBtn.innerHTML = '<i class="fas fa-ban"></i>';
        elements.effectsBtn.title = 'Enable Effects';
        if (elements.bubbles) elements.bubbles.innerHTML = '';
        if (elements.sparkles) elements.sparkles.innerHTML = '';
        if (elements.particles) elements.particles.innerHTML = '';
    }
    
    // Play a magical sound effect
    if (state.soundEnabled && state.isGlobalSoundOn) {
        playSoundEffect('magic');
    }
}

function updateSoundUI() {
    // Update video mute button
    if (elements.videoMuteBtn) {
        elements.videoMuteBtn.innerHTML = state.isVideoMuted ? 
            '<i class="fas fa-volume-mute"></i>' : 
            '<i class="fas fa-volume-up"></i>';
        elements.videoMuteBtn.title = state.isVideoMuted ? 
            'Unmute Video' : 'Mute Video';
    }
    
    // Update global sound button
    if (elements.globalMuteBtn) {
        elements.globalMuteBtn.innerHTML = state.isGlobalSoundOn ? 
            '<i class="fas fa-volume-up"></i>' : 
            '<i class="fas fa-volume-mute"></i>';
        elements.globalMuteBtn.title = state.isGlobalSoundOn ? 
            'Mute All Sounds' : 'Enable Sounds';
        elements.globalMuteBtn.style.color = state.isGlobalSoundOn ? 
            'var(--primary-color)' : 'var(--text-light)';
    }
    
    // Update sound status message
    if (elements.soundStatus) {
        if (state.isVideoMuted) {
            elements.soundStatus.innerHTML = '<i class="fas fa-volume-mute"></i><span>Video sound is muted. Click volume button to unmute.</span>';
        } else {
            elements.soundStatus.innerHTML = '<i class="fas fa-volume-up"></i><span>Video sound is on. Click volume button to mute.</span>';
        }
    }
}

function playSoundEffect(type) {
    if (!state.soundEnabled || !state.isGlobalSoundOn) return;
    
    // Create audio context for sound effects
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        switch(type) {
            case 'toggle':
                oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
                oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.3);
                break;
                
            case 'magic':
                oscillator.frequency.setValueAtTime(329.63, audioContext.currentTime); // E4
                oscillator.frequency.setValueAtTime(392.00, audioContext.currentTime + 0.1); // G4
                oscillator.frequency.setValueAtTime(493.88, audioContext.currentTime + 0.2); // B4
                oscillator.frequency.setValueAtTime(587.33, audioContext.currentTime + 0.3); // D5
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.5);
                break;
                
            case 'search':
                oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4
                oscillator.frequency.setValueAtTime(554.37, audioContext.currentTime + 0.1); // C#5
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.2);
                break;
        }
    } catch (e) {
        console.log('Audio context not supported:', e);
    }
}

// Initialize Application
function init() {
    setupEventListeners();
    setDefaultDates();
    loadThemePreference();
    hideLoading();
    initDateTime();
    initSoundControls();
    createBubbles();
    createSparkles();
    createParticles();
    updateTicker();
    
    // Add welcome message
    console.log('🚀 NewsHub initialized with sound controls and animations!');
    
    // Play welcome sound
    setTimeout(() => {
        if (state.soundEnabled && state.isGlobalSoundOn) {
            playSoundEffect('toggle');
        }
    }, 1000);
}

// Set default dates
function setDefaultDates() {
    const today = new Date().toISOString().split('T')[0];
    const lastMonth = new Date();
    lastMonth.setDate(lastMonth.getDate() - 30);
    const lastMonthStr = lastMonth.toISOString().split('T')[0];
    
    elements.fromDate.value = lastMonthStr;
    elements.toDate.value = today;
    elements.fromDate.max = today;
    elements.toDate.max = today;
    
    elements.fromDate.addEventListener('change', function() {
        elements.toDate.min = this.value;
    });
    
    elements.toDate.addEventListener('change', function() {
        elements.fromDate.max = this.value;
    });
}

// Setup Event Listeners
function setupEventListeners() {
    // Form submission
    elements.newsForm.addEventListener('submit', handleSearch);
    
    // Filters toggle
    elements.filtersToggle.addEventListener('click', () => {
        const isVisible = elements.filtersPanel.style.display === 'block';
        elements.filtersPanel.style.display = isVisible ? 'none' : 'block';
        const icon = elements.filtersToggle.querySelector('.toggle-icon');
        if (icon) {
            icon.className = isVisible ? 'fas fa-chevron-down toggle-icon' : 'fas fa-chevron-up toggle-icon';
        }
    });
    
    // Reset filters
    elements.resetFilters.addEventListener('click', resetFilters);
    
    // Theme toggle
    elements.themeToggle.addEventListener('click', toggleTheme);
    
    // Pagination
    elements.prevBtn.addEventListener('click', goToPreviousPage);
    elements.nextBtn.addEventListener('click', goToNextPage);
    
    // Back to top
    elements.backToTop.addEventListener('click', scrollToTop);
    window.addEventListener('scroll', handleScroll);
    
    // Search suggestions
    elements.suggestions.forEach(suggestion => {
        suggestion.addEventListener('click', () => {
            elements.searchQuery.value = suggestion.dataset.query;
            handleSearch({ preventDefault: () => {} });
        });
    });
    
    // Topic chips
    elements.topicChips.forEach(chip => {
        chip.addEventListener('click', () => {
            elements.searchQuery.value = chip.dataset.query;
            handleSearch({ preventDefault: () => {} });
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === '/') {
            e.preventDefault();
            elements.searchQuery.focus();
        }
        if (e.key === 'Escape' && elements.filtersPanel.style.display === 'block') {
            elements.filtersPanel.style.display = 'none';
        }
    });
}

// Handle Search
async function handleSearch(e) {
    e.preventDefault();
    
    const query = elements.searchQuery.value.trim();
    if (!query) {
        showError('Please enter a search term');
        return;
    }
    
    state.currentQuery = query;
    state.currentPage = 1;
    
    // Play search sound
    if (state.soundEnabled && state.isGlobalSoundOn) {
        playSoundEffect('search');
    }
    
    await searchNews();
}

// Main Search Function
async function searchNews() {
    showLoading();
    hideError();
    hideEmptyState();
    
    const params = new URLSearchParams({
        q: state.currentQuery,
        page: state.currentPage,
        pageSize: elements.pageSize.value,
        language: elements.language.value
    });
    
    if (elements.fromDate.value) params.append('from', elements.fromDate.value);
    if (elements.toDate.value) params.append('to', elements.toDate.value);
    if (elements.domains.value.trim()) params.append('domains', elements.domains.value.trim());
    
    try {
        const response = await fetch(`${API_BASE_URL}?${params.toString()}`);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch news');
        }
        
        if (data.articles && data.articles.length > 0) {
            displayNews(data.articles);
            updatePagination(data);
            updateResultsInfo(data);
        } else {
            showEmptyState();
        }
    } catch (error) {
        console.error('Search error:', error);
        showError(error.message || 'Failed to fetch news. Please try again.');
    } finally {
        hideLoading();
    }
}

// Display News Articles
function displayNews(articles) {
    elements.newsGrid.innerHTML = '';
    
    articles.forEach(article => {
        const newsCard = createNewsCard(article);
        elements.newsGrid.appendChild(newsCard);
    });
    
    elements.newsGrid.style.display = 'grid';
}

// Create News Card HTML
function createNewsCard(article) {
    const card = document.createElement('div');
    card.className = 'news-card glass-card';
    
    const imageUrl = article.image || `https://source.unsplash.com/random/400x200/?news,${article.source.toLowerCase()}`;
    
    card.innerHTML = `
        <div class="news-image-container">
            <img src="${imageUrl}" alt="${article.title}" class="news-image" onerror="this.src='https://source.unsplash.com/random/400x200/?news'">
            <div class="image-overlay"></div>
        </div>
        <div class="news-content">
            <h3 class="news-title">${article.title}</h3>
            <p class="news-description">${article.description || 'No description available.'}</p>
            <div class="news-meta">
                <span class="news-source">
                    <i class="fas fa-newspaper"></i>
                    ${article.source}
                </span>
                <span class="news-date">
                    <i class="far fa-calendar"></i>
                    ${article.publishedAt}
                </span>
            </div>
            <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="read-more">
                Read Full Article
                <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `;
    
    return card;
}

// Update Pagination
function updatePagination(data) {
    state.totalPages = data.totalPages || 1;
    state.totalResults = data.totalResults || 0;
    
    if (state.totalPages > 1) {
        elements.pagination.style.display = 'flex';
        updatePaginationButtons();
        renderPageNumbers();
    } else {
        elements.pagination.style.display = 'none';
    }
}

// Update Pagination Buttons
function updatePaginationButtons() {
    elements.prevBtn.disabled = state.currentPage === 1;
    elements.nextBtn.disabled = state.currentPage === state.totalPages;
}

// Render Page Numbers
function renderPageNumbers() {
    elements.pageNumbers.innerHTML = '';
    
    const maxVisiblePages = 5;
    let startPage = Math.max(1, state.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(state.totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    if (startPage > 1) {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'page-number';
        ellipsis.textContent = '...';
        ellipsis.style.cursor = 'default';
        elements.pageNumbers.appendChild(ellipsis);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('span');
        pageBtn.className = `page-number ${i === state.currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => goToPage(i));
        elements.pageNumbers.appendChild(pageBtn);
    }
    
    if (endPage < state.totalPages) {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'page-number';
        ellipsis.textContent = '...';
        ellipsis.style.cursor = 'default';
        elements.pageNumbers.appendChild(ellipsis);
    }
}

// Update Results Info
function updateResultsInfo(data) {
    elements.resultsTitle.textContent = `Results for "${state.currentQuery}"`;
    elements.totalResults.textContent = data.totalResults.toLocaleString();
    elements.currentPage.textContent = state.currentPage;
    elements.totalPages.textContent = state.totalPages;
    elements.searchTerm.textContent = state.currentQuery;
    elements.resultsInfo.style.display = 'block';
}

// Pagination Functions
function goToPage(page) {
    state.currentPage = page;
    searchNews();
    window.scrollTo({ top: elements.newsGrid.offsetTop - 100, behavior: 'smooth' });
}

function goToPreviousPage() {
    if (state.currentPage > 1) {
        goToPage(state.currentPage - 1);
    }
}

function goToNextPage() {
    if (state.currentPage < state.totalPages) {
        goToPage(state.currentPage + 1);
    }
}

// Reset Filters
function resetFilters() {
    elements.fromDate.value = '';
    elements.toDate.value = '';
    elements.language.value = 'en';
    elements.domains.value = '';
    elements.pageSize.value = '24';
    setDefaultDates();
}

// Theme Management
function toggleTheme() {
    state.isDarkMode = !state.isDarkMode;
    document.body.classList.toggle('dark-mode', state.isDarkMode);
    elements.themeToggle.innerHTML = state.isDarkMode ? 
        '<i class="fas fa-sun"></i>' : 
        '<i class="fas fa-moon"></i>';
    elements.themeToggle.title = state.isDarkMode ? 
        'Switch to Light Mode' : 'Switch to Dark Mode';
    localStorage.setItem('darkMode', state.isDarkMode);
    
    // Recreate particles with new colors
    if (state.areEffectsActive) {
        createParticles();
    }
}

function loadThemePreference() {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
        state.isDarkMode = savedTheme === 'true';
        document.body.classList.toggle('dark-mode', state.isDarkMode);
        elements.themeToggle.innerHTML = state.isDarkMode ? 
            '<i class="fas fa-sun"></i>' : 
            '<i class="fas fa-moon"></i>';
    }
}

// Scroll Management
function handleScroll() {
    if (window.scrollY > 300) {
        elements.backToTop.classList.add('visible');
    } else {
        elements.backToTop.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// UI State Management
function showLoading() {
    elements.loading.style.display = 'block';
    elements.newsGrid.style.display = 'none';
    elements.pagination.style.display = 'none';
    elements.resultsInfo.style.display = 'none';
}

function hideLoading() {
    elements.loading.style.display = 'none';
}

function showError(message) {
    elements.errorMessage.querySelector('p').textContent = message;
    elements.errorMessage.style.display = 'block';
    elements.newsGrid.style.display = 'none';
    elements.pagination.style.display = 'none';
    elements.resultsInfo.style.display = 'none';
}

function hideError() {
    elements.errorMessage.style.display = 'none';
}

function showEmptyState() {
    elements.emptyState.style.display = 'block';
    elements.newsGrid.style.display = 'none';
    elements.pagination.style.display = 'none';
    elements.resultsInfo.style.display = 'none';
}

function hideEmptyState() {
    elements.emptyState.style.display = 'none';
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init);