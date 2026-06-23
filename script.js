const sideMenu = document.querySelector('#sideMenu');
const navBar = document.querySelector('nav');
const navLinks = document.querySelector('nav ul');

function openMenu(){
  if (!sideMenu) return;
  sideMenu.style.right = '0';
  sideMenu.setAttribute('aria-hidden','false');
}
function closeMenu(){
  if (!sideMenu) return;
  sideMenu.style.right = '-16rem';
  sideMenu.setAttribute('aria-hidden','true');
}

window.addEventListener('scroll', ()=>{
  if (!navBar) return;
  if (window.scrollY > 50){
    navBar.classList.add('bg-white', 'bg-opacity-50','backdrop-blur-lg','shadow-sm');
    if (navLinks) navLinks.classList.remove('bg-white','shadow-sm','bg-opacity-50');
  } else {
    navBar.classList.remove('bg-white', 'bg-opacity-50','backdrop-blur-lg','shadow-sm');
    if (navLinks) navLinks.classList.add('bg-white','shadow-sm','bg-opacity-50');
  }
});

// Theme toggle (dark/light) with persistence and accessibility
const themeToggle = document.getElementById('themeToggle');
function applyTheme(theme){
  if(theme === 'dark') document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
  if(themeToggle) themeToggle.setAttribute('aria-pressed', theme === 'dark');
}
const savedTheme = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(savedTheme);
if(themeToggle) themeToggle.addEventListener('click', ()=>{
  const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

// Close side menu with Escape key for accessibility
window.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape') closeMenu();
});

// Resume generation using jsPDF with basic error message
async function generateResumePDF(){
  try{
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({unit:'pt', format:'a4'});
    const left = 40; let y = 40;
    doc.setFontSize(20); doc.setFont('helvetica','bold');
    doc.text('Jyothsna Yadav', left, y);
    doc.setFontSize(12); doc.setFont('helvetica','normal');
    doc.text('Frontend Web Developer', left, y+24);
    y += 60;
    doc.setFontSize(13); doc.setFont('helvetica','bold'); doc.text('Technical Skills', left, y);
    doc.setFontSize(11); doc.setFont('helvetica','normal');
    doc.text('HTML, CSS, JavaScript, Python, Streamlit, Git, SQL, OpenAI API, VS Code', left, y+18);
    y += 48;
    doc.setFontSize(13); doc.setFont('helvetica','bold'); doc.text('Education', left, y);
    doc.setFontSize(11); doc.setFont('helvetica','normal'); doc.text('BCA - Bachelor Of Computer Application', left, y+18);
    y += 48;
    doc.setFontSize(13); doc.setFont('helvetica','bold'); doc.text('Internship Experience', left, y);
    doc.setFontSize(11); doc.setFont('helvetica','normal'); doc.text('Internship details / role (add specifics)', left, y+18);
    y += 48;
    doc.setFontSize(13); doc.setFont('helvetica','bold'); doc.text('Projects', left, y);
    doc.setFontSize(11); doc.setFont('helvetica','normal');
    doc.text('- Portfolio Website', left, y+18);
    doc.text('- Mini Invoice Generator', left, y+36);
    doc.text('- Analytics Project', left, y+54);
    y += 110;
    doc.setFontSize(12); doc.setFont('helvetica','bold'); doc.text('Links', left, y);
    doc.setFontSize(11); doc.setFont('helvetica','normal');
    doc.text('GitHub: https://github.com/jyothsnaayadav-tech', left, y+18);
    doc.text('LinkedIn: https://www.linkedin.com/in/jyothsnayadav', left, y+36);
    y += 60;
    doc.setFontSize(11); doc.text('Contact: jyothsnayadav050706@gmail.com', left, y);
    doc.save('Jyothsna_Yadav_Resume.pdf');
  }catch(e){
    console.error('Resume generation failed', e);
    alert('Unable to generate resume PDF in this browser. Please use the resume link or try a different browser.');
  }
}

const resumeBtn = document.getElementById('resumeBtn');
if(resumeBtn) resumeBtn.addEventListener('click', (e)=>{ e.preventDefault(); generateResumePDF(); });

// Contact form handling — mailto fallback and client validation
const contactForm = document.getElementById('contactForm');
const contactMessage = document.getElementById('contactMessage');
if(contactForm){
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const message = (data.get('message') || '').toString().trim();
    if(!name || !email || !message){
      contactMessage.textContent = 'Please complete all fields before submitting.';
      contactMessage.className = 'text-center mt-4 text-sm text-red-600';
      return;
    }
    // Try to open mail client with prefilled content as a fallback
    const subject = encodeURIComponent('Portfolio contact from ' + name);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    const mailto = `mailto:jyothsnayadav050706@gmail.com?subject=${subject}&body=${body}`;
    // show success message and open mailto
    contactMessage.textContent = 'Preparing mail client...';
    contactMessage.className = 'text-center mt-4 text-sm text-green-600';
    window.location.href = mailto;
    // Reset form after slight delay
    setTimeout(()=>{ form.reset(); contactMessage.textContent = 'Thanks — your message is ready to send via email client.'; }, 800);
  });
}

// Ensure contact button smooth scroll works for JS-triggered clicks
const contactBtn = document.getElementById('contactBtn');
if(contactBtn) contactBtn.addEventListener('click', (e)=>{ /* anchor already navigates via href */ });
