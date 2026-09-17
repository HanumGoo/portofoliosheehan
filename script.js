/**
 * ====================================================================
 * PORTFOLIO APPLICATION LOGIC
 * ====================================================================
 * Reads from window.portfolioConfig (config.js) and hydrates the DOM.
 */

const config = window.portfolioConfig || {};
const profile = config.profile || {};
const content = {
  services: config.services || [],
  skills: config.skills || [],
  experience: config.experience || [],
  projects: config.projects || [],
  credentials: config.credentials || []
};

const selectors = {
  services: '[data-render="services"]',
  skills: '[data-render="skills"]',
  experience: '[data-render="experience"]',
  projects: '[data-render="projects"]',
  credentials: '[data-render="credentials"]'
};

const iconFallback = "fa-solid fa-layer-group";
const iconClass = (icon) => icon || iconFallback;

/**
 * Hydrate profile, hero, brand, social links, metrics, and best-fit roles
 */
function renderProfile() {
  if (!profile) return;

  // Header Brand
  const brandMark = document.querySelector('[data-bind="brandMark"]');
  if (brandMark && profile.initials) brandMark.textContent = profile.initials;

  const brandName = document.querySelector('[data-bind="brandName"]');
  if (brandName && profile.name) brandName.textContent = profile.name;

  const brandRole = document.querySelector('[data-bind="brandRole"]');
  if (brandRole && profile.role) brandRole.textContent = profile.role;

  // Hero Copy
  const heroEyebrow = document.querySelector('[data-bind="heroEyebrow"]');
  if (heroEyebrow && profile.eyebrow) heroEyebrow.textContent = profile.eyebrow;

  const heroName = document.querySelector('[data-bind="heroName"]');
  if (heroName && profile.name) heroName.textContent = profile.name;

  const heroRole = document.querySelector('[data-bind="heroRole"]');
  if (heroRole && profile.role) heroRole.textContent = profile.role;

  const heroSummary = document.querySelector('[data-bind="heroSummary"]');
  if (heroSummary && profile.summary) heroSummary.innerHTML = `<i>${profile.summary}</i>`;

  // Hero Actions
  const contactBtn = document.querySelector('[data-bind="heroContactBtn"]');
  if (contactBtn && profile.email) contactBtn.setAttribute("href", `mailto:${profile.email}`);

  const resumeBtn = document.querySelector('[data-bind="heroResumeBtn"]');
  if (resumeBtn && profile.resumeUrl) resumeBtn.setAttribute("href", profile.resumeUrl);

  // Social Links
  const socialsContainer = document.querySelector('[data-render="socials"]');
  if (socialsContainer && profile.socials) {
    socialsContainer.innerHTML = profile.socials.map((social) => `
      <a href="${social.url}" target="_blank" rel="noreferrer" aria-label="${social.platform}">
        <i class="${social.icon}"></i>
      </a>
    `).join("");
  }

  // Hero Portrait Image
  const portraitFrame = document.querySelector('[data-render="portrait"]');
  if (portraitFrame && profile.avatar) {
    portraitFrame.innerHTML = `<img src="${profile.avatar}" alt="Portrait of ${profile.name || 'Sheehan Andya'}">`;
  }

  // Hero Status / Core Focus Card
  const statusCard = document.querySelector('[data-render="statusCard"]');
  if (statusCard && profile.statusCard) {
    statusCard.innerHTML = `
      <span class="status-dot"></span>
      <div>
        <strong>${profile.statusCard.title}</strong>
        <p>${profile.statusCard.description}</p>
      </div>
    `;
  }

  // Hero Metrics Strip
  const metricsStrip = document.querySelector('[data-render="metrics"]');
  if (metricsStrip && profile.metrics) {
    metricsStrip.innerHTML = profile.metrics.map((m) => `
      <div><strong>${m.value}</strong><span>${m.label}</span></div>
    `).join("");
  }

  // Intro Band Summary
  const introBand = document.querySelector('[data-render="introBand"]');
  if (introBand && profile.introBand) {
    introBand.innerHTML = `<p>${profile.introBand}</p>`;
  }

  // Best Fit Roles Panel
  const bestFitContainer = document.querySelector('[data-render="bestFitRoles"]');
  if (bestFitContainer && profile.bestFitRoles) {
    bestFitContainer.innerHTML = profile.bestFitRoles.map((role) => `<li>${role}</li>`).join("");
  }

  // Contact Links Panel
  const contactLinksContainer = document.querySelector('[data-render="contactLinks"]');
  if (contactLinksContainer) {
    const links = [];
    if (profile.email) {
      links.push(`<a href="mailto:${profile.email}"><i class="fa-solid fa-envelope"></i> ${profile.email}</a>`);
    }
    if (profile.socials) {
      profile.socials.forEach((s) => {
        const platformLower = s.platform.toLowerCase();
        if (platformLower === "whatsapp" || platformLower === "linkedin") {
          links.push(`<a href="${s.url}" target="_blank" rel="noreferrer"><i class="${s.icon}"></i> ${s.platform}</a>`);
        }
      });
    }
    if (links.length > 0) {
      contactLinksContainer.innerHTML = links.join("");
    }
  }

  // Footer Copyright Name
  const copyrightName = document.querySelector('[data-bind="copyrightName"]');
  if (copyrightName && profile.name) {
    copyrightName.textContent = profile.name;
  }
}

