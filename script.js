const menuToggle=document.querySelector('.menu-toggle');
const navLinks=document.querySelector('.nav-links');
if(menuToggle&&navLinks){menuToggle.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Đóng menu':'Mở menu')});navLinks.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{navLinks.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Mở menu')}))}

// Put the personal introduction immediately after the hero/proof area.
const about=document.querySelector('#about');
const work=document.querySelector('#work');
if(about&&work){work.parentNode.insertBefore(about,work)}

const revealItems=document.querySelectorAll('.case-card,.approach-item,.timeline article,.tools-grid>div,.background-grid>div');
revealItems.forEach(item=>item.classList.add('reveal'));
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}})},{threshold:.12});revealItems.forEach(item=>observer.observe(item))}else{revealItems.forEach(item=>item.classList.add('is-visible'))}

// One-click English translation.
// The button opens Google's translated view of the current page directly,
// so visitors do not see Google's translation toolbar or have to choose a language manually.
(function(){
  const nav=document.querySelector('.nav');
  if(!nav||document.querySelector('.language-switcher')) return;

  const style=document.createElement('style');
  style.textContent=`
    .language-switcher{display:flex;align-items:center;margin-left:10px;position:relative;z-index:30}
    .language-switcher button{appearance:none;border:1px solid rgba(23,23,23,.14);background:#fffdf8;color:#171717;border-radius:999px;padding:8px 12px;display:inline-flex;align-items:center;gap:7px;font-size:12px;font-weight:800;line-height:1;cursor:pointer;transition:opacity .2s,transform .2s}
    .language-switcher button:hover{opacity:.7;transform:translateY(-1px)}
    .language-switcher .flag{font-size:15px;line-height:1}
    @media(max-width:850px){.language-switcher{margin-left:auto;margin-right:8px}.language-switcher button{padding:8px 10px}}
  `;
  document.head.appendChild(style);

  const wrap=document.createElement('div');
  wrap.className='language-switcher';
  wrap.innerHTML='<button type="button" aria-label="Translate website to English" title="Translate to English"><span class="flag">🇺🇸</span><span>EN</span></button>';
  nav.insertBefore(wrap,menuToggle||null);

  const button=wrap.querySelector('button');
  button.addEventListener('click',()=>{
    const target='https://translate.google.com/translate?sl=vi&tl=en&u='+encodeURIComponent(window.location.href);
    window.location.href=target;
  });
})();