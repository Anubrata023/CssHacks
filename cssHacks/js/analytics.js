/* ============================================
   FAXX - Analytics JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initAnalytics();
});

function initAnalytics() {
  animateStats();
  renderCategoryChart();
  renderStatusDonut();
  renderMonthlyTrend();
  renderHostelChart();
  renderRecentComplaints();
  renderDeptTable();
}

/* ---------- Stat Counters ---------- */
function animateStats() {
  const stats = { total: 1247, resolved: 892, pending: 286, critical: 69 };
  animateTo('stat-total', stats.total);
  animateTo('stat-resolved', stats.resolved);
  animateTo('stat-pending', stats.pending);
  animateTo('stat-critical', stats.critical);
}

function animateTo(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(update);
}

/* ---------- Category Bar Chart ---------- */
function renderCategoryChart() {
  const container = document.getElementById('category-bar-chart');
  if (!container) return;

  const data = [
    { label: 'Mess', value: 342, color: '#00f5d4' },
    { label: 'Hostel', value: 289, color: '#7b61ff' },
    { label: 'Academic', value: 201, color: '#4dabf7' },
    { label: 'Infra', value: 178, color: '#ffd93d' },
    { label: 'Admin', value: 134, color: '#ff6b6b' },
    { label: 'Other', value: 103, color: '#a78bfa' }
  ];

  const max = Math.max(...data.map(d => d.value));

  container.innerHTML = data.map(d => {
    const height = (d.value / max * 100);
    return `
      <div class="bar-item">
        <div class="bar-value">${d.value}</div>
        <div class="bar-fill" style="height: ${height}%; background: ${d.color}; box-shadow: 0 0 12px ${d.color}40;"></div>
        <div class="bar-label">${d.label}</div>
      </div>
    `;
  }).join('');

  // Animate in
  setTimeout(() => {
    container.querySelectorAll('.bar-fill').forEach(bar => {
      const h = bar.style.height;
      bar.style.height = '0%';
      requestAnimationFrame(() => { bar.style.height = h; });
    });
  }, 300);
}

/* ---------- Status Donut ---------- */
function renderStatusDonut() {
  const donut = document.getElementById('status-donut');
  const legend = document.getElementById('donut-legend');
  if (!donut || !legend) return;

  const total = 1247;
  const data = [
    { label: 'Resolved', value: 892, color: '#00f5d4' },
    { label: 'Pending', value: 286, color: '#ffd93d' },
    { label: 'Critical', value: 69, color: '#ff6b6b' }
  ];

  let gradientParts = [];
  let accumulated = 0;

  data.forEach(item => {
    const percent = (item.value / total) * 100;
    gradientParts.push(`${item.color} ${accumulated}% ${accumulated + percent}%`);
    accumulated += percent;
  });

  donut.style.background = `conic-gradient(${gradientParts.join(', ')})`;

  // Update center
  const centerNum = donut.querySelector('.donut-center-number');
  if (centerNum) centerNum.textContent = total.toLocaleString();

  // Legend
  legend.innerHTML = data.map(d => `
    <div class="donut-legend-item">
      <span class="donut-legend-color" style="background: ${d.color}; box-shadow: 0 0 6px ${d.color}60;"></span>
      <span class="donut-legend-label">${d.label}</span>
      <span class="donut-legend-value">${d.value}</span>
    </div>
  `).join('');
}

/* ---------- Monthly Trend ---------- */
function renderMonthlyTrend() {
  const container = document.getElementById('monthly-trend-chart');
  if (!container) return;

  const months = [
    { label: 'Jan', value: 85 }, { label: 'Feb', value: 112 },
    { label: 'Mar', value: 98 }, { label: 'Apr', value: 145 },
    { label: 'May', value: 132 }, { label: 'Jun', value: 89 },
    { label: 'Jul', value: 76 }, { label: 'Aug', value: 168 },
    { label: 'Sep', value: 155 }, { label: 'Oct', value: 142 },
    { label: 'Nov', value: 125 }, { label: 'Dec', value: 120 }
  ];

  const max = Math.max(...months.map(m => m.value));

  container.innerHTML = months.map(m => {
    const height = (m.value / max * 100);
    return `
      <div class="bar-item">
        <div class="bar-value">${m.value}</div>
        <div class="bar-fill" style="height: ${height}%; background: linear-gradient(to top, #00f5d4, #7b61ff); box-shadow: 0 0 12px rgba(0,245,212,0.3);"></div>
        <div class="bar-label">${m.label}</div>
      </div>
    `;
  }).join('');

  setTimeout(() => {
    container.querySelectorAll('.bar-fill').forEach(bar => {
      const h = bar.style.height;
      bar.style.height = '0%';
      requestAnimationFrame(() => { bar.style.height = h; });
    });
  }, 500);
}