function renderServices() {
  const target = document.querySelector(selectors.services);
  if (!target) return;
  target.innerHTML = content.services.map((service) => `
    <article class="card reveal">
      <span class="card-icon"><i class="${iconClass(service.icon)}"></i></span>
      <h3>${service.title}</h3>
      <p>${service.description}</p>
    </article>
  `).join("");
}

function renderSkills() {
  const target = document.querySelector(selectors.skills);
  if (!target) return;
  target.innerHTML = content.skills.map((skill) => {
    const icon = Array.isArray(skill) ? skill[0] : skill.icon;
    const label = Array.isArray(skill) ? skill[1] : skill.label || skill.name;
    return `<span class="skill-pill"><i class="${icon}"></i>${label}</span>`;
  }).join("");
}

function renderExperience() {
  const target = document.querySelector(selectors.experience);
  if (!target) return;
  target.innerHTML = content.experience.map((item) => `
    <article class="timeline-item reveal">
      <span class="timeline-date">${item.date}</span>
      <div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    </article>
  `).join("");
}

function projectMedia(project) {
  if (project.image) {
    const image = `<img src="${project.image}" alt="${project.title} preview">`;
    return project.link
      ? `<a class="project-media" href="${project.link}" target="_blank" rel="noreferrer">${image}</a>`
      : `<div class="project-media">${image}</div>`;
  }

  return `<span class="card-icon"><i class="${iconClass(project.icon)}"></i></span>`;
}

function renderProjects() {
  const target = document.querySelector(selectors.projects);
  if (!target) return;
  target.innerHTML = content.projects.map((project) => `
    <article class="project-card reveal">
      ${projectMedia(project)}
      <div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
      <div class="project-tags">${(project.tags || []).map((tag) => `<span>${tag}</span>`).join("")}</div>
      ${project.link ? `<a class="project-link" href="${project.link}" target="_blank" rel="noreferrer">View project <i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ""}
    </article>
  `).join("");
}

function credentialMedia(credential) {
  if (credential.image) {
    const img = `<img src="${credential.image}" alt="${credential.title} credential">`;
    return credential.link
      ? `<a href="${credential.link}" target="_blank" rel="noreferrer">${img}</a>`
      : `<div>${img}</div>`;
  }

  return `<span class="card-icon"><i class="${iconClass(credential.icon)}"></i></span>`;
}

function renderCredentials() {
  const target = document.querySelector(selectors.credentials);
  if (!target) return;
  target.innerHTML = content.credentials.map((credential) => `
    <article class="credential-card reveal">
      ${credentialMedia(credential)}
      <span class="credential-date">${credential.date}</span>
      <div>
        <h3>${credential.title}</h3>
        <p>${credential.description}</p>
      </div>
      ${credential.link ? `<a class="credential-link" href="${credential.link}" target="_blank" rel="noreferrer">Open credential <i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ""}
    </article>
  `).join("");
}

function initNavigation() {
  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const links = [...document.querySelectorAll(".site-nav a")];
  const sections = links.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);

  if (!header || !nav || !toggle) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    document.body.classList.toggle("nav-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach((section) => observer.observe(section));
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

function initReveal() {
  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => observer.observe(item));
}

function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get("name");
    const email = data.get("email");
    const message = data.get("message");
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
    const targetEmail = profile.email || "sheehanandya001@gmail.com";
    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
  });
}

function init() {
  renderProfile();
  renderServices();
  renderSkills();
  renderExperience();
  renderProjects();
  renderCredentials();
  initNavigation();
  initReveal();
  initContactForm();
  const yearElem = document.querySelector("[data-year]");
  if (yearElem) yearElem.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", init);
