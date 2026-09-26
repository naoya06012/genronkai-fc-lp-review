/* No personal data is transmitted or persisted in this design preview. */
/* v30: フォームは Contact Form 7（ショートコード）に置き換えたので、ダミーフォーム用の処理は削除 */
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
