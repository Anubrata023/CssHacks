/* ============================================
   FAXX - Profile JavaScript (Rectified)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initProfile();
});

function initProfile() {
  const user = UserSession.getUser();

  if (!user) {
    // Not logged in
    document.getElementById('profile-name').textContent = 'Not Logged In';
    document.getElementById('profile-email').textContent = '';
    document.getElementById('profile-avatar').textContent = '?';
    document.getElementById('profile-role').textContent = '🔒 Guest';

    document.getElementById('complaint-history-list').innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔒</div>
        <p>Please <a href="login-student.html" style="color: var(--accent); text-decoration: underline;">login</a> to view your profile</p>
      </div>
    `;
    return;
  }

  // FIXED: Normalize role — backend sends 'role', frontend uses 'type'
  const userType = user.type || user.role || 'student';

  // Fill profile data
  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  document.getElementById('profile-avatar').textContent = initials;
  document.getElementById('profile-name').textContent = user.name;
  document.getElementById('profile-email').textContent = user.email || '';

  const roleEl = document.getElementById('profile-role');
  if (userType === 'admin') {
    roleEl.textContent = '🛡️ Admin';
    roleEl.className = 'profile-role admin';
  } else {
    roleEl.textContent = '🎓 Student';
    roleEl.className = 'profile-role student';
  }

  // Detail cards
  document.getElementById('detail-name').textContent = user.name;
  document.getElementById('detail-email').textContent = user.email || '-';
  document.getElementById('detail-department').textContent = user.department || '-';
  document.getElementById('detail-type').textContent = userType === 'admin' ? 'Administrator' : 'Student';

  const idLabel = document.getElementById('detail-id-label');
  const idVal = document.getElementById('detail-id');
  if (userType === 'admin') {
    idLabel.textContent = 'Employee ID';
    idVal.textContent = user.employeeId || '-';
  } else {
    idLabel.textContent = 'Scholar ID';
    idVal.textContent = user.scholarId || '-';
  }

  // Login time
  const loginTime = user.loginTime ? new Date(user.loginTime).toLocaleString() : 'Just now';
  document.getElementById('detail-joined').textContent = loginTime;

  // Render history/management
  renderComplaintHistory();

  // Logout
  const logoutBtn = document.getElementById('profile-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      UserSession.logout();
      showToast('Logged out successfully', 'success');
      setTimeout(() => { window.location.href = 'index.html'; }, 800);
    });
  }
}

function renderComplaintHistory() {
  const listEl = document.getElementById('complaint-history-list');
  const complaints = JSON.parse(localStorage.getItem('faxx_complaints') || '[]');
  const user = UserSession.getUser();

  if (!user) return;

  // FIXED: Check both 'type' and 'role' for admin detection
  const userType = user.type || user.role || 'student';
  const isAdmin = userType === 'admin';
  const displayComplaints = isAdmin ? complaints : complaints.filter(c => c.user === user.name);

  if (isAdmin) {
    const sectionTitle = document.querySelector('.complaint-history-section h3');
    if (sectionTitle) sectionTitle.innerHTML = '📋 Manage Complaints';
    
    // Hide new complaint button for admins
    const newComplaintBtn = document.querySelector('.profile-actions a.btn-primary');
    if (newComplaintBtn) newComplaintBtn.style.display = 'none';
  }

  if (!displayComplaints.length) {
    listEl.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📭</div>
        <p>${isAdmin ? 'No complaints to manage.' : 'No complaints filed yet. <a href="index.html#complaints" style="color: var(--accent); text-decoration: underline;">File one now</a>'}</p>
      </div>
    `;
    return;
  }

  const statusIcons = {
    pending: '⏳',
    'in-progress': '🔄',
    resolved: '✅',
    rejected: '❌'
  };

  const statusClasses = {
    pending: 'badge-warning',
    'in-progress': 'badge-info',
    resolved: 'badge-success',
    rejected: 'badge-danger'
  };

  listEl.innerHTML = displayComplaints.map(c => {
    const cat = COMPLAINT_CATEGORIES[c.category] || { icon: '📋' };
    const catIcon = cat.icon;
    const dateStr = new Date(c.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    
    let adminOptions = '';
    if (isAdmin) {
      adminOptions = `
        <div class="admin-options">
          <button class="btn btn-outline btn-sm" onclick="updateStatus('${c.id}', 'in-progress', event)">In Progress</button>
          <button class="btn btn-primary btn-sm" onclick="updateStatus('${c.id}', 'resolved', event)">Resolve</button>
          <button class="btn btn-ghost btn-sm" onclick="updateStatus('${c.id}', 'rejected', event)" style="color:var(--danger)">Reject</button>
        </div>
      `;
    }

    return `
      <div class="complaint-history-item" onclick="this.classList.toggle('expanded')">
        <div class="complaint-history-icon">${catIcon}</div>
        <div class="complaint-history-info">
          <div class="complaint-history-title">${c.title}</div>
          <div class="complaint-history-meta">${c.subcategory} · ${dateStr} · By: ${c.user} · ID: ${c.id}</div>
        </div>
        <div class="complaint-history-status">
          <span class="badge ${statusClasses[c.status] || 'badge-info'}">
            ${statusIcons[c.status] || '⏳'} <span style="text-transform: capitalize;">${c.status}</span>
          </span>
        </div>
        ${adminOptions}
      </div>
    `;
  }).join('');
}

// Global function to update status from onclick
window.updateStatus = async function(id, status, event) {
  event.stopPropagation(); // Prevent the toggle from triggering
  
  if (!confirm('Are you sure you want to mark this complaint as ' + status + '?')) return;
  
  const user = UserSession.getUser();
  const adminName = user?.name || 'Admin';

  // 1. Update localStorage immediately (instant UI)
  let complaints = JSON.parse(localStorage.getItem('faxx_complaints') || '[]');
  const idx = complaints.findIndex(c => c.id === id);
  if (idx !== -1) {
    complaints[idx].status = status;
    localStorage.setItem('faxx_complaints', JSON.stringify(complaints));
    renderComplaintHistory(); // re-render
  }

  // 2. PATCH to backend (triggers terminal notification)
  try {
    await fetch(`/api/complaints/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, admin: adminName })
    });
  } catch (err) {
    console.warn('Backend notification failed (offline mode):', err.message);
  }

  // 3. Pop-up Notification
  if (status === 'resolved') {
    showToast('Your issue is resolved', 'success');
  } else {
    showToast('Complaint status updated to ' + status, 'success');
  }
};
