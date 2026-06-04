/* Interactions for Saanvi's Rangapravesha */
(function () {
  "use strict";

  /* ---------- Render the Margam accordion ---------- */
  const acc = document.getElementById("margam-acc");
  (window.MARGAM || []).forEach(function (p) {
    const item = document.createElement("div");
    item.className = "acc-item";

    let bodyHtml = p.body.map(function (para) { return "<p>" + para + "</p>"; }).join("");
    if (p.sahitya) {
      bodyHtml += "<div class='subhead'>Meaning of the Sahityam</div>";
      bodyHtml += p.sahitya.map(function (s) {
        return "<div class='sahitya'><div class='line'>" + s[0] + "</div><div class='gloss'>" + s[1] + "</div></div>";
      }).join("");
    }

    item.innerHTML =
      '<button class="acc-head" aria-expanded="false">' +
        '<span class="acc-num">' + String(p.n).padStart(2, "0") + '</span>' +
        '<span class="acc-title"><span class="t">' + p.title + '</span>' +
        '<span class="meta">' + p.kind + ' &middot; ' + p.meta + '</span></span>' +
        '<span class="acc-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>' +
      '</button>' +
      '<div class="acc-body"><div class="acc-body-inner">' + bodyHtml + '</div></div>';

    acc.appendChild(item);
  });

  /* ---------- Accordion behaviour (shared) ---------- */
  function wireAccordion(root) {
    root.querySelectorAll(".acc-head").forEach(function (head) {
      head.addEventListener("click", function () {
        const item = head.parentElement;
        const body = item.querySelector(".acc-body");
        const isOpen = item.classList.contains("open");
        if (isOpen) {
          body.style.maxHeight = body.scrollHeight + "px";
          requestAnimationFrame(function () { body.style.maxHeight = "0px"; });
          item.classList.remove("open");
          head.setAttribute("aria-expanded", "false");
        } else {
          item.classList.add("open");
          head.setAttribute("aria-expanded", "true");
          body.style.maxHeight = body.scrollHeight + "px";
          body.addEventListener("transitionend", function te() {
            if (item.classList.contains("open")) body.style.maxHeight = "none";
            body.removeEventListener("transitionend", te);
          });
        }
      });
    });
  }
  wireAccordion(acc);

  /* ---------- Render ensemble + credits ---------- */
  const ens = document.getElementById("ensemble");
  (window.ENSEMBLE || []).forEach(function (m) {
    const c = document.createElement("div");
    c.className = "team-card";
    c.innerHTML = '<div class="role">' + m.role + '</div>' +
      '<div class="name">' + m.name + (m.hon ? '<span class="hon">' + m.hon + '</span>' : '') + '</div>';
    ens.appendChild(c);
  });

  const cr = document.getElementById("credits");
  (window.CREDITS || []).forEach(function (m) {
    const c = document.createElement("div");
    c.className = "credit";
    c.innerHTML = '<div class="role">' + m.role + '</div><div class="name">' + m.name + '</div>';
    cr.appendChild(c);
  });

  /* ---------- Mobile menu ---------- */
  const nav = document.getElementById("nav");
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  menuBtn.addEventListener("click", function () { nav.classList.toggle("menu-open"); });
  navLinks.addEventListener("click", function (e) {
    if (e.target.tagName === "A") nav.classList.remove("menu-open");
  });

  /* ---------- Scrollspy ---------- */
  const sections = ["home", "margam", "journey", "live", "team"]
    .map(function (id) { return document.getElementById(id); }).filter(Boolean);
  const linkFor = {};
  navLinks.querySelectorAll("a").forEach(function (a) {
    linkFor[a.getAttribute("href").slice(1)] = a;
  });
  // map #about to nothing; spy primary anchors
  const spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        const id = en.target.id;
        Object.values(linkFor).forEach(function (a) { a.classList.remove("active"); });
        if (linkFor[id]) linkFor[id].classList.add("active");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
  sections.forEach(function (s) { spy.observe(s); });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".section-head, .read, .doc-grid, .journey-wrap, .team-card, .credit, .live-card, .hero-gallery");
  revealEls.forEach(function (el) { el.classList.add("reveal"); });
  const ro = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("in"); ro.unobserve(en.target); }
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });
  revealEls.forEach(function (el) { ro.observe(el); });

  /* ---------- Live demo cycle ----------
     Simulates the real-time feed: a "demo" mode that walks through the
     Margam so the Live section feels alive in preview. In production this
     state would be pushed from a control panel during the performance. */
  const liveNow = document.getElementById("liveNow");
  const liveTitle = document.getElementById("liveTitle");
  const liveMeta = document.getElementById("liveMeta");
  const liveProg = document.getElementById("liveProgress");

  const pieces = window.MARGAM || [];
  // progress dots: welcome + each piece
  const steps = [{ now: "Welcome", title: "The recital will begin shortly", meta: "Please be seated \u00b7 phones on silent" }]
    .concat(pieces.map(function (p) {
      return { now: "Now performing \u00b7 " + String(p.n).padStart(2, "0"), title: p.title, meta: p.kind + " \u00b7 " + p.meta };
    }))
    .concat([{ now: "Thank you", title: "\u015Aubhamastu", meta: "With gratitude to all who joined us this evening" }]);

  // build progress dots (one per piece)
  pieces.forEach(function () {
    const s = document.createElement("span");
    liveProg.appendChild(s);
  });
  const dots = liveProg.querySelectorAll("span");

  let idx = 0;
  function renderLive() {
    const s = steps[idx];
    [liveNow, liveTitle, liveMeta].forEach(function (el) { el.style.opacity = 0; });
    setTimeout(function () {
      liveNow.textContent = s.now;
      liveTitle.textContent = s.title;
      liveMeta.textContent = s.meta;
      [liveNow, liveTitle, liveMeta].forEach(function (el) { el.style.transition = "opacity .5s"; el.style.opacity = 1; });
      // progress: idx 0 = welcome (no dot lit), idx 1..N = pieces
      dots.forEach(function (d, i) {
        d.classList.remove("cur", "done");
        if (idx - 1 > i) d.classList.add("done");
        else if (idx - 1 === i) d.classList.add("cur");
      });
      if (idx > pieces.length) dots.forEach(function (d) { d.classList.add("done"); d.classList.remove("cur"); });
    }, 220);
    idx = (idx + 1) % steps.length;
  }
  renderLive();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) setInterval(renderLive, 4200);

  /* ---------- Brochure / invitation placeholder notice ---------- */
  document.querySelectorAll("[data-doc]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      a.classList.add("nudge");
      setTimeout(function () { a.classList.remove("nudge"); }, 500);
    });
  });
})();
