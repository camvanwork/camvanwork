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