document.addEventListener('DOMContentLoaded', async function () {
  try {
    const response = await fetch('orientation-warning.htm');
    if (!response.ok) throw new Error('Failed to load orientation-warning.htm');

    const html = await response.text();
    const target = document.getElementById('orientation-warning-container');

    if (target) {
      target.innerHTML = html;
    }
  } catch (error) {
    console.error(error);
  }
});