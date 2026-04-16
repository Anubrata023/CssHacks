/* ============================================
   FAXX - Login JavaScript (In-Memory OTP Flow)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initLoginForm();
  initPasswordToggle();
});

let otpTimerInterval;
let registeredEmail = '';

function initLoginForm() {
  const form = document.getElementById('login-form');
  if (!form) return;

  const userType = form.dataset.userType; // 'student' or 'admin'

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate all required fields
    const requiredInputs = form.querySelectorAll('[required]');
    requiredInputs.forEach(input => {
      const group = input.closest('.input-group');
      if (!input.value.trim()) {
        group.classList.add('has-error');
        input.classList.add('error');
        isValid = false;
      } else {
        group.classList.remove('has-error');
        input.classList.remove('error');
      }
    });

    if (!isValid) {
      showToast('Please fill all fields correctly', 'error');
      return;
    }

    // Build user data
    const userData = {
      name: form.querySelector('#name').value.trim(),
      email: form.querySelector('#email').value.trim(),
      department: form.querySelector('#department') ? form.querySelector('#department').value : '',
      password: form.querySelector('#password').value,
      type: userType
    };

    if (userType === 'student') {
      userData.scholarId = form.querySelector('#scholarId').value.trim();
    } else {
      userData.employeeId = form.querySelector('#employeeId') ? form.querySelector('#employeeId').value.trim() : '';
    }

    registeredEmail = userData.email;

    try {
      const submitBtn = form.querySelector('.login-submit');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending OTP...';
      submitBtn.disabled = true;

      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok) {
        showToast('Check terminal for OTP', 'success');
        showOtpModal();
      } else {
        showToast(data.message || 'Login failed', 'error');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    } catch (err) {
      showToast('Network Error. Is the server running?', 'error');
      const submitBtn = form.querySelector('.login-submit');
      submitBtn.textContent = 'Sign In';
      submitBtn.disabled = false;
    }
  });

  // Clear errors on input
  form.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('input', () => {
      const group = input.closest('.input-group');
      if (group) {
        group.classList.remove('has-error');
        input.classList.remove('error');
      }
    });
  });

  initOtpForm();
}

function initOtpForm() {
  const otpForm = document.getElementById('otp-form');
  if (!otpForm) return;

  otpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const otpInput = document.getElementById('otp-input').value;
    const errorMsg = document.getElementById('otp-error');
    const verifyBtn = document.getElementById('otp-verify-btn');

    verifyBtn.textContent = 'Verifying...';
    verifyBtn.disabled = true;
    errorMsg.textContent = '';

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: registeredEmail, otp: otpInput })
      });

      const data = await response.json();

      if (response.ok) {
        // Save JWT token
        localStorage.setItem('faxx_token', data.token);
        // Save user session for profile UI compatibility
        UserSession.save(data.user);

        clearInterval(otpTimerInterval);
        showToast('Login Successful! 🎉', 'success');
        window.location.href = 'profile.html';

      } else if (response.status === 403) {
        verifyBtn.textContent = 'Verify';
        verifyBtn.disabled = false;

        if (data.locked) {
          // Expired or 3 failed attempts → hard redirect
          clearInterval(otpTimerInterval);
          alert('OTP Expired!');
          window.location.href = 'index.html';
        } else {
          // Wrong code but still has attempts left
          errorMsg.textContent = data.message;
          document.getElementById('otp-input').value = '';
          document.getElementById('otp-input').focus();
        }

      } else {
        verifyBtn.textContent = 'Verify';
        verifyBtn.disabled = false;
        errorMsg.textContent = data.message || 'Verification Error';
      }
    } catch (err) {
      verifyBtn.textContent = 'Verify';
      verifyBtn.disabled = false;
      errorMsg.textContent = 'Network error verifying OTP';
    }
  });
}

function showOtpModal() {
  const overlay = document.getElementById('otp-overlay');
  const timerDisplay = document.getElementById('otp-timer');
  if (!overlay) return;

  // Unhide the overlay
  overlay.style.display = 'flex';

  // Start 30-second countdown
  let timeLeft = 30;
  timerDisplay.textContent = timeLeft + 's';

  otpTimerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft + 's';
    if (timeLeft <= 0) {
      clearInterval(otpTimerInterval);
      alert('OTP Expired!');
      window.location.href = 'index.html';
    }
  }, 1000);
}

function initPasswordToggle() {
  const toggle = document.querySelector('.password-toggle');
  const passwordInput = document.querySelector('#password');

  if (!toggle || !passwordInput) return;

  toggle.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggle.textContent = '🙈';
    } else {
      passwordInput.type = 'password';
      toggle.textContent = '👁️';
    }
  });
}
