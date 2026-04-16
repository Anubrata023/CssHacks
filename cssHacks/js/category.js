/* ============================================
   FAXX - Category Page JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initCategoryPage();
});

function initCategoryPage() {
  const params = new URLSearchParams(window.location.search);
  const categoryKey = params.get('cat');

  if (!categoryKey || !COMPLAINT_CATEGORIES[categoryKey]) {
    document.getElementById('category-title').textContent = 'Category Not Found';
    document.getElementById('category-desc').textContent = 'Please go back and select a valid complaint category.';
    return;
  }

  const category = COMPLAINT_CATEGORIES[categoryKey];

  // Update hero
  document.getElementById('category-title').textContent = category.title;
  document.getElementById('category-desc').textContent = category.description;
  document.getElementById('category-icon').textContent = category.icon;
  document.getElementById('category-breadcrumb-name').textContent = category.title;
  document.title = `${category.title} - FAXX`;

  // Render subcategories (subcategories is an OBJECT with keys)
  const container = document.getElementById('subcategories-container');
  container.innerHTML = '';

  const subKeys = Object.keys(category.subcategories);

  subKeys.forEach((subKey, subIndex) => {
    const sub = category.subcategories[subKey];
    const complaints = sub.complaints || [];

    const subCard = document.createElement('div');
    subCard.className = 'subcategory-card';
    subCard.innerHTML = `
      <div class="subcategory-header">
        <div class="subcategory-left">
          <div class="subcategory-icon">${sub.icon || '📌'}</div>
          <div>
            <div class="subcategory-title">${sub.title}</div>
            <div class="subcategory-count">${complaints.length} complaint types</div>
          </div>
        </div>
        <div class="subcategory-toggle">▼</div>
      </div>
      <div class="mini-complaints">
        ${renderMiniComplaints(complaints, categoryKey, sub.title)}
      </div>
    `;

    // Toggle expand/collapse
    const header = subCard.querySelector('.subcategory-header');
    header.addEventListener('click', () => {
      container.querySelectorAll('.subcategory-card.expanded').forEach(card => {
        if (card !== subCard) card.classList.remove('expanded');
      });
      subCard.classList.toggle('expanded');
    });

    container.appendChild(subCard);
  });

  // Auto expand first
  const firstCard = container.querySelector('.subcategory-card');
  if (firstCard) firstCard.classList.add('expanded');
}

function renderMiniComplaints(complaints, categoryKey, subTitle) {
  if (!complaints || !complaints.length) {
    return '<div class="empty-state"><p>No complaints available</p></div>';
  }

  return complaints.map(item => {
    const title = typeof item === 'string' ? item : item.title;
    const desc = typeof item === 'string' ? '' : (item.description || '');

    return `
      <div class="mini-complaint-item">
        <div class="mini-complaint-info">
          <div class="mini-complaint-title">${title}</div>
          ${desc ? `<div class="mini-complaint-desc">${desc}</div>` : ''}
        </div>
        <div class="mini-complaint-apply">
          <button class="btn btn-primary btn-sm" onclick="openComplaintForm('${categoryKey}', '${subTitle.replace(/'/g, "\\'")}', '${title.replace(/'/g, "\\'")}')">
            Apply
          </button>
        </div>
      </div>
    `;
  }).join('');
}

/* ---------- Form Modal ---------- */
function openComplaintForm(categoryKey, subTitle, complaintTitle) {
  if (!UserSession.isLoggedIn()) {
    showToast('Please login first to file a complaint', 'error');
    setTimeout(() => { window.location.href = 'login-student.html'; }, 1200);
    return;
  }

  const overlay = document.getElementById('form-overlay');
  const category = COMPLAINT_CATEGORIES[categoryKey];

  document.getElementById('form-category-tag').textContent = `${category.icon} ${category.title}`;
  document.getElementById('form-complaint-title').textContent = complaintTitle;
  document.getElementById('complaint-category').value = categoryKey;
  document.getElementById('complaint-subcategory').value = subTitle;
  document.getElementById('complaint-title-hidden').value = complaintTitle;

  // Generate dynamic fields from formFields (array of string keys referencing FORM_FIELDS)
  const dynamicFields = document.getElementById('form-dynamic-fields');
  dynamicFields.innerHTML = '';

  if (category.formFields && category.formFields.length) {
    category.formFields.forEach(fieldKey => {
      const field = FORM_FIELDS[fieldKey];
      if (!field) return;

      const group = document.createElement('div');
      group.className = 'input-group';

      if (field.type === 'select') {
        group.innerHTML = `
          <label for="${fieldKey}">${field.label}</label>
          <select class="select-field" id="${fieldKey}" name="${fieldKey}">
            <option value="">Select ${field.label}</option>
            ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
          </select>
        `;
      } else {
        group.innerHTML = `
          <label for="${fieldKey}">${field.label}</label>
          <input type="${field.type || 'text'}" class="input-field" id="${fieldKey}" name="${fieldKey}" placeholder="${field.placeholder || ''}">
        `;
      }

      dynamicFields.appendChild(group);
    });
  }

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Upload area
  const uploadArea = document.getElementById('upload-area');
  const fileInput = document.getElementById('complaint-file');
  if (uploadArea && fileInput) {
    uploadArea.onclick = () => fileInput.click();
    fileInput.onchange = () => {
      if (fileInput.files.length) {
        uploadArea.querySelector('.upload-text').innerHTML = `✅ <strong>${fileInput.files[0].name}</strong> selected`;
      }
    };
  }
}

function closeComplaintForm() {
  const overlay = document.getElementById('form-overlay');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
  document.getElementById('complaint-form').reset();

  const uploadArea = document.getElementById('upload-area');
  if (uploadArea) {
    uploadArea.querySelector('.upload-text').innerHTML = 'Click to upload images or documents<br><small>PNG, JPG, PDF up to 5MB</small>';
  }
}

// Close handlers & form submission
document.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.getElementById('form-close-btn');
  if (closeBtn) closeBtn.addEventListener('click', closeComplaintForm);

  const overlay = document.getElementById('form-overlay');
  if (overlay) overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeComplaintForm();
  });

  const form = document.getElementById('complaint-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const complaint = {
        id: 'CMP-' + Date.now(),
        category: formData.get('complaint-category'),
        subcategory: formData.get('complaint-subcategory'),
        title: formData.get('complaint-title'),
        description: formData.get('complaint-description'),
        urgency: formData.get('complaint-urgency'),
        status: 'pending',
        date: new Date().toISOString(),
        user: UserSession.getUser()?.name || 'Anonymous'
      };

      const complaints = JSON.parse(localStorage.getItem('faxx_complaints') || '[]');
      complaints.unshift(complaint);
      localStorage.setItem('faxx_complaints', JSON.stringify(complaints));

      closeComplaintForm();
      showToast('Complaint submitted successfully! ID: ' + complaint.id, 'success');
    });
  }
});
