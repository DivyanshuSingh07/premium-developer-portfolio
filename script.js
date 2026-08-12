const portfolioConfig = {
  name: "DIVYANSHU SINGH",
  role: "Creative Developer",
  profileImage: "./assets/profile.png",
  email: "divyanshu@gmail.com",
  github: "https://github.com/DivyanshuSingh07",
  linkedin: "https://www.linkedin.com/in/divyanshu-singh-a453a21a4/",
  medium: "https://medium.com/@divyanshu_singh",
  projects: [
    {
      number: "01",
      title: "SKY MART",
      description: "A shopping cart web application made using react js.",
      technologies: [
        "REACT",
        "REACT ROUTER",
        "HTML",
        "CSS",
        "JavaScript",
        "API",
      ],
      image: "./assets/project-1.JPG",
      github: "https://github.com/DivyanshuSingh07/SkyMart",
      live: "https://sky-mart-six-ochre.vercel.app",
    },
    {
      number: "02",
      title: "DEVELOPER QUEST TRACKER",
      description:
        "**Developer Quest Tracker** is a gamified productivity app built with React and Redux Toolkit. Developers can create quests, earn XP, level up, unlock achievements, track progress, and customize themes. The project showcases Redux slices, localStorage persistence, Framer Motion, and scalable state management.",
      technologies: [
        "REACT",
        "REDUX TOOLKIT",
        "REACT ROUTER",
        "HTML",
        "CSS",
        "JavaScript",
      ],
      image: "./assets/project-2.JPG",
      github: "https://github.com/DivyanshuSingh07/DeveloperQuestTracker",
      live: "https://developer-quest-tracker.vercel.app",
    },
    {
      number: "03",
      title: "PRODUCTIVITY DASHBOARD",
      description:
        "This project uses the fundamental web technologies of structure, styling, and interactivity to create a one-page productivity online application. A user can manage tasks, plan their day, stay motivated, track concentrate time, and check the weather from a single screen thanks to this dashboard, which combines a number of simple everyday features.",
      technologies: ["HTML", "CSS", "JAVASCRIPT"],
      image: "./assets/project-3.JPG",
      github: "https://github.com/DivyanshuSingh07/ProductivityDashBoard",
      live: "YOUR_LIVE_URL",
    },
    {
      number: "04",
      title: "FINTRACK PRO",
      description: "A personalized finance tracking and managing web application.",
      technologies: ["HTML", "CSS", "JAVASCRIPT"],
      image: "./assets/project-4.JPG",
      github: "https://github.com/DivyanshuSingh07/Fintrack-Pro",
      live: "YOUR_LIVE_URL",
    },
  ],
  articles: [
    {
      source: "MEDIUM",
      title: "Artificial Intelligence Impact",
      description:
        "How will Artificial Intelligence Impact Us In Future ? How To Prepare For Artificial Intelligence?",
      url: "https://medium.com/@divyanshu_singh/how-will-artificial-intelligence-impact-us-in-future-how-to-prepare-for-artificial-intelligence-a8912d8ccab4",
    },
    {
      source: "NOTION",
      title: "Developer Quest Tracker",
      description: "A Developer's Journey Through the Kingdom of Redux Toolkit",
      url: "https://sturdy-armadillo-6f8.notion.site/Mini-Hackathon-3aab7b98d65c80beb614d046f0fc7dee",
    },
  ],
};

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const isTouch = window.matchMedia("(pointer: coarse)").matches;
const state = {
  slideshowActive: false,
  slideshowIndex: 0,
  slideshowTimer: null,
  cursorProject: false,
};

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [
  ...parent.querySelectorAll(selector),
];

function applyConfig() {
  $$("[data-config-name]").forEach((element) => {
    element.textContent = portfolioConfig.name;
  });

  const profile = $(".hero-image");
  if (profile) profile.src = portfolioConfig.profileImage;

  const emailLink = $("[data-email-link]");
  if (emailLink) {
    emailLink.href = `mailto:${portfolioConfig.email}`;
  }

  $$("[data-social]").forEach((link) => {
    const key = link.dataset.social;
    if (portfolioConfig[key]) link.href = portfolioConfig[key];
  });
}

function renderProjects() {
  const list = $(".project-list");
  if (!list) return;

  list.innerHTML = portfolioConfig.projects
    .map(
      (project) => `
    <article class="project" data-project>
      <div class="project-number">${project.number}</div>
      <div class="project-info">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
      <div class="project-tech">
        ${project.technologies.map((tech) => `<span>${tech}</span>`).join("")}
      </div>
      <div class="project-visual">
        <img src="${project.image}" alt="${project.title} preview" loading="lazy">
        <div class="project-links">
          <a href="${project.github}" target="_blank" rel="noreferrer">GITHUB ↗</a>
          <a href="${project.live}" target="_blank" rel="noreferrer">LIVE ↗</a>
        </div>
      </div>
    </article>
  `,
    )
    .join("");
}

