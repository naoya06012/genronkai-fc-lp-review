/* No personal data is transmitted or persisted in this design preview. */
const form = document.getElementById('request-form');
const discoveryInputs = [...form.querySelectorAll('input[name="discovery-source[]"]')];
const updateDiscoveryValidity = () => {
  const selected = discoveryInputs.some(input => input.checked);
  discoveryInputs[0].setCustomValidity(selected ? '' : 'いずれか1つを選択してください。');
};
discoveryInputs.forEach(input => input.addEventListener('change', updateDiscoveryValidity));
updateDiscoveryValidity();
form.addEventListener('submit', event => {
  event.preventDefault();
  updateDiscoveryValidity();
  if (!form.reportValidity()) return;
  const status = document.getElementById('preview-status');
  status.hidden = false;
  status.textContent = '入力内容を確認しました。このページはデザイン確認用です。情報は送信されていません。';
});
const dialog = document.getElementById('figure-dialog');
if (typeof dialog.showModal === 'function') {
  document.querySelectorAll('[data-zoom]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const image = dialog.querySelector('img');
      image.src = link.href;
      image.alt = link.querySelector('img').alt;
      dialog.showModal();
    });
  });
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
}
