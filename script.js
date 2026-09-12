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

// Google Translate: a compact English-only switcher.
(function(){
  const nav=document.querySelector('.nav');
  if(!nav||document.querySelector('.language-switcher')) return;

  const style=document.createElement('style');
  style.textContent=`
    .language-switcher{display:flex;align-items:center;margin-left:10px;position:relative;z-index:30}
    .language-switcher button{appearance:none;border:1px solid rgba(23,23,23,.14);background:#fffdf8;color:#171717;border-radius:999px;padding:8px 12px;display:inline-flex;align-items:center;gap:7px;font-size:12px;font-weight:800;line-height:1;cursor:pointer;transition:opacity .2s,transform .2s}
    .language-switcher button:hover{opacity:.7;transform:translateY(-1px)}
    .language-switcher .flag{font-size:15px;line-height:1}
    #google_translate_element{position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;opacity:0!important;pointer-events:none!important;left:-9999px!important;top:-9999px!important}
    .goog-te-banner-frame.skiptranslate{display:none!important}
    body{top:0!important}
    .goog-te-gadget{font-size:0!important}
    .goog-te-gadget>*{display:none!important}
    @media(max-width:850px){.language-switcher{margin-left:auto;margin-right:8px}.language-switcher button{padding:8px 10px}}
  `;
  document.head.appendChild(style);

  const wrap=document.createElement('div');
  wrap.className='language-switcher';
  wrap.innerHTML='<button type="button" aria-label="Translate website to English" title="Translate to English"><span class="flag">🇺🇸</span><span>EN</span></button><div id="google_translate_element" aria-hidden="true"></div>';
  nav.insertBefore(wrap,menuToggle||null);

  window.googleTranslateElementInit=function(){
    if(window.google&&google.translate&&google.translate.TranslateElement){
      new google.translate.TranslateElement({pageLanguage:'vi',includedLanguages:'en',autoDisplay:false,layout:google.translate.TranslateElement.InlineLayout.SIMPLE},'google_translate_element');
    }
  };

  const googleScript=document.createElement('script');
  googleScript.src='https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  googleScript.async=true;
  document.head.appendChild(googleScript);

  const button=wrap.querySelector('button');
  button.addEventListener('click',()=>{
    const chooseEnglish=()=>{
      const select=document.querySelector('.goog-te-combo');
      if(select){select.value='en';select.dispatchEvent(new Event('change'));return true}
      return false;
    };
    if(!chooseEnglish()){
      let attempts=0;
      const timer=setInterval(()=>{attempts++;if(chooseEnglish()||attempts>20)clearInterval(timer)},250);
    }
  });
})();