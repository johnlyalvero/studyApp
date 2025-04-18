// utils.js
// Utility functions for the frontend

// ✅ Parse a date in DD/MM or DD/MM/YYYY format to YYYY-MM-DD
function parseDate(dateStr) {
  const parts = dateStr.split('/');
  const day = parseInt(parts[0]);
  const month = parseInt(parts[1]) - 1;
  const year = parts[2] ? parseInt(parts[2]) : new Date().getFullYear();
  return new Date(year, month, day).toISOString().split("T")[0];
}

// ✅ Reusable fetch POST call
function postData(url, data) {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());
}