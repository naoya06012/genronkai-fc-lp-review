/* Mobile action is absent in the hero, contact form and footer, or by another CTA. */
(() => {
  const bar = document.getElementById('mobile-action');
  const hero = document.querySelector('.hero');
  const contact = document.getElementById('contact');
  const near = new Set();
  const query = matchMedia('(max-width:600px)');
  function update() {
    const pastHero = hero.getBoundingClientRect().bottom <= 0;
    const beforeContact = contact.getBoundingClientRect().top > innerHeight;
    const typing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName);
    bar.hidden = !query.matches || !pastHero || !beforeContact || near.size > 0 || typing;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting ? near.add(entry.target) : near.delete(entry.target));
    update();
  }, {rootMargin:'0px 0px 96px 0px'});
  document.querySelectorAll('main a.btn, main button.btn').forEach(button => observer.observe(button));
  let scheduled=false;
  addEventListener('scroll', () => {
    if(scheduled)return;
    scheduled=true;
    requestAnimationFrame(() => {scheduled=false;update();});
  }, {passive:true});
  addEventListener('resize', update);
  document.addEventListener('focusin', update);
  document.addEventListener('focusout', update);
  query.addEventListener('change',update);
  update();
})();
