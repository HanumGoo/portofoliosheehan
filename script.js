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
const skillCategories = [
  { key: "languages", label: "Programming", title: "Programming languages", description: "Languages for applications, websites, and automation.", icon: "fa-solid fa-code" },
  { key: "web", label: "Websites", title: "Websites & applications", description: "The parts people see, plus the services behind them.", icon: "fa-solid fa-window-maximize" },
  { key: "backend", label: "Apps & data", title: "App platforms & data", description: ".NET and the databases used by applications.", icon: "fa-solid fa-database" },
  { key: "automation", label: "Automation", title: "Automation & spreadsheets", description: "Scripts and spreadsheet tools for repetitive work.", icon: "fa-solid fa-gears" }
];

const skillUseCases = {
  "C#": "Desktop and business applications",
  ".NET": "The platform behind many C# applications",
  "Go / Golang": "Efficient web services and backend tools",
  Python: "Automation and working with data",
  PHP: "Features that run behind a website",
  Laravel: "Building websites with PHP",
  "Entity Framework": "Connecting C# apps to databases",
  MySQL: "A database for website and app data",
  PostgreSQL: "A database for reliable, structured data",
  "SQL Server": "Microsoft's database for business applications",
  "ClosedXML / Excel Automation": "Creating and processing Excel files",
  JavaScript: "Interactive features on websites",
  HTML: "The structure of a web page",
  CSS: "The layout and style of a web page",
  React: "Interactive parts of a website",
  "Node.js": "Running JavaScript for server tasks",
  Express: "Building web services with JavaScript",
  "RPA Logic": "Automating repeatable work steps",
  "PowerShell & Batch": "Automating tasks on Windows"
};

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

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
  target.innerHTML = content.services.map((service, index) => `
    <article class="card service-card reveal reveal--up" style="--reveal-delay:${Math.min(index * 110, 220)}ms">
      <div class="service-card-top"><span class="service-index">0${index + 1}</span><span class="service-icon"><i class="${iconClass(service.icon)}" aria-hidden="true"></i></span></div>
      <h3>${escapeHTML(service.title)}</h3>
      <p>${escapeHTML(service.description)}</p>
      <button class="service-toggle" type="button" aria-expanded="false" aria-controls="service-details-${index}" data-service-title="${escapeHTML(service.title)}" aria-label="See what ${escapeHTML(service.title)} can include">
        <span>What this can include</span><i class="fa-solid fa-arrow-down" aria-hidden="true"></i>
      </button>
      <div class="service-details" id="service-details-${index}" aria-hidden="true" inert>
        <div class="service-details-inner"><ul>${(service.details || []).map((detail) => `<li>${escapeHTML(detail)}</li>`).join("")}</ul></div>
      </div>
    </article>
  `).join("");

  const cards = [...target.querySelectorAll(".service-card")];
  cards.forEach((card) => {
    const button = card.querySelector(".service-toggle");
    const details = card.querySelector(".service-details");
    button.addEventListener("click", () => {
      const opening = button.getAttribute("aria-expanded") !== "true";
      cards.forEach((otherCard) => {
        const otherButton = otherCard.querySelector(".service-toggle");
        const otherDetails = otherCard.querySelector(".service-details");
        const isOpen = otherCard === card && opening;
        otherCard.classList.toggle("is-open", isOpen);
        otherButton.setAttribute("aria-expanded", String(isOpen));
        const title = otherButton.dataset.serviceTitle;
        otherButton.setAttribute("aria-label", isOpen ? `Show less about ${title}` : `See what ${title} can include`);
        otherDetails.setAttribute("aria-hidden", String(!isOpen));
        otherDetails.inert = !isOpen;
      });
    });
    details.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        button.click();
        button.focus();
      }
    });
  });
}

function renderSkills() {
  const target = document.querySelector(selectors.skills);
  if (!target) return;
  const groups = skillCategories.map((category) => ({
    ...category,
    items: content.skills.filter((skill) => (Array.isArray(skill) ? skill[2] : skill.category) === category.key)
  }));
  const totalSkills = groups.reduce((total, group) => total + group.items.length, 0);
  const roleItems = (profile.bestFitRoles || []).map((role) => `<li>${escapeHTML(role)}</li>`).join("");

  target.innerHTML = `
    <div class="toolkit-topline">
      <span>Tools I use</span>
      <span>${totalSkills} tools <i aria-hidden="true">·</i> ${groups.length} areas</span>
    </div>
    <div class="toolkit-main">
      <nav class="toolkit-index" aria-label="Skill categories">
        <p class="toolkit-index-title">Explore by area</p>
        ${groups.map((group, index) => `
          <button type="button" data-skill-nav="${group.key}" aria-current="${index === 0 ? "location" : "false"}">
            <span class="index-marker" aria-hidden="true"></span><span>${escapeHTML(group.label)}</span>
          </button>
        `).join("")}
      </nav>
      <div class="toolkit-content" role="group" aria-label="Tools grouped by what they help build">
        ${groups.map((group, index) => `
          <section class="skill-area reveal reveal--left" id="skill-group-${group.key}" data-skill-group="${group.key}" aria-label="${escapeHTML(group.title)}" style="--reveal-delay:${index * 90}ms">
            <div class="skill-area-heading"><span class="area-icon"><i class="${group.icon}" aria-hidden="true"></i></span><div><h3>${escapeHTML(group.title)}</h3><p>${escapeHTML(group.description)}</p></div></div>
            <ul class="skill-tools">
              ${group.items.map((skill) => {
                const icon = Array.isArray(skill) ? skill[0] : skill.icon;
                const label = Array.isArray(skill) ? skill[1] : skill.label || skill.name;
                const useCase = skillUseCases[label] || group.description;
                return `<li><button class="tool-item" type="button" data-skill-name="${escapeHTML(label)}" aria-pressed="false" aria-label="${escapeHTML(label)}. ${escapeHTML(useCase)}. Select to highlight."><i class="${iconClass(icon)} tool-icon" aria-hidden="true"></i><span class="tool-copy"><strong>${escapeHTML(label)}</strong><small>${escapeHTML(useCase)}</small></span></button></li>`;
              }).join("")}
            </ul>
          </section>
        `).join("")}
      </div>
      <aside class="toolkit-aside">
        <p class="toolkit-aside-label">Where I work best</p>
        <h3>Roles I’m interested in</h3>
        <ul>${roleItems}</ul>
        <p class="toolkit-aside-note">I build desktop apps, websites, and tools that make everyday work easier.</p>
      </aside>
    </div>
  `;

  const skillButtons = [...target.querySelectorAll("[data-skill-name]")];
  skillButtons.forEach((button) => button.addEventListener("click", () => {
    skillButtons.forEach((skillButton) => {
      const selected = skillButton === button;
      skillButton.classList.toggle("is-selected", selected);
      skillButton.setAttribute("aria-pressed", String(selected));
    });
  }));

  const categoryButtons = [...target.querySelectorAll("[data-skill-nav]")];
  categoryButtons.forEach((button) => button.addEventListener("click", () => {
    categoryButtons.forEach((categoryButton) => categoryButton.setAttribute("aria-current", String(categoryButton === button ? "location" : "false")));
    target.querySelector(`#skill-group-${button.dataset.skillNav}`)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" });
  }));
}

