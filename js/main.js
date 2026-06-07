document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Contact form -> opens a pre-filled email to the practitioner
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const phone = form.phone.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        status.textContent = 'Compila i campi obbligatori prima di inviare.';
        return;
      }

      const subject = encodeURIComponent(`Richiesta informazioni da ${name}`);
      const bodyLines = [
        `Nome: ${name}`,
        `Email: ${email}`,
        phone ? `Telefono: ${phone}` : null,
        '',
        message,
      ].filter(Boolean);
      const body = encodeURIComponent(bodyLines.join('\n'));

      window.location.href = `mailto:?subject=${subject}&body=${body}`;
      status.textContent = 'Si aprirà il tuo programma di posta con il messaggio pronto da inviare.';
      form.reset();
    });
  }
});
