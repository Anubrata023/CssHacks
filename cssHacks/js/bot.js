/* ============================================
   FAXX - Chatbot Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initChatbot();
});

const BOT_RESPONSES = {
  greetings: {
    patterns: ['hi', 'hello', 'hey', 'greetings', 'yo'],
    reply: "Hello! 👋 I'm FAXX Bot. How can I help you today?",
    options: ['How to file a complaint?', 'What is FAXX?', 'Contact Admin']
  },
  howToComplain: {
    patterns: ['how to file', 'complain', 'register', 'submit', 'file a complaint'],
    reply: "To file a complaint, please click on 'Complaints' in the menu or go to a specific category from the Home page. Make sure you are logged in as a student!",
    options: ['Login as Student', 'View Categories']
  },
  whatIsFaxx: {
    patterns: ['what is faxx', 'about', 'info'],
    reply: "FAXX is a Unified Complaint Portal built by students, for students. It allows you to report campus issues securely and track their resolution anonymously.",
    options: ['Public Feed', 'View Analytics']
  },
  admin: {
    patterns: ['admin', 'contact admin', 'help', 'support'],
    reply: "If you need immediate assistance that isn't covered by the categories, please visit the administrative office or use the 'Others' category when filing a complaint.",
    options: ['Go to Others Category']
  },
  default: "I'm not exactly sure how to answer that yet! Plase try asking about filing a complaint, or learning more about FAXX.",
};

function initChatbot() {
  const toggleBtn = document.getElementById('chatbot-toggle');
  const chatWindow = document.getElementById('chatbot-window');
  const closeBtn = document.getElementById('chatbot-close');
  const sendBtn = document.getElementById('chatbot-send');
  const inputEl = document.getElementById('chatbot-input');
  const messagesContainer = document.getElementById('chatbot-messages');

  if (!toggleBtn || !chatWindow) return;

  // Toggle Window
  toggleBtn.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
    if (chatWindow.classList.contains('active')) {
      inputEl.focus();
      // Add welcome message if empty
      if (messagesContainer.children.length === 0) {
        appendBotMessage(BOT_RESPONSES.greetings.reply, BOT_RESPONSES.greetings.options);
      }
    }
  });

  closeBtn.addEventListener('click', () => {
    chatWindow.classList.remove('active');
  });

  // Sending message
  const sendMessage = () => {
    const text = inputEl.value.trim();
    if (!text) return;

    appendUserMessage(text);
    inputEl.value = '';
    
    // Simulate typing
    showTypingIndicator();
    
    setTimeout(() => {
      removeTypingIndicator();
      handleBotReply(text);
    }, 800 + Math.random() * 500);
  };

  sendBtn.addEventListener('click', sendMessage);
  inputEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
}

function appendUserMessage(text) {
  const container = document.getElementById('chatbot-messages');
  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-msg user';
  msgDiv.innerHTML = `<div class="msg-bubble">${escapeHTML(text)}</div>`;
  container.appendChild(msgDiv);
  scrollToBottom();
}

function appendBotMessage(text, options = []) {
  const container = document.getElementById('chatbot-messages');
  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-msg bot';
  
  let optionsHtml = '';
  if (options.length > 0) {
    optionsHtml = '<div class="quick-replies">' + 
      options.map(opt => `<button class="quick-reply-btn" onclick="handleQuickReply('${escapeHTML(opt)}')">${escapeHTML(opt)}</button>`).join('') + 
      '</div>';
  }

  msgDiv.innerHTML = `<div class="msg-bubble">${text}${optionsHtml}</div>`;
  container.appendChild(msgDiv);
  scrollToBottom();
}

function showTypingIndicator() {
  const container = document.getElementById('chatbot-messages');
  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-msg bot typing';
  msgDiv.id = 'typing-indicator-msg';
  msgDiv.innerHTML = `
    <div class="msg-bubble" style="padding: 12px 14px;">
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    </div>
  `;
  container.appendChild(msgDiv);
  scrollToBottom();
}

function removeTypingIndicator() {
  const typingMsg = document.getElementById('typing-indicator-msg');
  if (typingMsg) typingMsg.remove();
}

function handleBotReply(text) {
  const lowerText = text.toLowerCase();
  
  // Find matching response pattern
  let matchedResponse = null;
  
  for (const key in BOT_RESPONSES) {
    if (key === 'default') continue;
    const responseData = BOT_RESPONSES[key];
    if (responseData.patterns.some(pattern => lowerText.includes(pattern))) {
      matchedResponse = responseData;
      break;
    }
  }

  // Handle specific actions for matching options directly
  if (lowerText.includes('login') && lowerText.includes('student')) {
    window.location.href = 'login-student.html';
    return;
  }
  if (lowerText.includes('view categories')) {
    window.location.href = 'index.html#complaints';
    return;
  }
  if (lowerText.includes('public feed')) {
    window.location.href = 'public-feed.html';
    return;
  }
  if (lowerText.includes('analytics')) {
    window.location.href = 'analytics.html';
    return;
  }
  if (lowerText.includes('others category')) {
    sessionStorage.setItem('faxx_category', 'others');
    window.location.href = 'category.html?cat=others';
    return;
  }

  if (matchedResponse) {
    appendBotMessage(matchedResponse.reply, matchedResponse.options);
  } else {
    appendBotMessage(BOT_RESPONSES.default, ['What is FAXX?', 'How to file a complaint?']);
  }
}

// Global function for inline HTML access
window.handleQuickReply = function(text) {
  const inputEl = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('chatbot-send');
  if (inputEl) {
    inputEl.value = text;
    sendBtn.click();
  }
};

function scrollToBottom() {
  const container = document.getElementById('chatbot-messages');
  container.scrollTop = container.scrollHeight;
}

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
