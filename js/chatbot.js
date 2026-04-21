/* ============================================
   FAXX - Chatbot Assistant (Enhanced)
   ============================================ */

const CHATBOT_RESPONSES = {
  greeting: {
    text: "👋 Hi there! I'm **FAXX Bot**, your campus grievance assistant.\n\nThis portal is **100% transparent** — every complaint is visible to the community and tracked in real-time. You can file complaints freely and confidently.\n\nHow can I help you today?",
    quickReplies: ['What can I do here?', 'How to file a complaint?', 'Is it safe?', 'Show features', 'Most upvoted issue']
  },

  'what can i do here?': {
    text: "Here's everything you can do on FAXX:\n\n🎓 **Students** — File complaints, track status, upvote issues, comment on others' complaints\n\n🛡️ **Admins** — Manage complaints sorted by community priority, resolve/reject issues\n\n🌐 **Everyone** — Browse the Public Feed, see trending issues, search & filter complaints\n\n📊 **Analytics** — View institutional data about complaint volumes and resolution rates",
    quickReplies: ['How to file a complaint?', 'What is upvoting?', 'Guide me to Public Feed']
  },

  'how to file a complaint?': {
    text: "Filing a complaint is easy! Here's how:\n\n1️⃣ **Login** — Go to Student Login and enter your credentials\n2️⃣ **Verify OTP** — Check the server terminal for your 6-digit OTP (30 second window)\n3️⃣ **Choose Category** — Select from Hostel, Mess, Academics, Infrastructure, etc.\n4️⃣ **Fill Details** — Describe your issue, set urgency, attach documents\n5️⃣ **Submit** — Your complaint goes live on the Public Feed!\n\nWant me to take you there?",
    quickReplies: ['Guide me to login', 'What categories exist?', 'Is it anonymous?']
  },

  'is it safe?': {
    text: "**Absolutely!** FAXX is built with transparency and safety in mind:\n\n🔒 **Secure Auth** — OTP verification + JWT token sessions\n👁️ **Transparent** — All complaints are visible on the Public Feed\n🗳️ **Democratic** — Community upvotes determine priority\n⏱️ **Accountable** — Every status change is logged with timestamps\n🛡️ **No Retaliation** — The system is designed to protect honest feedback\n\nYour voice matters. File your grievance with confidence!",
    quickReplies: ['How to file a complaint?', 'Show features', 'Guide me to login']
  },

  'show features': {
    text: "✨ **FAXX Platform Features:**\n\n🔐 **OTP Authentication** — Terminal-based, 30-sec window, 3 attempts\n📋 **Smart Categories** — Hostel, Mess, Academics, Infrastructure & more\n🔥 **Community Upvoting** — Agree with an issue? Upvote it!\n💬 **Comment Threads** — Discuss and add context to complaints\n🚨 **Auto-Escalation** — 50+ upvotes = ESCALATED priority for admins\n📊 **Analytics Dashboard** — Visual complaint statistics\n⚡ **API Console** — Test all backend endpoints\n🌙 **Dark/Light Mode** — Toggle your preferred theme\n📱 **Responsive** — Works on all devices\n\nWant me to take you to any of these?",
    quickReplies: ['Guide me to Analytics', 'Guide me to Public Feed', 'Guide me to API Console', 'Most upvoted issue']
  },

  'what categories exist?': {
    text: "FAXX supports these complaint categories:\n\n🍽️ **Mess & Food** — Food quality, hygiene, menu, timing\n🏠 **Hostel** — Rooms, plumbing, electricity, security\n📚 **Academics** — Faculty issues, curriculum, labs, exams\n🏗️ **Infrastructure** — WiFi, transport, libraries, facilities\n🏛️ **Administration** — Fees, documents, policies\n📦 **Others** — Anything that doesn't fit above\n\nEach category has detailed subcategories for precise reporting!",
    quickReplies: ['Guide me to complaints', 'How to file a complaint?', 'Show features']
  },

  'what is upvoting?': {
    text: "**Upvoting** lets you support complaints that matter to you!\n\n👍 Click the upvote button on any complaint\n📈 More upvotes = higher priority in the admin's queue\n🚨 50+ upvotes = complaint gets **ESCALATED** status\n\nIt's like a democratic system — the more students agree with an issue, the faster it gets admin attention.\n\nLogin to start upvoting!",
    quickReplies: ['How does escalation work?', 'Guide me to Public Feed', 'Most upvoted issue']
  },

  'how does escalation work?': {
    text: "**Escalation is automatic** based on community upvotes:\n\n📢 **10+ upvotes** → Rising (amber badge)\n⚠️ **20+ upvotes** → High Attention (magenta badge)\n🚨 **50+ upvotes** → ESCALATED (red badge + glow)\n\n**Escalated complaints appear at the TOP** of the admin's management queue, ensuring the most critical issues get resolved first.\n\nThis means your voice directly impacts what gets fixed!",
    quickReplies: ['Most upvoted issue', 'Show features', 'Guide me to Public Feed']
  },

  'what is the api console?': {
    text: "The **API Console** is a developer tool that lets you test all backend endpoints directly:\n\n🏥 **Health Check** — Verify server status\n🔐 **Send OTP** — Test authentication flow\n✅ **Verify OTP** — Complete login programmatically\n📋 **Submit Complaint** — Create test complaints\n🔄 **Update Status** — Test admin actions\n\nEvery request is logged with status codes and response times!",
    quickReplies: ['Guide me to API Console', 'Show features', 'How to file a complaint?']
  },

  'is it anonymous?': {
    text: "Your complaints are attributed to your **logged-in name**, which ensures accountability on both sides.\n\nHowever:\n• 🔒 Your **password** is securely hashed\n• 🛡️ The system is designed to **prevent retaliation** through transparency\n• 📢 The community upvote system means you're **never alone** — if others agree, the complaint gains collective weight\n\nTransparency is the core principle of FAXX!",
    quickReplies: ['Is it safe?', 'How to file a complaint?', 'Show features']
  }
};

