document.addEventListener("DOMContentLoaded", () => {
  // --- Theme (dark/light) toggle ---
  const themeBtn = document.getElementById("themeBtn");

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark-mode");
      document.documentElement.setAttribute(
        "data-theme",
        isDark ? "dark" : "light",
      );
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  // --- Skills expandable details ---
  const skillListItems = Array.from(
    document.querySelectorAll(".ujuzi li"),
  ).filter((li) => li.querySelector("p"));
  if (skillListItems.length) {
    skillListItems.forEach((li) => {
      const details = li.querySelector("p");
      if (!details) return;

      details.classList.add("skill-details");
      li.classList.add("skill-item");
      li.setAttribute("tabindex", "0");
      li.setAttribute("role", "button");
      li.setAttribute("aria-expanded", "false");

      const toggle = () => {
        const expanded = li.classList.toggle("expanded");
        li.setAttribute("aria-expanded", expanded ? "true" : "false");
      };

      li.addEventListener("click", (e) => {
        const tag = e.target.tagName.toLowerCase();
        if (tag === "a" || tag === "button") return;
        toggle();
      });

      li.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      });
    });
  }

  // --- Education table sort (Year column) ---
  const sortBtn = document.getElementById("sort-year-btn");
  const eduTable = document.querySelector(".academic-container table");
  if (sortBtn && eduTable) {
    let asc = true;

    const parseYear = (text) => {
      if (!text) return 0;
      const m = text.match(/\d{4}/);
      return m ? parseInt(m[0], 10) : 0;
    };

    const updateButton = () => {
      sortBtn.setAttribute("aria-pressed", asc ? "false" : "true");
      sortBtn.textContent = `Sort by Year ${asc ? "↑" : "↓"}`;
    };

    const sortTable = () => {
      const tbody = eduTable.tBodies[0] || eduTable;
      const rows = Array.from(tbody.querySelectorAll("tr"));
      rows.sort((a, b) => {
        const aTxt = a.cells[2] ? a.cells[2].textContent.trim() : "";
        const bTxt = b.cells[2] ? b.cells[2].textContent.trim() : "";
        const ay = parseYear(aTxt);
        const by = parseYear(bTxt);
        return asc ? ay - by : by - ay;
      });
      rows.forEach((r) => tbody.appendChild(r));
    };

    sortBtn.addEventListener("click", () => {
      asc = !asc;
      updateButton();
      sortTable();
    });

    updateButton();
  }

  // --- Hobbies read-more toggle ---
  const hobbyItems = document.querySelectorAll(".hobbies ul li");
  if (hobbyItems.length) {
    hobbyItems.forEach((li) => {
      li.classList.add("hobby-item");
      const textWrap = document.createElement("div");
      textWrap.className = "hobby-text";
      while (li.firstChild) {
        textWrap.appendChild(li.firstChild);
      }
      li.appendChild(textWrap);
      const btn = document.createElement("button");
      btn.className = "read-more-btn";
      btn.type = "button";
      btn.setAttribute("aria-expanded", "false");
      btn.textContent = "Read more";
      li.appendChild(btn);
      requestAnimationFrame(() => {
        const fullHeight = textWrap.scrollHeight;
        const visibleHeight = textWrap.clientHeight;
        if (fullHeight <= visibleHeight + 2) {
          btn.style.display = "none";
        }
      });
      const toggle = () => {
        const expanded = textWrap.classList.toggle("expanded");
        btn.setAttribute("aria-expanded", expanded ? "true" : "false");
        btn.textContent = expanded ? "Read less" : "Read more";
      };
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggle();
      });
      textWrap.addEventListener("click", () => toggle());
      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      });
    });
  }

  // --- Lightbox for gallery images ---
  const galleryImages = document.querySelectorAll(".gallery-container img");
  if (galleryImages.length) {
    let lastFocused = null;
    const createOverlay = (src, alt) => {
      const overlay = document.createElement("div");
      overlay.className = "lightbox-overlay";
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-modal", "true");
      overlay.tabIndex = -1;
      const content = document.createElement("div");
      content.className = "lightbox-content";
      const img = document.createElement("img");
      img.src = src;
      img.alt = alt || "";
      const btn = document.createElement("button");
      btn.className = "lightbox-close";
      btn.type = "button";
      btn.setAttribute("aria-label", "Close");
      btn.innerHTML = "&times;";
      const onKeyDown = (e) => {
        if (e.key === "Escape") close();
      };
      function close() {
        overlay.classList.remove("visible");
        document.removeEventListener("keydown", onKeyDown);
        overlay.addEventListener("transitionend", () => overlay.remove(), {
          once: true,
        });
        document.body.style.overflow = "";
        if (lastFocused) lastFocused.focus();
      }
      btn.addEventListener("click", close);
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close();
      });
      document.addEventListener("keydown", onKeyDown);
      content.appendChild(img);
      content.appendChild(btn);
      overlay.appendChild(content);
      document.body.appendChild(overlay);
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => overlay.classList.add("visible"));
      btn.focus();
    };
    galleryImages.forEach((img) => {
      img.setAttribute("tabindex", "0");
      img.style.cursor = "zoom-in";
      img.addEventListener("click", (e) => {
        lastFocused = e.currentTarget;
        createOverlay(e.currentTarget.src, e.currentTarget.alt);
      });
      img.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          lastFocused = e.currentTarget;
          createOverlay(e.currentTarget.src, e.currentTarget.alt);
        }
      });
    });
  }

  // --- Scroll-to-top button ---
  const scrollTopBtn = document.querySelector(".top");
  if (scrollTopBtn) {
    const toggleTopButton = () => {
      const shouldShow = window.scrollY > 200;
      scrollTopBtn.classList.toggle("visible", shouldShow);
      scrollTopBtn.setAttribute("aria-hidden", shouldShow ? "false" : "true");
    };

    window.addEventListener("scroll", toggleTopButton, { passive: true });
    toggleTopButton();

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
  (function () {
    try {
      const saved = localStorage.getItem("theme");
      const prefers =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      const theme = saved || (prefers ? "dark" : "light");
      if (theme === "dark") {
        document.body.classList.add("dark-mode");
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.body.classList.remove("dark-mode");
        document.documentElement.setAttribute("data-theme", "light");
      }
    } catch (e) {}
  })();
});
