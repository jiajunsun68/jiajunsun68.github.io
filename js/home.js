(function () {
  var base = (window.SITE_BASEURL || "").replace(/\/$/, "");

  function resolveUrl(path) {
    if (!path) return "";
    if (/^(https?:)?\/\//i.test(path) || path.indexOf("data:") === 0) {
      return path;
    }
    var normalized = path.charAt(0) === "/" ? path : "/" + path;
    return base + normalized;
  }

  function createNode(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (typeof text === "string") node.textContent = text;
    return node;
  }

  function setTextOrHtml(node, value, useHtml) {
    if (!node) return;
    if (!value) {
      node.textContent = "";
      return;
    }
    if (useHtml) {
      node.innerHTML = value;
    } else {
      node.textContent = value;
    }
  }

  function toSafeAuthorsHtml(authorsHtml, authorsText) {
    if (authorsHtml) return authorsHtml;
    if (!authorsText) return "";
    return String(authorsText).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  }

  function renderProfile(data) {
    var hero = data.hero || {};
    var profile = data.profile || {};

    var heroEl = document.getElementById("home-hero");
    var heroTitle = document.getElementById("hero-title");
    var heroSubtitle = document.getElementById("hero-subtitle");
    var avatar = document.getElementById("profile-avatar");
    var nickname = document.getElementById("profile-nickname");
    var signature = document.getElementById("profile-signature");
    var degreeWrap = document.getElementById("profile-degrees");
    var linksWrap = document.getElementById("profile-links-grid");

    if (hero.background && heroEl) {
      heroEl.style.backgroundImage = "url('" + resolveUrl(hero.background) + "')";
    }
    if (hero.title && heroTitle) heroTitle.textContent = hero.title;
    if (hero.subtitle && heroSubtitle) heroSubtitle.textContent = hero.subtitle;

    if (profile.avatar && avatar) avatar.src = resolveUrl(profile.avatar);
    if (profile.nickname && nickname) nickname.textContent = profile.nickname;
    if (profile.signature && signature) signature.textContent = profile.signature;

    if (degreeWrap) {
      degreeWrap.innerHTML = "";
      (profile.degrees || []).forEach(function (degree) {
        var row = createNode("div", "profile-degree-row");
        var img = createNode("img");
        img.alt = degree.name || "school logo";
        img.src = resolveUrl(degree.logo);
        var text = createNode("span", "", degree.text || "");
        row.appendChild(img);
        row.appendChild(text);
        degreeWrap.appendChild(row);
      });
    }

    if (linksWrap) {
      linksWrap.innerHTML = "";
      (profile.links || []).forEach(function (item) {
        var row = createNode("div", "profile-link-item");
        var title = createNode("strong", "", (item.label || "Link") + ":");
        row.appendChild(title);

        if (item.url) {
          var link = createNode("a", "", item.text || item.url);
          link.href = item.url;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          row.appendChild(link);
        } else {
          row.appendChild(document.createTextNode(item.text || ""));
        }

        linksWrap.appendChild(row);
      });
    }
  }

  function renderPapers(data) {
    var list = document.getElementById("papers-list");
    if (!list) return;

    var papers = data.papers || [];
    if (!papers.length) {
      list.innerHTML = '<p class="empty-placeholder">暂无论文，模板已就绪。你可以在 data/papers.json 里新增条目。</p>';
      return;
    }

    list.innerHTML = "";
    papers.forEach(function (paper) {
      var item = createNode("article", "paper-item");
      var header = createNode("div", "paper-header");
      header.appendChild(createNode("div", "paper-tag", "[" + (paper.venue || "Venue") + " " + (paper.year || "Year") + "]"));

      var title = createNode("div", "paper-title");
      if (paper.url) {
        var link = createNode("a", "", paper.title || "Untitled");
        link.href = paper.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        title.appendChild(link);
      } else {
        title.appendChild(createNode("span", "paper-title-text", paper.title || "Untitled"));
      }
      header.appendChild(title);
      item.appendChild(header);

      var main = createNode("div", "paper-main");
      var media = createNode("div", "paper-media");
      var mediaImg = createNode("img", "paper-cover");
      mediaImg.src = resolveUrl(paper.image || "data/imgs/paper-placeholder.svg");
      mediaImg.alt = paper.title || "paper cover";
      mediaImg.onerror = function () {
        this.onerror = null;
        this.src = resolveUrl("data/imgs/paper-placeholder.svg");
      };
      media.appendChild(mediaImg);

      var body = createNode("div", "paper-body");
      var authors = createNode("div", "paper-authors");
      var authorsHtml = toSafeAuthorsHtml(paper.authorsHtml, paper.authors);
      setTextOrHtml(authors, "Authors: " + (authorsHtml || ""), !!authorsHtml);
      body.appendChild(authors);

      body.appendChild(createNode("div", "paper-field", "Field: " + (paper.field || "")));
      body.appendChild(createNode("div", "paper-abstract", "Abstract: " + (paper.abstract || "")));

      main.appendChild(media);
      main.appendChild(body);
      item.appendChild(main);

      list.appendChild(item);
    });
  }

  function renderProjects(data) {
    var list = document.getElementById("projects-list");
    if (!list) return;

    var projects = data.projects || [];
    if (!projects.length) {
      list.innerHTML = '<p class="empty-placeholder">暂无项目经历。你可以在 data/projects.json 里按时间段、单位和贡献补充。</p>';
      return;
    }

    list.innerHTML = "";
    projects.forEach(function (project) {
      var item = createNode("article", "project-item");
      var header = createNode("div", "project-header");
      header.appendChild(createNode("div", "project-period", project.period || ""));
      header.appendChild(createNode("div", "project-name", project.name || ""));
      item.appendChild(header);

      var body = createNode("div", "project-body");
      body.appendChild(createNode("div", "project-org", project.organization || ""));

      var contribWrap = createNode("ul", "project-contrib-list");
      var contributions = project.contributions || [];
      if (contributions.length) {
        contributions.forEach(function (c) {
          var li = createNode("li", "project-contrib", c);
          contribWrap.appendChild(li);
        });
        body.appendChild(contribWrap);
      } else if (project.contribution) {
        body.appendChild(createNode("div", "project-contrib", project.contribution));
      }

      item.appendChild(body);

      list.appendChild(item);
    });
  }

  Promise.all([
    fetch(resolveUrl("data/profile.json")).then(function (res) { return res.json(); }),
    fetch(resolveUrl("data/papers.json")).then(function (res) { return res.json(); }),
    fetch(resolveUrl("data/projects.json")).then(function (res) { return res.json(); })
  ]).then(function (allData) {
    renderProfile(allData[0] || {});
    renderPapers(allData[1] || {});
    renderProjects(allData[2] || {});
  }).catch(function () {
    // Keep static fallback content when JSON loading fails.
  });
})();
