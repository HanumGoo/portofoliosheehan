(() => {
  const config = window.portfolioConfig || {};
  const profile = config.profile || {};
  const esc = (value = "") => String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
  const setText = (selector, value) => document.querySelectorAll(selector).forEach((element) => { element.textContent = value || ""; });
  const byCategory = [
    { key: "languages", title: "Languages", icon: "fa-solid fa-code" },
    { key: "web", title: "Websites & apps", icon: "fa-solid fa-window-maximize" },
    { key: "backend", title: "App platforms & data", icon: "fa-solid fa-database" },
    { key: "automation", title: "Automation & tools", icon: "fa-solid fa-gears" }
  ];

  function renderProfile() {
    setText("[data-name]", profile.name || "Sheehan Andya");
    const [firstName = "Sheehan", ...lastNames] = (profile.name || "Sheehan Andya").split(" ");
    setText("[data-first]", firstName);
    setText("[data-last]", lastNames.join(" "));
    setText("[data-role]", profile.role || "Desktop App & Web Developer");
    setText("[data-eyebrow]", "Open to developer roles");
    setText("[data-summary]", "I build desktop apps and web tools, mostly with C#/.NET. Lately, I’ve been adding Go and Python to the mix.");
    setText("[data-focus]", "Most at home with C#, .NET, automation, and data-heavy tools.");
    document.querySelectorAll("[data-avatar]").forEach((image) => { image.src = profile.avatar || "./mainSecond3.png"; });
    const email = profile.email || "sheehanandya001@gmail.com";
    document.querySelectorAll("[data-email]").forEach((link) => { link.href = `mailto:${email}`; });
    const socials = profile.socials || [];
    const heroSocials = document.querySelector("[data-socials]");
    if (heroSocials) heroSocials.innerHTML = socials.map((social) => `<a href="${esc(social.url)}" target="_blank" rel="noreferrer" aria-label="${esc(social.platform)}"><i class="${esc(social.icon)}" aria-hidden="true"></i></a>`).join("");
    const contactLinks = document.querySelector("[data-contact-links]");
    if (contactLinks) {
      const links = [`<a href="mailto:${esc(email)}"><i class="fa-solid fa-envelope" aria-hidden="true"></i>${esc(email)}</a>`];
      socials.filter((social) => ["linkedin", "github", "whatsapp"].includes(social.platform.toLowerCase())).forEach((social) => {
        links.push(`<a href="${esc(social.url)}" target="_blank" rel="noreferrer"><i class="${esc(social.icon)}" aria-hidden="true"></i>${esc(social.platform)}</a>`);
      });
      contactLinks.innerHTML = links.join("");
    }
    const resume = document.querySelector("[data-resume]");
    if (resume) resume.href = "./assets/CV ATS - FSD - Sheehan Andya.pdf";
    const metrics = document.querySelector("[data-metrics]");
    if (metrics) metrics.innerHTML = (profile.metrics || []).map((item) => `<div><strong>${esc(item.value)}</strong><span>${esc(item.label)}</span></div>`).join("");
    const roles = document.querySelector("[data-roles]");
    if (roles) roles.innerHTML = (profile.bestFitRoles || []).map((role) => `<span>${esc(role)}</span>`).join("");
    setText("[data-year]", new Date().getFullYear());
  }

  function renderServices() {
    const target = document.querySelector("[data-services]");
    if (!target) return;
    target.innerHTML = (config.services || []).map((service, index) => `
      <article class="play-service">
        <span class="service-count">0${index + 1}</span>
        <span class="service-icon"><i class="${esc(service.icon)}" aria-hidden="true"></i></span>
        <h3>${esc(service.title)}</h3><p>${esc(service.description)}</p>
        <ul class="service-details">${(service.details || []).map((detail) => `<li>${esc(detail)}</li>`).join("")}</ul>
      </article>`).join("");
  }

  function renderSkills() {
    const target = document.querySelector("[data-skills]");
    if (!target) return;
    const skills = config.skills || [];
    target.innerHTML = byCategory.map((category) => {
      const items = skills.filter((skill) => (Array.isArray(skill) ? skill[2] : skill.category) === category.key)
        .map((skill) => Array.isArray(skill) ? skill[1] : skill.label || skill.name);
      if (!items.length) return "";
      return `<article class="tool-group"><h3><i class="${category.icon}" aria-hidden="true"></i>${category.title}</h3><div class="tool-list">${items.map((item) => `<span>${esc(item)}</span>`).join("")}</div></article>`;
    }).join("");
  }

  function renderExperience() {
    const target = document.querySelector("[data-experience]");
    if (!target) return;
    target.innerHTML = (config.experience || []).map((item) => `<article class="journey-item"><time class="journey-date">${esc(item.date)}</time><div><h3>${esc(item.title)}</h3><p>${esc(item.description)}</p></div></article>`).join("");
  }

  function renderProjects() {
    const target = document.querySelector("[data-projects]");
    if (!target) return;
    target.innerHTML = (config.projects || []).map((project) => {
      const media = project.image
        ? `<img src="${esc(project.image)}" alt="${esc(project.title)} project preview" loading="lazy">`
        : `<span class="project-placeholder"><i class="${esc(project.icon || "fa-solid fa-code")}" aria-hidden="true"></i></span>`;
      const shot = project.link
        ? `<a class="project-shot" href="${esc(project.link)}" target="_blank" rel="noreferrer" aria-label="Open ${esc(project.title)}">${media}</a>`
        : `<div class="project-shot">${media}</div>`;
      return `<article class="play-project">${shot}<div class="project-copy"><h3>${esc(project.title)}</h3><p>${esc(project.description)}</p><div class="project-tags">${(project.tags || []).map((tag) => `<span>${esc(tag)}</span>`).join("")}</div>${project.link ? `<a class="project-action" href="${esc(project.link)}" target="_blank" rel="noreferrer">Take a look <span aria-hidden="true">↗</span></a>` : ""}</div></article>`;
    }).join("");
  }

  function renderCredentials() {
    const target = document.querySelector("[data-credentials]");
    if (!target) return;
    target.innerHTML = (config.credentials || []).map((item) => {
      const media = item.image ? `<img src="${esc(item.image)}" alt="${esc(item.title)} certificate" loading="lazy">` : `<span class="project-placeholder"><i class="${esc(item.icon || "fa-solid fa-award")}" aria-hidden="true"></i></span>`;
      const image = item.link ? `<a class="learning-image" href="${esc(item.link)}" target="_blank" rel="noreferrer">${media}</a>` : `<div class="learning-image">${media}</div>`;
      return `<article class="learning-card">${image}<div class="learning-info"><time>${esc(item.date)}</time><h3>${esc(item.title)}</h3><p>${esc(item.description)}</p>${item.link ? `<a class="learning-action" href="${esc(item.link)}" target="_blank" rel="noreferrer">View certificate ↗</a>` : ""}</div></article>`;
    }).join("");
  }

  function initStackReveal() {
    const scenes = document.querySelectorAll(".stack-scene");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scenes.forEach((scene) => scene.classList.add("is-visible"));
      return;
    }
    document.documentElement.classList.add("js-motion");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    scenes.forEach((scene) => observer.observe(scene));
  }

  function initNav() {
    const sections = [...document.querySelectorAll(".stack-scene[id]")];
    const links = [...document.querySelectorAll(".play-nav a")];
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => link.classList.toggle("is-current", link.hash === `#${entry.target.id}`));
    }), { threshold: 0.55 });
    sections.forEach((section) => observer.observe(section));
  }

  function initProjectSpotlight() {
    if (window.matchMedia("(hover: none), (prefers-reduced-motion: reduce)").matches) return;
    document.querySelectorAll(".play-project").forEach((card) => card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    }));
  }

  function initHeroAnimation() {
    const canvas = document.querySelector("[data-hero-canvas]");
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hero = canvas.closest(".hero-scene");
    const edges = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],[1,8],[8,9],[9,5],[8,10],[10,6],[5,11],[11,12],[12,10],[3,13],[13,14]];
    const anchors = [[.45,.24],[.57,.14],[.72,.17],[.86,.2],[.96,.32],[.92,.48],[.82,.58],[.66,.52],[.57,.38],[.72,.36],[.61,.65],[.94,.69],[.79,.78],[.99,.54],[.9,.79]];
    const glyphs = ["{ }", "</>", "=>", "01", "[ ]", "fn()"];
    let width = 0;
    let height = 0;
    let ratio = 1;
    let frame = 0;
    let running = false;
    let inView = false;
    let pointerX = .72;
    let pointerY = .48;
    let easedX = pointerX;
    let easedY = pointerY;
    let sizeObserver;
    let viewObserver;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      ratio = Math.min(window.devicePixelRatio || 1, 1.65);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (!running) draw(0);
    };

    const draw = (milliseconds) => {
      context.clearRect(0, 0, width, height);
      if (!width || !height) return;
      const time = reducedMotion.matches ? 0 : milliseconds / 1000;
      easedX += (pointerX - easedX) * .035;
      easedY += (pointerY - easedY) * .035;
      const coreX = width * (.73 + (easedX - .72) * .035);
      const coreY = height * (.48 + (easedY - .48) * .035);

      const wash = context.createRadialGradient(coreX, coreY, 4, coreX, coreY, Math.max(width, height) * .55);
      wash.addColorStop(0, "rgba(255, 151, 141, .25)");
      wash.addColorStop(.48, "rgba(203, 184, 243, .12)");
      wash.addColorStop(1, "rgba(255, 248, 239, 0)");
      context.fillStyle = wash;
      context.fillRect(0, 0, width, height);

      context.save();
      context.translate(coreX, coreY);
      context.rotate(Math.sin(time * .14) * .08);
      [1, .73, .48].forEach((scale, index) => {
        context.beginPath();
        context.ellipse(0, 0, width * .29 * scale, height * .36 * scale, index % 2 ? -.28 : .28, 0, Math.PI * 2);
        context.strokeStyle = `rgba(72, 78, 129, ${.11 - index * .018})`;
        context.lineWidth = index === 0 ? 1.2 : 1;
        context.stroke();
      });
      context.restore();

      const points = anchors.map(([x, y], index) => ({
        x: width * x + Math.sin(time * .55 + index * 1.7) * 7,
        y: height * y + Math.cos(time * .48 + index * 1.3) * 8
      }));
      edges.forEach(([startIndex, endIndex], index) => {
        const start = points[startIndex];
        const end = points[endIndex];
        const bend = (index % 2 ? 1 : -1) * Math.min(width, height) * .027;
        const controlX = (start.x + end.x) / 2 + bend;
        const controlY = (start.y + end.y) / 2 - bend;
        context.beginPath();
        context.moveTo(start.x, start.y);
        context.quadraticCurveTo(controlX, controlY, end.x, end.y);
        context.strokeStyle = index % 4 === 0 ? "rgba(217, 87, 78, .27)" : "rgba(73, 91, 139, .19)";
        context.lineWidth = index % 4 === 0 ? 1.5 : 1;
        context.stroke();

        const phase = (time * .19 + index * .37) % 1;
        if (!reducedMotion.matches && phase < .28) {
          const progress = phase / .28;
          const px = (1-progress) ** 2 * start.x + 2 * (1-progress) * progress * controlX + progress ** 2 * end.x;
          const py = (1-progress) ** 2 * start.y + 2 * (1-progress) * progress * controlY + progress ** 2 * end.y;
          const tailProgress = Math.max(0, progress - .075);
          const tx = (1-tailProgress) ** 2 * start.x + 2 * (1-tailProgress) * tailProgress * controlX + tailProgress ** 2 * end.x;
          const ty = (1-tailProgress) ** 2 * start.y + 2 * (1-tailProgress) * tailProgress * controlY + tailProgress ** 2 * end.y;
          context.beginPath();
          context.moveTo(tx, ty);
          context.lineTo(px, py);
          context.strokeStyle = index % 3 === 0 ? "rgba(217, 87, 78, .7)" : "rgba(73, 113, 194, .68)";
          context.lineWidth = 2.4;
          context.stroke();
          const packet = context.createRadialGradient(px, py, 0, px, py, 8);
          packet.addColorStop(0, "rgba(255,255,255,.95)");
          packet.addColorStop(.32, index % 3 === 0 ? "rgba(217,87,78,.95)" : "rgba(73,113,194,.92)");
          packet.addColorStop(1, "rgba(255,255,255,0)");
          context.fillStyle = packet;
          context.beginPath();
          context.arc(px, py, 8, 0, Math.PI * 2);
          context.fill();
        }
      });

      points.forEach((point, index) => {
        const pulse = reducedMotion.matches ? 0 : (Math.sin(time * 2 + index) + 1) * 1.1;
        context.beginPath();
        context.arc(point.x, point.y, 2.1 + pulse, 0, Math.PI * 2);
        context.fillStyle = index % 3 === 0 ? "rgba(217, 87, 78, .75)" : "rgba(66, 87, 141, .56)";
        context.fill();
        context.beginPath();
        context.arc(point.x, point.y, 7 + pulse, 0, Math.PI * 2);
        context.strokeStyle = "rgba(255, 255, 255, .55)";
        context.lineWidth = 1;
        context.stroke();
      });

      if (!reducedMotion.matches) glyphs.forEach((glyph, index) => {
        const drift = Math.sin(time * .45 + index * 2) * 8;
        const x = width * (.51 + (index % 3) * .16) + drift;
        const y = height * (.19 + (index % 4) * .17) + Math.cos(time * .38 + index) * 6;
        context.save();
        context.translate(x, y);
        context.rotate(Math.sin(time * .22 + index) * .06);
        context.font = "600 11px monospace";
        context.fillStyle = index % 2 ? "rgba(57, 84, 141, .22)" : "rgba(217, 87, 78, .22)";
        context.fillText(glyph, 0, 0);
        context.restore();
      });
    };

    const tick = (time) => {
      if (!running) return;
      draw(time);
      frame = window.requestAnimationFrame(tick);
    };
    const start = () => {
      if (running || !inView || document.hidden || reducedMotion.matches) return;
      running = true;
      frame = window.requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      window.cancelAnimationFrame(frame);
    };

    if ("ResizeObserver" in window) {
      sizeObserver = new ResizeObserver(resize);
      sizeObserver.observe(hero);
    }
    else window.addEventListener("resize", resize, { passive: true });
    if ("IntersectionObserver" in window) {
      viewObserver = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        if (inView) start(); else stop();
      }, { threshold: 0 });
      viewObserver.observe(hero);
    } else inView = true;
    hero.addEventListener("pointermove", (event) => {
      const bounds = hero.getBoundingClientRect();
      pointerX = (event.clientX - bounds.left) / bounds.width;
      pointerY = (event.clientY - bounds.top) / bounds.height;
    }, { passive: true });
    document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
    reducedMotion.addEventListener?.("change", () => reducedMotion.matches ? stop() : start());
    resize();
    if (reducedMotion.matches) draw(0);
    else start();
  }

  renderProfile();
  renderServices();
  renderSkills();
  renderExperience();
  renderProjects();
  renderCredentials();
  initStackReveal();
  initNav();
  initProjectSpotlight();
  initHeroAnimation();
})();
