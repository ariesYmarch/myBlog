(() => {
  const root = document.documentElement;
  const toggle = document.querySelector("#theme-toggle");
  if (toggle) {
    const update = () => {
      const dark = root.dataset.theme === "dark";
      toggle.textContent = dark ? "☾" : "☼";
      toggle.setAttribute("aria-label", dark ? "라이트모드 전환" : "다크모드 전환");
    };
    update();
    toggle.addEventListener("click", () => {
      root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", root.dataset.theme);
      update();
    });
  }

  const input = document.querySelector("#search-input");
  const cards = [...document.querySelectorAll(".card")];
  const tagList = document.querySelector("#tag-list");
  const empty = document.querySelector("#empty-state");
  if (input && cards.length) {
    const tagSet = new Set();
    cards.forEach(card => card.dataset.tags.split(/\s+/).filter(Boolean).forEach(t => tagSet.add(t)));
    if (tagList) {
      [...tagSet].sort().forEach(tag => {
        const button = document.createElement("button");
        button.textContent = "#" + tag;
        button.dataset.tag = tag;
        tagList.appendChild(button);
      });
    }

    let activeTag = "";
    const filter = () => {
      const q = input.value.trim().toLowerCase();
      let shown = 0;
      cards.forEach(card => {
        const haystack = `${card.dataset.title} ${card.dataset.description} ${card.dataset.tags}`;
        const ok = (!q || haystack.includes(q)) && (!activeTag || card.dataset.tags.split(/\s+/).includes(activeTag));
        card.hidden = !ok;
        if (ok) shown++;
      });
      if (empty) empty.hidden = shown !== 0;
    };
    input.addEventListener("input", filter);
    tagList?.addEventListener("click", e => {
      if (e.target.tagName !== "BUTTON") return;
      activeTag = activeTag === e.target.dataset.tag ? "" : e.target.dataset.tag;
      [...tagList.children].forEach(b => b.classList.toggle("active", b === e.target && activeTag));
      filter();
    });
    const urlTag = new URLSearchParams(location.search).get("tag");
    if (urlTag) {
      activeTag = urlTag.toLowerCase();
      [...tagList.children].forEach(b => b.classList.toggle("active", b.dataset.tag === activeTag));
      filter();
    }
  }

  const toc = document.querySelector("#toc");
  const body = document.querySelector(".post-body");
  if (toc && body) {
    const headings = [...body.querySelectorAll("h2, h3")];
    headings.forEach((heading, i) => {
      const id = `section-${i + 1}`;
      heading.id = id;
      const link = document.createElement("a");
      link.href = "#" + id;
      link.textContent = heading.textContent;
      if (heading.tagName === "H3") link.style.paddingLeft = "10px";
      toc.appendChild(link);
    });
    const links = [...toc.querySelectorAll("a")];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id));
        }
      });
    }, { rootMargin: "-15% 0px -70% 0px" });
    headings.forEach(h => observer.observe(h));
  }
})();
