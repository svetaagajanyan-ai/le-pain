// Бургер-меню
const burger = document.getElementById('burger');
const overlay = document.getElementById('overlay');
const closeMenu = document.getElementById('closeMenu');

burger.addEventListener('click', () => overlay.classList.add('open'));
closeMenu.addEventListener('click', () => overlay.classList.remove('open'));

// Закрытие меню при клике на любую ссылку внутри него
overlay.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => overlay.classList.remove('open'));
});

// Плавное появление блоков при скролле
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Схема карты — зум
let zoomLevel = 1;
const mapBlocks = document.getElementById('mapBlocks');

document.getElementById('zin').addEventListener('click', () => {
  zoomLevel = Math.min(zoomLevel + 0.2, 1.6);
  mapBlocks.style.transform = `scale(${zoomLevel})`;
});

document.getElementById('zout').addEventListener('click', () => {
  zoomLevel = Math.max(zoomLevel - 0.2, 0.8);
  mapBlocks.style.transform = `scale(${zoomLevel})`;
});

// Маска ввода телефона
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', () => {
  let digits = phoneInput.value.replace(/\D/g, '').slice(0, 11);
  if (digits.startsWith('8')) digits = '7' + digits.slice(1);
  if (!digits.startsWith('7')) digits = '7' + digits;
  
  let formatted = '+7';
  if (digits.length > 1) formatted += ' (' + digits.slice(1, 4);
  if (digits.length >= 5) formatted += ') ' + digits.slice(4, 7);
  if (digits.length >= 8) formatted += '-' + digits.slice(7, 9);
  if (digits.length >= 10) formatted += '-' + digits.slice(9, 11);
  
  phoneInput.value = formatted;
});

// Отправка формы предзаказа
document.getElementById('orderForm').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('formOk').style.display = 'block';
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Отправлено ✓';
  btn.disabled = true;
});

// Отправка формы подписки
document.getElementById('newsForm').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('newsNote').textContent = 'Готово! Первое письмо прилетит уже завтра утром. ☕';
  document.getElementById('newsNote').style.color = '#a8d5a2';
  e.target.reset();
});
