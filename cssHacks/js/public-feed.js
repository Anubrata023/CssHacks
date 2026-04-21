/* ============================================
   FAXX - Public Feed JS Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initPublicFeed();
});

let complaintsData = [];

function initPublicFeed() {
  loadComplaints();
  renderFeed();
  setupFilters();
}

function loadComplaints() {
  // Load from local storage
  complaintsData = JSON.parse(localStorage.getItem('faxx_complaints') || '[]');
  
  // Inject demo data if completely empty
  if (complaintsData.length === 0) {
    const now = Date.now();
    const hr = 60 * 60 * 1000;
    const day = 24 * hr;

    complaintsData = [
      {
        id: 'CMP-DEMO1',
        category: 'hostel',
        subcategory: 'Water & Plumbing',
        title: 'Geyser is broken in Boys Hostel 3',
        description: 'The geyser on the 2nd floor has been leaking since yesterday. There is water all over the shared washroom floor and we have no hot water.',
        urgency: 'high',
        status: 'pending',
        date: new Date(now - 2 * day).toISOString(),
        user: 'Anonymous',
        upvotes: 42,
        upvotedBy: []
      },
      {
        id: 'CMP-DEMO2',
        category: 'mess-food',
        subcategory: 'Food Quality',
        title: 'Stale bread served in morning breakfast',
        description: 'Mess 1 served clearly expired bread today. Several students noticed fungus. Please enforce stricter quality checks with the vendor.',
        urgency: 'high',
        status: 'pending',
        date: new Date(now - 12 * hr).toISOString(),
        user: 'Anonymous',
        upvotes: 115,
        upvotedBy: []
      },
      {
        id: 'CMP-DEMO3',
        category: 'academics',
        subcategory: 'Faculty Issues',
        title: 'Data Structures Lab computers missing software',
        description: 'Half of the computers in Lab 4 do not have the required compilers installed for our C++ assignments. This is delaying our submissions.',
        urgency: 'medium',
        status: 'resolved',
        date: new Date(now - 5 * day).toISOString(),
        user: 'Anonymous',
        upvotes: 18,
        upvotedBy: []
      },
      {
        id: 'CMP-DEMO4',
        category: 'infrastructure',
        subcategory: 'WiFi & IT Services',
        title: 'WiFi constantly dropping in Library',
        description: 'The library WiFi network keeps disconnecting every 5 minutes during peak evening hours. Can the bandwidth be upgraded?',
        urgency: 'low',
        status: 'pending',
        date: new Date(now - 1 * hr).toISOString(),
        user: 'Anonymous',
        upvotes: 8,
        upvotedBy: []
      }
    ];
    localStorage.setItem('faxx_complaints', JSON.stringify(complaintsData));
  }
  
  // Ensure structure supports upvotes and comments
  let altered = false;
  complaintsData = complaintsData.map(c => {
    if (typeof c.upvotes === 'undefined') {
      c.upvotes = 0;
      c.upvotedBy = [];
      altered = true;
    }
    if (typeof c.comments === 'undefined') {
      c.comments = [];
      altered = true;
    }
    return c;
  });

  if (altered) {
    localStorage.setItem('faxx_complaints', JSON.stringify(complaintsData));
  }
}

function saveComplaints() {
  localStorage.setItem('faxx_complaints', JSON.stringify(complaintsData));
}

function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
}

function getCategoryData(catKey) {
  if (COMPLAINT_CATEGORIES && COMPLAINT_CATEGORIES[catKey]) {
    return COMPLAINT_CATEGORIES[catKey];
  }
  return { title: catKey, color: '#7b61ff', icon: '📌' };
}

function setupFilters() {
  const searchInput = document.getElementById('feed-search');
  const catFilter = document.getElementById('feed-category-filter');

  searchInput.addEventListener('input', renderFeed);
  catFilter.addEventListener('change', renderFeed);
}

function renderFeed() {
  const container = document.getElementById('feed-container');
  const emptyState = document.getElementById('feed-empty-state');
  const trendingSection = document.getElementById('trending-section');
  
  const query = document.getElementById('feed-search').value.toLowerCase();
  const cat = document.getElementById('feed-category-filter').value;
  const user = UserSession.getUser();
  const userId = user ? user.email || user.username || user.id : null;

  let filtered = complaintsData.filter(c => {
    const matchQuery = c.title.toLowerCase().includes(query) || c.description.toLowerCase().includes(query);
    const matchCat = cat === 'all' || c.category === cat;
    return matchQuery && matchCat;
  });

  // Sort by date (newest first)
  filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

  container.innerHTML = '';

  if (filtered.length === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
    filtered.forEach(c => {
      const catData = getCategoryData(c.category);
      const isUpvoted = userId && c.upvotedBy && c.upvotedBy.includes(userId);
      const isPending = c.status === 'pending';
      const statusColor = isPending ? '#fdcb6e' : '#00b894';

      const card = document.createElement('div');
      card.className = 'feed-card reveal';
      card.innerHTML = `
        <div class="upvote-col">
          <button class="upvote-btn ${isUpvoted ? 'active' : ''}" onclick="toggleUpvote('${c.id}', this)" title="${userId ? 'Upvote' : 'Login to upvote'}">
            <span class="upvote-icon">👍</span>
            <span class="upvote-count" id="count-${c.id}">${c.upvotes}</span>
          </button>
        </div>
        <div class="feed-card-content">
          <div class="feed-meta">
            <span class="feed-author"><div class="feed-author-avatar"></div> Anonymous Student</span>
            <span class="feed-time">• ${timeAgo(c.date)}</span>
          </div>
          <h3 class="feed-title">${c.title}</h3>
          <p class="feed-desc">${c.description}</p>
          <div class="feed-footer">
            <span class="feed-tag" style="color: ${catData.color}"><span style="margin-right:5px">${catData.icon}</span> ${catData.title}</span>
            <span class="feed-tag" style="opacity: 0.8; color: ${statusColor}">Status: ${c.status}</span>
            ${c.urgency === 'high' ? '<span class="feed-tag" style="background: rgba(231, 76, 60, 0.2); color: #e74c3c;">🔥 Urgent</span>' : ''}
            <button class="comment-toggle-btn" onclick="toggleComments('${c.id}')"><span class="icon">💬</span> ${c.comments?.length || 0} Comments</button>
          </div>
          
          <!-- Comment Section -->
          <div class="comments-section" id="comments-${c.id}" style="display: none;">
            <div class="comments-list" id="comments-list-${c.id}">
              ${renderCommentsHTML(c.comments)}
            </div>
            <div class="comment-input-area">
              <input type="text" id="comment-input-${c.id}" placeholder="Write a comment..." class="comment-input">
              <button onclick="submitComment('${c.id}')" class="submit-comment-btn">Post</button>
            </div>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
    initScrollReveal();
  }

  renderTrending(userId);
}

function renderTrending(userId) {
  const section = document.getElementById('trending-section');
  const container = document.getElementById('trending-container');

  // Trending criteria: max upvotes from last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const validComplaints = complaintsData.filter(c => new Date(c.date) >= sevenDaysAgo && c.upvotes > 0);
  
  if (validComplaints.length === 0) {
    section.style.display = 'none';
    return;
  }

  validComplaints.sort((a, b) => b.upvotes - a.upvotes);
  const trending = validComplaints[0];
  const catData = getCategoryData(trending.category);
  const isUpvoted = userId && trending.upvotedBy && trending.upvotedBy.includes(userId);

  section.style.display = 'block';
  container.innerHTML = `
    <div class="trending-card feed-card">
      <div class="upvote-col">
        <button class="upvote-btn ${isUpvoted ? 'active' : ''}" onclick="toggleUpvote('${trending.id}', this, true)" title="${userId ? 'Upvote' : 'Login to upvote'}">
          <span class="upvote-icon">👍</span>
          <span class="upvote-count" id="trend-count-${trending.id}">${trending.upvotes}</span>
        </button>
      </div>
      <div class="feed-card-content">
        <div class="trending-badge">🌟 Trending this week</div>
        <div class="feed-meta">
          <span class="feed-author"><div class="feed-author-avatar"></div> Anonymous Student</span>
          <span class="feed-time">• ${timeAgo(trending.date)}</span>
        </div>
        <h3 class="trending-title">${trending.title}</h3>
        <p class="trending-desc">${trending.description}</p>
        <div class="feed-footer">
          <span class="feed-tag" style="color: ${catData.color}"><span>${catData.icon}</span> ${catData.title}</span>
          <button class="comment-toggle-btn" onclick="toggleComments('trend-${trending.id}')"><span class="icon">💬</span> ${trending.comments?.length || 0} Comments</button>
        </div>
        
        <!-- Comment Section -->
        <div class="comments-section" id="comments-trend-${trending.id}" style="display: none;">
          <div class="comments-list" id="comments-list-trend-${trending.id}">
            ${renderCommentsHTML(trending.comments)}
          </div>
          <div class="comment-input-area">
            <input type="text" id="comment-input-trend-${trending.id}" placeholder="Write a comment..." class="comment-input">
            <button onclick="submitComment('${trending.id}', 'trend-${trending.id}')" class="submit-comment-btn">Post</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Attach to window so HTML inline onclick can access it
window.toggleUpvote = function(complaintId, btnElement, isTrendingClick = false) {
  if (!UserSession.isLoggedIn()) {
    showToast('Please login to upvote a complaint', 'error');
    setTimeout(() => { window.location.href = 'login-student.html'; }, 1000);
    return;
  }

  const user = UserSession.getUser();
  const userId = user.email || user.username || user.id;

  const complaint = complaintsData.find(c => c.id === complaintId);
  if (!complaint) return;

  if (!complaint.upvotedBy) complaint.upvotedBy = [];

  const userIndex = complaint.upvotedBy.indexOf(userId);
  
  if (userIndex === -1) {
    // Add vote
    complaint.upvotedBy.push(userId);
    complaint.upvotes++;
  } else {
    // Remove vote
    complaint.upvotedBy.splice(userIndex, 1);
    complaint.upvotes--;
    if (complaint.upvotes < 0) complaint.upvotes = 0;
  }

  saveComplaints();
  
  // Re-render feed without losing focus
  renderFeed();
}

// -------- COMMENT SECTION --------

window.toggleComments = function(sectionId) {
  const section = document.getElementById(`comments-${sectionId}`);
  if (section) {
    section.style.display = section.style.display === 'none' ? 'block' : 'none';
  }
};

window.renderCommentsHTML = function(comments) {
  if (!comments || comments.length === 0) {
    return `<div class="no-comments">No comments yet. Be the first to comment!</div>`;
  }
  return comments.map(c => `
    <div class="comment-item">
      <div class="comment-avatar">👤</div>
      <div class="comment-content">
        <div class="comment-author">${c.user || 'Anonymous'}</div>
        <div class="comment-text">${c.text}</div>
      </div>
    </div>
  `).join('');
};

window.submitComment = function(complaintId, prefixOverride) {
  if (!UserSession.isLoggedIn()) {
    showToast('Please login to comment', 'error');
    setTimeout(() => { window.location.href = 'login-student.html'; }, 1000);
    return;
  }

  const prefix = prefixOverride || complaintId;
  const inputEl = document.getElementById(`comment-input-${prefix}`);
  const text = inputEl.value.trim();
  if (!text) return;

  const user = UserSession.getUser();
  const complaint = complaintsData.find(c => c.id === complaintId);
  if (!complaint) return;

  if (!complaint.comments) complaint.comments = [];
  
  complaint.comments.push({
    user: user.name || user.email || 'Student',
    text: escapeHTML(text),
    date: new Date().toISOString()
  });

  saveComplaints();
  
  // Update both the target UI element and any standard ones if needed
  const listEl = document.getElementById(`comments-list-${prefix}`);
  if (listEl) {
    listEl.innerHTML = window.renderCommentsHTML(complaint.comments);
    
    const toggleBtn = document.querySelector(`#comments-${prefix}`)?.previousElementSibling?.querySelector('.comment-toggle-btn');
    if(toggleBtn) {
      toggleBtn.innerHTML = `<span class="icon">💬</span> ${complaint.comments.length} Comments`;
    }
  }
  
  inputEl.value = '';
  // Force a full re-render to keep everything in sync (optional, might close other open comment sections)
  // Instead of full re-render, we just re-render this local slice.
  renderFeed(); // Wait, renderFeed will close the comments section that the user just opened.
  // We should persist the open state. Instead of complex state management, let's just re-render and re-open.
  setTimeout(() => {
     const section = document.getElementById(`comments-${prefix}`);
     if(section) section.style.display = 'block';
  },10);
};

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