// Dynamic pages map for navigation
const PAGE_NAVIGATION = {
  'login':        { url: 'login-student.html',    name: 'Student Login' },
  'student login': { url: 'login-student.html',   name: 'Student Login' },
  'admin login':  { url: 'login-admin.html',      name: 'Admin Login' },
  'complaints':   { url: 'index.html#complaints', name: 'Complaints Section' },
  'file':         { url: 'index.html#complaints',  name: 'File a Complaint' },
  'public feed':  { url: 'public-feed.html',      name: 'Public Feed' },
  'feed':         { url: 'public-feed.html',       name: 'Public Feed' },
  'trending':     { url: 'public-feed.html',       name: 'Trending Issues' },
  'analytics':    { url: 'analytics.html',         name: 'Analytics Dashboard' },
  'dashboard':    { url: 'analytics.html',         name: 'Analytics Dashboard' },
  'api console':  { url: 'api-test.html',          name: 'API Console' },
  'api':          { url: 'api-test.html',           name: 'API Console' },
  'profile':      { url: 'profile.html',            name: 'Your Profile' },
  'home':         { url: 'index.html',              name: 'Home Page' },
  'hostel':       { url: 'category.html?cat=hostel', name: 'Hostel Complaints' },
  'mess':         { url: 'category.html?cat=mess-food', name: 'Mess & Food Complaints' },
  'academics':    { url: 'category.html?cat=academics', name: 'Academic Complaints' },
  'infrastructure': { url: 'category.html?cat=infrastructure', name: 'Infrastructure Complaints' },
};

let chatOpen = false;

// ===== Dynamic Data Functions =====

function getMostUpvotedIssue() {
  const complaints = JSON.parse(localStorage.getItem('faxx_complaints') || '[]');
  if (!complaints.length) {
    return {
      text: "There are no complaints filed yet! Be the first to raise an issue.\n\nYour campus needs your voice! 📢",
      quickReplies: ['How to file a complaint?', 'Guide me to login', 'Show features']
    };
  }

  complaints.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
  const top = complaints[0];
  const escalation = top.upvotes >= 50 ? '🚨 ESCALATED' : top.upvotes >= 20 ? '⚠️ High Priority' : top.upvotes >= 10 ? '📢 Rising' : '📋 Standard';

  let text = `🏆 **Most Upvoted Issue Right Now:**\n\n`;
  text += `**"${top.title}"**\n`;
  text += `👍 **${top.upvotes || 0} upvotes** · ${escalation}\n`;
  text += `📁 Category: ${top.category || 'N/A'} > ${top.subcategory || 'General'}\n`;
  text += `📊 Status: **${top.status || 'pending'}**\n`;
  text += `👤 Filed by: ${top.user || 'Anonymous'}\n\n`;
  text += `${top.description ? top.description.substring(0, 120) + '...' : ''}\n\n`;
  text += `Head to the **Public Feed** to upvote, comment, and see all issues!`;

  // Show top 3 if available
  if (complaints.length >= 3) {
    text += `\n\n📊 **Top 3 Issues:**\n`;
    for (let i = 0; i < Math.min(3, complaints.length); i++) {
      const c = complaints[i];
      text += `${i + 1}. "${c.title}" — 👍 ${c.upvotes || 0}\n`;
    }
  }

  return {
    text,
    quickReplies: ['Guide me to Public Feed', 'How does escalation work?', 'How to file a complaint?']
  };
}

