// ===== MOBILE MENU =====
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

if (burger && mobileMenu) {
  // Open menu
  burger.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
    console.log('mobile menu: open');
  });
}

if (mobileClose && mobileMenu) {
  // Close menu
  mobileClose.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    console.log('mobile menu: close');
  });
}

if (mobileMenu) {
  // Close when clicking a link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      console.log('mobile menu: close (link)');
    });
  });
}

/* ---- header: add .scrolled class on scroll ---- */
    const header = document.getElementById('header');
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 55);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ===== CONTACT MODAL =====
    let _contactCache = null;
    async function fetchContact() {
      if (_contactCache) return _contactCache;
      const res = await fetch('/contact.html');
      if (!res.ok) throw new Error('Failed to load contact');
      const text = await res.text();
      _contactCache = text;
      return text;
    }

    function openContactModal(htmlFragment) {
      const overlay = document.createElement('div');
      overlay.className = 'contact-modal';

      const panel = document.createElement('div');
      panel.className = 'contact-modal__panel';
      panel.innerHTML = htmlFragment;

      const closeBtn = document.createElement('button');
      closeBtn.className = 'contact-modal__close';
      closeBtn.setAttribute('aria-label', 'Close contact');
      closeBtn.textContent = '✕';
      panel.appendChild(closeBtn);

      overlay.appendChild(panel);
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';

      function close() {
        if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
        document.body.style.overflow = '';
        document.removeEventListener('keydown', onKey);
      }

      function onKey(e) {
        if (e.key === 'Escape') close();
      }

      closeBtn.addEventListener('click', close);
      overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
      document.addEventListener('keydown', onKey);
    }

    document.querySelectorAll('a[href="contact.html"]').forEach(el => {
      el.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
          const page = await fetchContact();
          const parser = new DOMParser();
          const doc = parser.parseFromString(page, 'text/html');
          const fragment = doc.querySelector('.contact-page') ? doc.querySelector('.contact-page').innerHTML : page;
          openContactModal(fragment);
        } catch (err) {
          console.error('Could not load contact page, navigating instead', err);
          window.location.href = 'contact.html';
        }
      });
    });
