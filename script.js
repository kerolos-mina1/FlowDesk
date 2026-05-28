/* ── Navbar ───────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

/* ── Hamburger ────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
});
document.querySelectorAll('.mlink').forEach(l => l.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
}));

/* ── Scroll Reveal ────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), idx * 90);
        io.unobserve(entry.target);
    });
}, { threshold: .08, rootMargin: '0px 0px -48px 0px' });
revealEls.forEach(el => io.observe(el));

/* ── Active nav ───────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
    navLinks.forEach(l => { l.style.color = l.getAttribute('href') === '#' + current ? 'var(--purple-pale)' : ''; });
}, { passive: true });

/* ── Pricing Toggle ───────────────────────────────── */
const pricingToggle = document.getElementById('pricingToggle');
const lblMo = document.getElementById('lbl-mo');
const lblYr = document.getElementById('lbl-yr');
let yearly = false;

const moOriginals = [null, '$19/mo', '$49/mo'];

function updatePricing() {
    document.querySelectorAll('.price-num').forEach((el, i) => {
        el.textContent = yearly ? el.dataset.yr : el.dataset.mo;
    });
    // show original prices when yearly
    ['orig-0', 'orig-1', 'orig-2'].forEach((id, i) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = yearly && moOriginals[i] ? moOriginals[i] : '\u00a0';
    });
    lblMo.classList.toggle('on', !yearly);
    lblYr.classList.toggle('on', yearly);
    pricingToggle.classList.toggle('active', yearly);
    pricingToggle.setAttribute('aria-checked', yearly);
}

pricingToggle.addEventListener('click', () => { yearly = !yearly; updatePricing(); });
pricingToggle.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); yearly = !yearly; updatePricing(); }
});

/* ── FAQ Accordion ────────────────────────────────── */
document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
        const item = q.parentElement;
        const isOpen = item.classList.contains('open');
        // close all
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
    });
});

/* ── CTA Form ─────────────────────────────────────── */
document.getElementById('ctaBtn').addEventListener('click', () => {
    const email = document.getElementById('ctaEmail').value.trim();
    if (!email || !email.includes('@')) {
        document.getElementById('ctaEmail').style.outline = '2px solid #f87171';
        return;
    }
    const btn = document.getElementById('ctaBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';
    setTimeout(() => {
        document.querySelector('.cta-form').style.display = 'none';
        document.getElementById('ctaOk').classList.add('show');
    }, 1400);
});
document.getElementById('ctaEmail').addEventListener('input', function () {
    this.style.outline = 'none';
});