function renderExperience() {
  const target = document.querySelector(selectors.experience);
  if (!target) return;
  target.innerHTML = content.experience.map((item, index) => `
    <article class="timeline-item reveal reveal--up" style="--reveal-delay:${Math.min(index * 80, 240)}ms">
      <span class="timeline-date">${item.date}</span>
      <div class="timeline-copy">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    </article>
  `).join("");
}

function projectMedia(project) {
  if (project.image) {
    const image = `<img src="${project.image}" alt="${project.title} project preview" loading="lazy">`;
    return project.link
      ? `<a class="project-media" href="${project.link}" target="_blank" rel="noreferrer">${image}</a>`
      : `<div class="project-media">${image}</div>`;
  }

  return `<span class="card-icon"><i class="${iconClass(project.icon)}"></i></span>`;
}

function renderProjects() {
  const target = document.querySelector(selectors.projects);
  if (!target) return;
  target.innerHTML = content.projects.map((project, index) => `
    <article class="project-card reveal reveal--up" style="--reveal-delay:${Math.min(index * 55, 220)}ms">
      ${projectMedia(project)}
      <div class="project-copy">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
      <ul class="project-tags" aria-label="Technologies used">${(project.tags || []).map((tag) => `<li>${tag}</li>`).join("")}</ul>
      ${project.link ? `<a class="project-link" href="${project.link}" target="_blank" rel="noreferrer">View project <i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ""}
    </article>
  `).join("");
}

function credentialMedia(credential) {
  if (credential.image) {
    const img = `<img src="${credential.image}" alt="${credential.title} credential" loading="lazy">`;
    return credential.link
      ? `<a class="credential-media" href="${credential.link}" target="_blank" rel="noreferrer">${img}</a>`
      : `<div class="credential-media">${img}</div>`;
  }

  return `<span class="card-icon credential-placeholder"><i class="${iconClass(credential.icon)}" aria-hidden="true"></i></span>`;
}

function renderCredentials() {
  const target = document.querySelector(selectors.credentials);
  if (!target) return;
  target.innerHTML = content.credentials.map((credential, index) => `
    <article class="credential-card reveal reveal--up" style="--reveal-delay:${Math.min(index * 65, 195)}ms">
      ${credentialMedia(credential)}
      <div class="credential-copy">
        <span class="credential-date">${credential.date}</span>
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
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });

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

function initThemeToggle() {
  const button = document.querySelector("[data-theme-toggle]");
  const menu = document.querySelector("[data-theme-menu]");
  if (!button || !menu) return;
  const options = [...menu.querySelectorAll("[data-theme-option]")];
  const themeColors = { formal: "#f6f5f1", cool: "#fff7f1", creative: "#10191a" };
  let theme = "formal";
  try {
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (["formal", "cool", "creative"].includes(savedTheme)) theme = savedTheme;
  } catch (_) {}

  const applyTheme = (nextTheme) => {
    if (!["formal", "cool", "creative"].includes(nextTheme)) return;
    theme = nextTheme;
    document.documentElement.dataset.theme = theme;
    options.forEach((option) => option.setAttribute("aria-pressed", String(option.dataset.themeOption === theme)));
    button.setAttribute("aria-label", `Choose portfolio theme. Current theme: ${theme[0].toUpperCase()}${theme.slice(1)}`);
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = themeColors[theme];
    try { localStorage.setItem("portfolio-theme", theme); } catch (_) {}
  };

  const setMenuOpen = (isOpen) => {
    menu.hidden = !isOpen;
    button.setAttribute("aria-expanded", String(isOpen));
  };

  applyTheme(theme);
  button.addEventListener("click", () => setMenuOpen(menu.hidden));
  options.forEach((option) => option.addEventListener("click", () => {
    applyTheme(option.dataset.themeOption);
    setMenuOpen(false);
    button.focus();
  }));
  document.addEventListener("click", (event) => {
    if (!menu.hidden && !menu.contains(event.target) && !button.contains(event.target)) setMenuOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) {
      setMenuOpen(false);
      button.focus();
    }
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
  initThemeToggle();
  const yearElem = document.querySelector("[data-year]");
  if (yearElem) yearElem.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", init);
