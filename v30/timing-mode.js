/* September/October 2026 campaign only. Default to evergreen outside this window. */
(() => {
  const parts = new Intl.DateTimeFormat('en', {timeZone:'Asia/Tokyo', year:'numeric', month:'numeric'}).formatToParts(new Date());
  const year = Number(parts.find(p => p.type === 'year').value);
  const month = Number(parts.find(p => p.type === 'month').value);
  const previewFlow = new URLSearchParams(location.search).get('timing') === 'flow';
  const seasonal = year === 2026 && (month === 9 || month === 10) && !previewFlow;
  const template = document.getElementById('timing-flow-template');
  if (!seasonal && template) {
    const section = document.getElementById('timing');
    if (section) section.replaceWith(template.content.cloneNode(true));
  }
  document.documentElement.dataset.timingMode = seasonal ? 'seasonal' : 'flow';
  if (template) template.remove();
})();