function renderArticles() {
  const list = $(".article-list");
  if (!list) return;

  list.innerHTML = portfolioConfig.articles
    .map(
      (article) => `
    <a class="article magnetic" href="${article.url}" target="_blank" rel="noreferrer">
      <span class="article-source">${article.source}</span>
      <h3 class="article-title">${article.title}</h3>
      <p class="article-description">${article.description}</p>
      <span class="article-arrow">↗</span>
    </a>
  `,
    )
    .join("");
}

function initLoader() {
  document.body.classList.add("is-loading");

  if (prefersReducedMotion) {
    $(".site-loader").style.display = "none";
    document.body.classList.remove("is-loading");
    return;
  }

  const loader = $(".site-loader");
  const progress = $(".loader-progress");
  const timeline = gsap.timeline({
    onComplete: () => {
      document.body.classList.remove("is-loading");
      loader.setAttribute("aria-hidden", "true");
    },
  });

  timeline
    .to(progress, { scaleX: 1, duration: 0.9, ease: "power3.inOut" })
    .to(".loader-word", { yPercent: -110, duration: 0.65, ease: "power4.in" })
    .to(".loader-inner", { opacity: 0, duration: 0.25 }, "-=.2")
    .to(loader, { yPercent: -100, duration: 0.9, ease: "power4.inOut" });
}

function splitText(element) {
  if (!element || element.dataset.split) return;

  const text = element.textContent;
  element.textContent = "";
  [...text].forEach((character) => {
    const span = document.createElement("span");
    span.className = "char";
    span.textContent = character === " " ? "\u00a0" : character;
    element.appendChild(span);
  });
  element.dataset.split = "true";
}

function initFooter() {
  const footerTop = $(".footer-top");

  if (!footerTop) return;

  footerTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

function initHeroAnimations() {
  if (prefersReducedMotion) {
    gsap.set(".hero-image-mask", { clipPath: "inset(0)" });
    gsap.set(".hero-image", { scale: 1 });
    return;
  }

  $$(".hero-title .title-line > span").forEach((element) => {
    gsap.set(element, { yPercent: 110 });
  });

  const timeline = gsap.timeline({ delay: 0.15 });

  timeline
    .to(".hero-title .title-line > span", {
      yPercent: 0,
      duration: 1.25,
      stagger: 0.12,
      ease: "power4.out",
    })
    // .to(".hero-image-mask", {
    //   clipPath: "inset(0 0 0 0)",
    //   duration: 1.35,
    //   ease: "power4.inOut"
    // }, "-=.75")
    // .to(".hero-image", {
    //   scale: 1,
    //   duration: 1.6,
    //   ease: "power3.out"
    // }, "<")
    .to(".hero-image-mask", {
      clipPath: "inset(0)",
      duration: 1.35,
      ease: "power4.inOut",
    })
    .to(
      ".hero-image",
      {
        scale: 1.08,
        duration: 1.6,
        ease: "power3.out",
      },
      "<",
    )
    .from(
      ".hero-meta, .hero-statement, .hero-scroll, .hero-coordinates",
      {
        y: 18,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
      },
      "-=.85",
    );

  gsap.to(".hero-image", {
    yPercent: -3,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}

function initNavigation() {
  const nav = $(".nav");
  const links = $$(".nav-link");
  const toggle = $(".nav-toggle");
  const menu = $(".nav-links");

  ScrollTrigger.create({
    start: "top -20",
    onEnter: () => nav.classList.add("is-scrolled"),
    onLeaveBack: () => nav.classList.remove("is-scrolled"),
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });

  const sections = $$("main section[id]");
  const sectionLinks = new Map(
    links.map((link) => [link.getAttribute("href").slice(1), link]),
  );

  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onToggle: ({ isActive }) => {
        const link = sectionLinks.get(section.id);
        if (link) link.classList.toggle("is-active", isActive);
      },
    });
  });
}

function setCursorLabel(label) {
  const cursor = $(".cursor");
  const cursorLabel = $(".cursor-label");
  if (!cursor || !cursorLabel) return;
  cursorLabel.textContent = label;
}

