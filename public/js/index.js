document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('loginForm');
  const errorDiv = document.getElementById('loginError');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    errorDiv.textContent = '';
    try {
      const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        window.location.href = '/index.html';
      } else {
        const data = await res.json();
        errorDiv.textContent = data.error || 'Login failed.';
      }
    } catch (err) {
      errorDiv.textContent = 'Network error.';
    }
  });
});