function getComplaintStats() {
  const complaints = JSON.parse(localStorage.getItem('faxx_complaints') || '[]');
  const total = complaints.length;
  const resolved = complaints.filter(c => c.status === 'resolved').length;
  const pending = complaints.filter(c => c.status === 'pending').length;
  const totalUpvotes = complaints.reduce((sum, c) => sum + (c.upvotes || 0), 0);

  return {
    text: `📊 **Live Complaint Statistics:**\n\n📋 Total Complaints: **${total}**\n✅ Resolved: **${resolved}**\n⏳ Pending: **${pending}**\n👍 Total Upvotes: **${totalUpvotes}**\n📈 Resolution Rate: **${total ? Math.round((resolved / total) * 100) : 0}%**\n\nVisit Analytics for detailed charts and insights!`,
    quickReplies: ['Guide me to Analytics', 'Most upvoted issue', 'Show features']
  };
}

// ===== Init =====
function initChatbot() {
  const chatHTML = `
    <div class="chatbot-fab" id="chatbot-fab" onclick="toggleChatbot()">
      <span class="chatbot-fab-icon" id="chatbot-fab-icon">🤖</span>
      <div class="chatbot-fab-pulse"></div>
    </div>

    <div class="chatbot-window" id="chatbot-window">
      <div class="chatbot-header">
        <div class="chatbot-header-left">
          <div class="chatbot-avatar">🤖</div>
          <div>
            <div class="chatbot-name">FAXX Bot</div>
            <div class="chatbot-status">Online · Ready to help</div>
          </div>
        </div>
        <button class="chatbot-close" onclick="toggleChatbot()">✕</button>
      </div>

      <div class="chatbot-messages" id="chatbot-messages"></div>

      <div class="chatbot-input-area">
        <input type="text" class="chatbot-input" id="chatbot-input" placeholder="Ask me anything..." onkeydown="if(event.key==='Enter') sendMessage()">
        <button class="chatbot-send" onclick="sendMessage()">➤</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', chatHTML);

  setTimeout(() => {
    const fab = document.getElementById('chatbot-fab');
    if (fab) fab.classList.add('show');
  }, 1500);
}

function toggleChatbot() {
  const window_ = document.getElementById('chatbot-window');
  const fab = document.getElementById('chatbot-fab');
  const fabIcon = document.getElementById('chatbot-fab-icon');

  chatOpen = !chatOpen;

  if (chatOpen) {
    window_.classList.add('open');
    fab.classList.add('active');
    fabIcon.textContent = '✕';

    const messages = document.getElementById('chatbot-messages');
    if (messages.children.length === 0) {
      addBotMessage(CHATBOT_RESPONSES.greeting);
    }
  } else {
    window_.classList.remove('open');
    fab.classList.remove('active');
    fabIcon.textContent = '🤖';
  }
}

function addBotMessage(response) {
  const container = document.getElementById('chatbot-messages');

  const typing = document.createElement('div');
  typing.className = 'chatbot-msg bot typing';
  typing.innerHTML = `<div class="chatbot-msg-avatar">🤖</div><div class="chatbot-msg-bubble"><span class="typing-dots"><span></span><span></span><span></span></span></div>`;
  container.appendChild(typing);
  container.scrollTop = container.scrollHeight;

  setTimeout(() => {
    typing.remove();

    const msg = document.createElement('div');
    msg.className = 'chatbot-msg bot';

    const formattedText = response.text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');

    msg.innerHTML = `<div class="chatbot-msg-avatar">🤖</div><div class="chatbot-msg-bubble">${formattedText}</div>`;
    container.appendChild(msg);

    if (response.quickReplies && response.quickReplies.length) {
      const qr = document.createElement('div');
      qr.className = 'chatbot-quick-replies';
      qr.innerHTML = response.quickReplies.map(r =>
        `<button class="chatbot-qr-btn" onclick="handleQuickReply('${r.replace(/'/g, "\\'")}')">${r}</button>`
      ).join('');
      container.appendChild(qr);
    }

    container.scrollTop = container.scrollHeight;
  }, 800);
}

function addUserMessage(text) {
  const container = document.getElementById('chatbot-messages');
  const msg = document.createElement('div');
  msg.className = 'chatbot-msg user';
  msg.innerHTML = `<div class="chatbot-msg-bubble">${text}</div>`;
  container.appendChild(msg);

  container.querySelectorAll('.chatbot-quick-replies').forEach(el => el.remove());
  container.scrollTop = container.scrollHeight;
}