/* ---------- Hostel Chart ---------- */
function renderHostelChart() {
  const container = document.getElementById('hostel-bar-chart');
  if (!container) return;

  const data = [
    { label: 'H1', value: 89, color: '#00f5d4' },
    { label: 'H2', value: 67, color: '#4dabf7' },
    { label: 'H3', value: 112, color: '#7b61ff' },
    { label: 'H4', value: 54, color: '#a78bfa' },
    { label: 'H5', value: 76, color: '#ffd93d' },
    { label: 'Girls', value: 95, color: '#ff6b6b' }
  ];

  const max = Math.max(...data.map(d => d.value));

  container.innerHTML = data.map(d => {
    const height = (d.value / max * 100);
    return `
      <div class="bar-item">
        <div class="bar-value">${d.value}</div>
        <div class="bar-fill" style="height: ${height}%; background: ${d.color}; box-shadow: 0 0 10px ${d.color}40;"></div>
        <div class="bar-label">${d.label}</div>
      </div>
    `;
  }).join('');

  setTimeout(() => {
    container.querySelectorAll('.bar-fill').forEach(bar => {
      const h = bar.style.height;
      bar.style.height = '0%';
      requestAnimationFrame(() => { bar.style.height = h; });
    });
  }, 400);
}

/* ---------- Recent Complaints ---------- */
function renderRecentComplaints() {
  const container = document.getElementById('recent-complaints-list');
  if (!container) return;

  const recent = [
    { title: 'Cold food in mess', status: 'pending', category: 'Mess', time: '2h ago' },
    { title: 'WiFi down in H3', status: 'critical', category: 'Infra', time: '3h ago' },
    { title: 'Broken AC in room 204', status: 'resolved', category: 'Hostel', time: '5h ago' },
    { title: 'Exam schedule conflict', status: 'pending', category: 'Academic', time: '8h ago' },
    { title: 'Library closing early', status: 'resolved', category: 'Admin', time: '12h ago' },
    { title: 'Water leakage in bathroom', status: 'pending', category: 'Hostel', time: '1d ago' }
  ];

  container.innerHTML = recent.map(item => `
    <div class="recent-complaint-item">
      <div class="recent-complaint-dot ${item.status}"></div>
      <div class="recent-complaint-info">
        <div class="recent-complaint-title">${item.title}</div>
        <div class="recent-complaint-meta">${item.category}</div>
      </div>
      <div class="recent-complaint-time">${item.time}</div>
    </div>
  `).join('');
}

/* ---------- Dept Table ---------- */
function renderDeptTable() {
  const tbody = document.getElementById('dept-table-body');
  if (!tbody) return;

  const depts = [
    { name: 'CSE', total: 312, resolved: 245, pending: 67 },
    { name: 'ECE', total: 198, resolved: 156, pending: 42 },
    { name: 'ME', total: 167, resolved: 121, pending: 46 },
    { name: 'EE', total: 145, resolved: 112, pending: 33 },
    { name: 'IT', total: 134, resolved: 98, pending: 36 },
    { name: 'CE', total: 112, resolved: 89, pending: 23 },
    { name: 'BT', total: 98, resolved: 72, pending: 26 },
    { name: 'MBA', total: 81, resolved: 59, pending: 22 }
  ];

  tbody.innerHTML = depts.map((dept, i) => {
    const rate = Math.round((dept.resolved / dept.total) * 100);
    const rateColor = rate >= 75 ? 'var(--success)' : rate >= 50 ? 'var(--warning)' : 'var(--danger)';
    return `
      <tr>
        <td>${i + 1}</td>
        <td><strong>${dept.name}</strong></td>
        <td>${dept.total}</td>
        <td style="color: var(--success);">${dept.resolved}</td>
        <td style="color: var(--warning);">${dept.pending}</td>
        <td style="color: ${rateColor}; font-weight: 700;">${rate}%</td>
      </tr>
    `;
  }).join('');
}

/* ---------- Chart Filter ---------- */
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('chart-filter-btn')) {
    const parent = e.target.closest('.chart-filter');
    parent.querySelectorAll('.chart-filter-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
  }
});
