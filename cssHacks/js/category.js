/* ============================================
    FAXX - Category Page JavaScript (Perfected)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initCategoryPage();
  setupFormListeners(); // Initialize both functions correctly
});

function initCategoryPage() {
  const params = new URLSearchParams(window.location.search);
  let categoryKey = params.get('cat');

  try {
    if (!categoryKey) {
      categoryKey = sessionStorage.getItem('faxx_category');
    } else {
      sessionStorage.setItem('faxx_category', categoryKey);
    }
  } catch (e) {
    console.warn("sessionStorage is unavailable:", e);
  }

  // Added safety check for external data
  if (!categoryKey || typeof COMPLAINT_CATEGORIES === 'undefined' || !COMPLAINT_CATEGORIES[categoryKey]) {
    const titleEl = document.getElementById('category-title');
    if (titleEl) titleEl.textContent = 'Category Not Found';
    return;
  }

  const category = COMPLAINT_CATEGORIES[categoryKey];

  // Safe UI Updates using IDs from category.html
  document.getElementById('category-title').textContent = category.title;
  document.getElementById('category-desc').textContent = category.description;
  document.getElementById('category-icon').textContent = category.icon;
  document.getElementById('category-breadcrumb-name').textContent = category.title;
  document.title = `${category.title} - FAXX`;

  renderSubcategories(category, categoryKey);
}

function renderSubcategories(category, categoryKey) {
  const container = document.getElementById('subcategories-container');
  if (!container) return;

  container.innerHTML = '';
  const subKeys = Object.keys(category.subcategories);

  subKeys.forEach((subKey) => {
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

    const header = subCard.querySelector('.subcategory-header');
    header.addEventListener('click', () => {
      container.querySelectorAll('.subcategory-card.expanded').forEach(card => {
        if (card !== subCard) card.classList.remove('expanded');
      });
      subCard.classList.toggle('expanded');
    });

    container.appendChild(subCard);
  });

  const firstCard = container.querySelector('.subcategory-card');
  if (firstCard) firstCard.classList.add('expanded');
}

function renderMiniComplaints(complaints, categoryKey, subTitle) {
  if (!complaints || !complaints.length) return '<div class="empty-state"><p>No complaints available</p></div>';

  return complaints.map(item => {
    const title = typeof item === 'string' ? item : item.title;
    const sanitizedSubTitle = subTitle.replace(/'/g, "\\'");
    const sanitizedTitle = title.replace(/'/g, "\\'");

    return `
            <div class="mini-complaint-item">
                <div class="mini-complaint-info">
                    <div class="mini-complaint-title">${title}</div>
                </div>
                <div class="mini-complaint-apply">
                    <button class="btn btn-primary btn-sm" onclick="openComplaintForm('${categoryKey}', '${sanitizedSubTitle}', '${sanitizedTitle}')">
                        Apply
                    </button>
                </div>
            </div>
        `;
  }).join('');
}

/* ---------- Form Modal Logic ---------- */

function openComplaintForm(categoryKey, subTitle, complaintTitle) {
  if (typeof UserSession === 'undefined' || !UserSession.isLoggedIn()) {
    showToast('Please login first to file a complaint', 'error');
    setTimeout(() => { window.location.href = 'login-student.html'; }, 1200);
    return;
  }

  const overlay = document.getElementById('form-overlay');
  const category = COMPLAINT_CATEGORIES[categoryKey];
  if (!overlay || !category) return;

  document.getElementById('form-category-tag').textContent = `${category.icon} ${category.title}`;
  document.getElementById('form-complaint-title').textContent = complaintTitle;

  // Fill Hidden Inputs for FormData retrieval
  document.getElementById('complaint-category').value = categoryKey;
  document.getElementById('complaint-subcategory').value = subTitle;

  const titleInput = document.getElementById('complaint-title-hidden');
  if (titleInput) titleInput.value = complaintTitle;

  // Clear and Render Dynamic Fields
  const dynamicFields = document.getElementById('form-dynamic-fields');
  dynamicFields.innerHTML = '';

  if (category.formFields) {
    category.formFields.forEach(fieldKey => {
      const field = FORM_FIELDS[fieldKey];
      if (!field) return;

      const group = document.createElement('div');
      group.className = 'input-group';
      group.innerHTML = field.type === 'select' ? `
          <label>${field.label}</label>
          <select class="select-field" name="${fieldKey}" required>
            <option value="">Select ${field.label}</option>
            ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
          </select>` : `
          <label>${field.label}</label>
          <input type="${field.type || 'text'}" class="input-field" name="${fieldKey}" placeholder="${field.placeholder || ''}" required>`;
      dynamicFields.appendChild(group);
    });
  }

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeComplaintForm() {
  document.getElementById('form-overlay').classList.remove('active');
  document.body.style.overflow = '';
  document.getElementById('complaint-form').reset();
}

function setupFormListeners() {
  const form = document.getElementById('complaint-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try { // FIXED: Added missing try block
      const submitBtn = form.querySelector('.submit-complaint-btn');
      const fileInput = document.getElementById('complaint-file');
      
      const formData = new FormData(form);

      const complaint = {
        id: 'CMP-' + Date.now(),
        category: formData.get('complaint-category'),
        subcategory: formData.get('complaint-subcategory'),
        title: formData.get('complaint-title'), // Matches hidden input name in HTML
        description: formData.get('complaint-description'),
        urgency: formData.get('complaint-urgency'),
        documentName: (fileInput && fileInput.files.length) ? fileInput.files[0].name : null,
        status: 'pending',
        date: new Date().toISOString(),
        user: UserSession.getUser()?.name || 'Student'
      };

      const complaints = JSON.parse(localStorage.getItem('faxx_complaints') || '[]');
      complaints.unshift(complaint);
      localStorage.setItem('faxx_complaints', JSON.stringify(complaints));

      if (submitBtn) submitBtn.disabled = true;

      // POST to backend → triggers terminal notification
      try {
        await fetch('/api/complaints', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(complaint)
        });
      } catch (err) {
        console.warn('Backend offline:', err.message);
      }

      // Pop-up notification
      showToast('Your grievances are filled', 'success');

      setTimeout(() => {
        closeComplaintForm();
        if (submitBtn) submitBtn.disabled = false;
      }, 1200);

    } catch (error) {
      showToast('Failed to save complaint', 'error');
    }
  });

  document.getElementById('form-close-btn')?.addEventListener('click', closeComplaintForm);
}