function handleQuickReply(text) {
  addUserMessage(text);
  processInput(text.toLowerCase());
}

function sendMessage() {
  const input = document.getElementById('chatbot-input');
  const text = input.value.trim();
  if (!text) return;

  input.value = '';
  addUserMessage(text);
  processInput(text.toLowerCase());
}

// ===== Core Processing Engine =====
function processInput(key) {

  // 0. Theme switching detection
  const wantsLight = key.includes('light mode') || key.includes('light theme') || key.includes('switch to light') || key.includes('enable light') || key.includes('turn on light') || key.includes('day mode');
  const wantsDark = key.includes('dark mode') || key.includes('dark theme') || key.includes('switch to dark') || key.includes('enable dark') || key.includes('turn on dark') || key.includes('night mode');
  const wantsToggle = key.includes('change theme') || key.includes('toggle theme') || key.includes('switch theme') || key.includes('change mode') || key.includes('toggle mode');

  if (wantsLight || wantsDark || wantsToggle) {
    const isCurrentlyLight = document.body.classList.contains('light-mode');

    if (wantsLight && isCurrentlyLight) {
      addBotMessage({ text: "You're already in **Light Mode**! ☀️\n\nAnything else I can help with?", quickReplies: ['Switch to dark mode', 'Show features', 'Most upvoted issue'] });
      return;
    }
    if (wantsDark && !isCurrentlyLight) {
      addBotMessage({ text: "You're already in **Dark Mode**! 🌙\n\nAnything else I can help with?", quickReplies: ['Switch to light mode', 'Show features', 'Most upvoted issue'] });
      return;
    }

    let switchToLight;
    if (wantsLight) switchToLight = true;
    else if (wantsDark) switchToLight = false;
    else switchToLight = !isCurrentlyLight; // toggle

    // Apply theme
    if (switchToLight) {
      document.body.classList.add('light-mode');
      localStorage.setItem('faxx_theme', 'light');
    } else {
      document.body.classList.remove('light-mode');
      localStorage.setItem('faxx_theme', 'dark');
    }

    // Sync sidebar toggle widget
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      if (switchToLight) toggle.classList.remove('dark');
      else toggle.classList.add('dark');
    }

    const modeName = switchToLight ? 'Light Mode ☀️' : 'Dark Mode 🌙';
    addBotMessage({
      text: `Done! Switched to **${modeName}**\n\nThe new theme is saved and will persist across pages. Enjoy the new look!`,
      quickReplies: [switchToLight ? 'Switch to dark mode' : 'Switch to light mode', 'Show features', 'Most upvoted issue']
    });
    return;
  }

  // 1. Navigation detection — "guide me to", "take me to", "go to", "show me", "open"
  const navPatterns = ['guide me to', 'take me to', 'go to', 'show me', 'open', 'navigate to', 'visit'];
  for (const pattern of navPatterns) {
    if (key.includes(pattern)) {
      const destination = key.split(pattern)[1]?.trim();
      if (destination) {
        const nav = findNavigation(destination);
        if (nav) {
          addBotMessage({ text: `Taking you to **${nav.name}** now! 🚀`, quickReplies: [] });
          setTimeout(() => { window.location.href = nav.url; }, 1000);
          return;
        }
      }
    }
  }

  // 2. Dynamic data queries
  if (key.includes('most upvoted') || key.includes('top issue') || key.includes('trending') || key.includes('popular') || key.includes('highest upvote')) {
    addBotMessage(getMostUpvotedIssue());
    return;
  }

  if (key.includes('stats') || key.includes('statistics') || key.includes('how many') || key.includes('total complaints') || key.includes('numbers')) {
    addBotMessage(getComplaintStats());
    return;
  }

  // 3. Navigation keywords without prefix
  const nav = findNavigation(key);
  if (nav && (key.includes('where') || key.includes('go') || key.includes('take') || key.includes('guide') || key.includes('show') || key.includes('open'))) {
    addBotMessage({
      text: `I can take you to **${nav.name}**! Would you like to go there?`,
      quickReplies: [`Guide me to ${Object.keys(PAGE_NAVIGATION).find(k => PAGE_NAVIGATION[k].url === nav.url) || 'there'}`, 'Show features', 'What can I do here?']
    });
    return;
  }

  // 4. Static response lookup
  const staticResponse = CHATBOT_RESPONSES[key];
  if (staticResponse) {
    addBotMessage(staticResponse);
    return;
  }

  // 5. Fuzzy match
  let bestMatch = null;
  let bestScore = 0;

  for (const [responseKey, response] of Object.entries(CHATBOT_RESPONSES)) {
    if (responseKey === 'greeting') continue;
    const keywords = responseKey.replace(/[?!]/g, '').split(' ');
    const matchCount = keywords.filter(w => key.includes(w)).length;
    const score = matchCount / keywords.length;
    if (score > bestScore && score >= 0.4) {
      bestScore = score;
      bestMatch = response;
    }
  }

  // 6. Keyword detection
  if (!bestMatch) {
    if (key.includes('complaint') || key.includes('file') || key.includes('submit') || key.includes('grievance') || key.includes('report')) {
      bestMatch = CHATBOT_RESPONSES['how to file a complaint?'];
    } else if (key.includes('safe') || key.includes('secure') || key.includes('privacy') || key.includes('transparent') || key.includes('trust')) {
      bestMatch = CHATBOT_RESPONSES['is it safe?'];
    } else if (key.includes('feature') || key.includes('what do') || key.includes('about')) {
      bestMatch = CHATBOT_RESPONSES['show features'];
    } else if (key.includes('upvote') || key.includes('vote') || key.includes('like') || key.includes('agree')) {
      bestMatch = CHATBOT_RESPONSES['what is upvoting?'];
    } else if (key.includes('escalat') || key.includes('priority') || key.includes('urgent') || key.includes('critical')) {
      bestMatch = CHATBOT_RESPONSES['how does escalation work?'];
    } else if (key.includes('category') || key.includes('categories') || key.includes('type')) {
      bestMatch = CHATBOT_RESPONSES['what categories exist?'];
    } else if (key.includes('hostel') || key.includes('room') || key.includes('plumbing')) {
      bestMatch = CHATBOT_RESPONSES['what categories exist?'];
    } else if (key.includes('mess') || key.includes('food') || key.includes('canteen')) {
      bestMatch = CHATBOT_RESPONSES['what categories exist?'];
    } else if (key.includes('wifi') || key.includes('internet') || key.includes('infrastructure') || key.includes('transport')) {
      bestMatch = CHATBOT_RESPONSES['what categories exist?'];
    } else if (key.includes('api') || key.includes('test') || key.includes('endpoint') || key.includes('developer')) {
      bestMatch = CHATBOT_RESPONSES['what is the api console?'];
    } else if (key.includes('login') || key.includes('sign') || key.includes('otp') || key.includes('register')) {
      bestMatch = CHATBOT_RESPONSES['how to file a complaint?'];
    } else if (key.includes('anonymous') || key.includes('anon') || key.includes('name')) {
      bestMatch = CHATBOT_RESPONSES['is it anonymous?'];
    } else if (key.includes('hello') || key.includes('hi') || key.includes('hey') || key.includes('sup')) {
      bestMatch = CHATBOT_RESPONSES.greeting;
    } else if (key.includes('thank') || key.includes('thanks') || key.includes('bye') || key.includes('good')) {
      bestMatch = { text: "You're welcome! 😊 Remember, FAXX is here to make your campus life better. Don't hesitate to file a complaint — **every voice counts!**\n\nHave a great day! 🎓", quickReplies: ['Show features', 'How to file a complaint?'] };
    } else if (key.includes('help')) {
      bestMatch = {
        text: "Here's what I can help you with:\n\n📋 **File complaints** — I'll guide you step by step\n🔍 **Find features** — Know everything FAXX offers\n🏆 **Most upvoted issue** — See what's trending\n📊 **Stats** — Get live complaint statistics\n🧭 **Navigate** — Say 'Guide me to...' + any page\n🔐 **Security** — Know how your data is protected\n\nJust type your question or tap a button below!",
        quickReplies: ['Show features', 'Most upvoted issue', 'Stats', 'How to file a complaint?']
      };
    }
  }

  if (bestMatch) {
    addBotMessage(bestMatch);
  } else {
    addBotMessage({
      text: "I'm not sure I understand that. Let me show you what I can help with! 😊\n\nTry asking about:\n• Complaints & categories\n• Features & security\n• Most upvoted issue\n• Navigation (say **'Guide me to...'**)\n• Stats & analytics",
      quickReplies: ['Show features', 'Most upvoted issue', 'How to file a complaint?', 'Help']
    });
  }
}

// ===== Navigation Finder =====
function findNavigation(text) {
  for (const [keyword, nav] of Object.entries(PAGE_NAVIGATION)) {
    if (text.includes(keyword)) {
      return nav;
    }
  }
  return null;
}

// ===== Init on Load =====
document.addEventListener('DOMContentLoaded', initChatbot);
