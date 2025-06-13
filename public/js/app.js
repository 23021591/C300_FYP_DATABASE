document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('searchForm');
  const resultsDiv = document.getElementById('results');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const q = document.getElementById('searchInput').value;
    resultsDiv.innerHTML = 'Searching...';
    try {
      const res = await fetch(`/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (data.length === 0) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
      } else {
        let html = '<table><tr><th>ID</th><th>Name</th><th>Diagnosis</th><th>Room</th></tr>';
        data.forEach(row => {
          html += `<tr><td>${row.id}</td><td>${row.name}</td><td>${row.diagnosis}</td><td>${row.room}</td></tr>`;
        });
        html += '</table>';
        resultsDiv.innerHTML = html;
      }
    } catch (err) {
      resultsDiv.innerHTML = '<p style="color:red">Error fetching results.</p>';
    }
  });
});
