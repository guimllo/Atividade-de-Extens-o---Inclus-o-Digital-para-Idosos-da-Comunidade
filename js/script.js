
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));


const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('ativo'));
      const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (link) link.classList.add('ativo');
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));


// ── ANIMAÇÃO DOS CONTADORES ──
function animarContador(elemento, destino, sufixo = '', duracao = 1500) {
  let inicio = 0;
  const passo = destino / (duracao / 16);

  const timer = setInterval(() => {
    inicio += passo;
    if (inicio >= destino) {
      elemento.textContent = destino + sufixo;
      clearInterval(timer);
    } else {
      elemento.textContent = Math.floor(inicio) + sufixo;
    }
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numeros = entry.target.querySelectorAll('.stat-num');
      numeros.forEach(num => {
        const valor = num.getAttribute('data-valor');
        const sufixo = num.getAttribute('data-sufixo') || '';
        animarContador(num, parseInt(valor), sufixo);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) statsObserver.observe(statsSection);