function initCursor() {
  if (isTouch) {
    $(".cursor")?.remove();
    return;
  }

  const cursor = $(".cursor");
  const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
  const position = { x: mouse.x, y: mouse.y };

  window.addEventListener(
    "mousemove",
    (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    },
    { passive: true },
  );

  gsap.ticker.add(() => {
    position.x += (mouse.x - position.x) * 0.18;
    position.y += (mouse.y - position.y) * 0.18;
    gsap.set(cursor, { x: position.x, y: position.y });
  });

  $$(".magnetic").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.classList.add("is-link");
      setCursorLabel("OPEN ↗");
    });

    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("is-link");
      setCursorLabel("");
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, .5)",
      });
    });

    element.addEventListener("mousemove", (event) => {
      if (element.closest("[data-project]")) return;
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - (rect.left + rect.width / 2)) * 0.14;
      const y = (event.clientY - (rect.top + rect.height / 2)) * 0.14;
      gsap.to(element, {
        x,
        y,
        duration: 0.35,
        overwrite: true,
        ease: "power2.out",
      });
    });
  });

  $$(".project").forEach((project) => {
    project.addEventListener("mouseenter", () => {
      state.cursorProject = true;
      cursor.classList.remove("is-link");
      cursor.classList.add("is-project");
      setCursorLabel("EXPLORE");
    });

    project.addEventListener("mouseleave", () => {
      state.cursorProject = false;
      cursor.classList.remove("is-project");
      setCursorLabel("");
    });
  });
}

function initProjectInteractions() {
  const projects = $$(".project");
  if (!projects.length || isTouch) return;

  const explore = document.createElement("div");
  explore.className = "project-explore";
  explore.textContent = "EXPLORE ↗";
  document.body.appendChild(explore);

  const pointer = { x: innerWidth / 2, y: innerHeight / 2 };

  window.addEventListener(
    "mousemove",
    (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    },
    { passive: true },
  );

  gsap.ticker.add(() => {
    if (!state.cursorProject) return;
    gsap.to(explore, {
      x: pointer.x - 44,
      y: pointer.y - 44,
      duration: 0.55,
      overwrite: true,
      ease: "power3.out",
    });
  });

  projects.forEach((project) => {
    const image = $("img", project);

    project.addEventListener("mouseenter", () => {
      gsap.to(explore, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.35,
        ease: "power3.out",
      });
    });

    project.addEventListener("mouseleave", () => {
      gsap.to(explore, {
        autoAlpha: 0,
        scale: 0.65,
        duration: 0.25,
        ease: "power2.in",
      });
    });

    project.addEventListener("mousemove", (event) => {
      const rect = project.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      gsap.to(image, {
        x: x * 16,
        y: y * 12,
        duration: 0.65,
        overwrite: true,
        ease: "power3.out",
      });
    });

    project.addEventListener("mouseleave", () => {
      gsap.to(image, { x: 0, y: 0, duration: 0.7, ease: "power3.out" });
    });
  });
}

function initScrollAnimations() {
  if (prefersReducedMotion) return;

  $$(".reveal-text").forEach((element) => {
    splitText(element);
    const chars = $$(".char", element);

    gsap.from(chars, {
      yPercent: 120,
      opacity: 0,
      duration: 0.8,
      stagger: 0.012,
      ease: "power4.out",
      scrollTrigger: {
        trigger: element,
        start: "top 82%",
        once: true,
      },
    });
  });

  gsap.from(".section-label", {
    x: -20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.08,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".intro",
      start: "top 80%",
      once: true,
    },
  });

  gsap.from(".about-copy > p, .skill-row", {
    y: 35,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".about-copy",
      start: "top 75%",
      once: true,
    },
  });

  $$(".project").forEach((project, index) => {
    gsap.from(project, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: index * 0.04,
      scrollTrigger: {
        trigger: project,
        start: "top 88%",
        once: true,
      },
    });
  });

  $$(".article").forEach((article, index) => {
    gsap.from(article, {
      x: index % 2 ? 40 : -40,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: article,
        start: "top 88%",
        once: true,
      },
    });
  });

  gsap.to(".contact-title", {
    yPercent: -8,
    ease: "none",
    scrollTrigger: {
      trigger: ".contact",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

function initKeyboardAccessibility() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const menu = $(".nav-links");
      const toggle = $(".nav-toggle");
      menu?.classList.remove("is-open");
      toggle?.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
    }
  });
}

function init() {
  applyConfig();
  renderProjects();
  renderArticles();
  initLoader();
  initHeroAnimations();
  initNavigation();
  initCursor();
  initProjectInteractions();
  initScrollAnimations();
  initKeyboardAccessibility();
  initFooter();
  ScrollTrigger.refresh();
}

window.addEventListener("load", init);
