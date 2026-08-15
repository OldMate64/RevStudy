
let tooltips = {};
let currentHighlight = null;

fetch('tooltips_introApocalypse.json')
  .then(response => response.json())
  .then(data => {
    tooltips = data;
  })
  .catch(err => {
    console.error('Failed to load tooltips.json:', err);
  });

  function getTooltipHtml(key) {
  const value = tooltips[key];
  if (Array.isArray(value)) {
    return value.join('');
  }
  return value || '';
  }

  function showTooltip(html) {
  const panel = document.getElementById('comment-panel');
  panel.innerHTML = `<div class="tooltip"><div class="tooltip-content">${html}</div></div>`;
  const tooltip = panel.querySelector('.tooltip');
  tooltip.offsetHeight;
  tooltip.classList.add('fade-in');
}

function hideTooltip() {
  const panel = document.getElementById('comment-panel');
  const tooltip = panel.querySelector('.tooltip');
  if (!tooltip) return;
  tooltip.classList.remove('fade-in');
  tooltip.addEventListener('transitionend', function handler() {
    panel.innerHTML = '<div class="no-commentary">Select or tap highlighted words for comments</div>';
    tooltip.removeEventListener('transitionend', handler);
  });
}

document.addEventListener('click', function (e) {
  const inner = e.target.closest('.inner-highlight');
  if (inner) {
    e.preventDefault();
    e.stopPropagation();
    const key = inner.getAttribute('data-inner');
    showTooltip(getTooltipHtml(key));
    return;
  }

  const outer = e.target.closest('.highlight');
  if (outer) {
    e.preventDefault();
    e.stopPropagation();
    const key = outer.getAttribute('data-tooltip');
    showTooltip(getTooltipHtml(key));
    return;
  }

  if (!e.target.closest('.tooltip')) {
    hideTooltip();
    currentHighlight = null;
  }

});
