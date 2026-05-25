document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("highlightsTrack");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  //scroll right
  nextBtn.addEventListener("click", () => {
    track.scrollBy({ left: 400, behavior: "smooth" });
  });

  //scroll left
  prevBtn.addEventListener("click", () => {
    track.scrollBy({ left: -400, behavior: "smooth" });
  });

  function updateClocks() {
    // Local Time
    const now = new Date();
    document.getElementById("local-clock").innerText = now.toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      },
    );

    // Track Time (Montreal)
    const trackTime = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Europe/Monaco" }),
    );
    document.getElementById("track-clock").innerText =
      trackTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
  }

  // Update every second
  setInterval(updateClocks, 1000);
  updateClocks();

  // hamburger menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      // This toggles the 'is-active' class for the hamburger animation
      menuToggle.classList.toggle("is-active");
      // This toggles the 'active' class to show the menu
      navLinks.classList.toggle("active");
    });
  }
});

const TEAM_COLORS = {
  mercedes: "#27F4D2",
  red_bull: "#3671C6",
  mclaren: "#FF8000",
  ferrari: "#E8002D",
  alpine: "#FF87BC",
  rb: "#6692FF",
  aston_martin: "#229971",
  williams: "#64C4FF",
  haas: "#B6BABD",
  audi: "#1E4D2B",
  sauber: "#52E252",
  cadillac: "#cccccc",
};

const NAT_FLAGS = {
  British: "gb",
  Dutch: "nl",
  Australian: "au",
  Monegasque: "mc",
  Spanish: "es",
  German: "de",
  French: "fr",
  Italian: "it",
  Thai: "th",
  Canadian: "ca",
  Japanese: "jp",
  Brazilian: "br",
  Argentine: "ar",
  "New Zealander": "nz",
  Finnish: "fi",
  Mexican: "mx",
  Danish: "dk",
  Chinese: "cn",
  American: "us",
};

let allDrivers = [];
let showAll = false;

// ===== FETCH STANDINGS FROM API =====
function fetchStandings() {
  const loading = document.getElementById("standingsLoading");
  const error = document.getElementById("standingsError");
  const table = document.getElementById("standingsTable");
  const podium = document.getElementById("podiumRow");
  const badge = document.getElementById("standingsBadge");
  const footer = document.querySelector(".standings-footer");
  const showBtn = document.querySelector(".show-all-btn");

  // show loading, hide everything else
  loading.style.display = "flex";
  error.style.display = "none";
  table.style.display = "none";
  podium.style.display = "none";
  badge.style.display = "none";
  footer.style.display = "none";
  showBtn.style.display = "none";

  fetch("https://api.jolpi.ca/ergast/f1/current/driverstandings/?format=json")
    .then((res) => res.json())
    .then((data) => {
      const list = data.MRData.StandingsTable.StandingsLists[0];
      allDrivers = list.DriverStandings;

      // show badge
      badge.textContent = list.season + " SEASON · ROUND " + list.round;
      badge.style.display = "inline-block";

      // podium
      buildPodium(allDrivers.slice(0, 3));
      podium.style.display = "grid";

      // table
      buildTable();
      table.style.display = "table";

      // show footer + button
      footer.style.display = "block";
      showBtn.style.display = "block";

      // hide loading
      loading.style.display = "none";
    })
    .catch(() => {
      loading.style.display = "none";
      error.style.display = "flex";
    });
}

// ===== PODIUM CARDS =====
function buildPodium(top3) {
  const container = document.getElementById("podiumRow");
  container.innerHTML = "";

  top3.forEach((d) => {
    const color = TEAM_COLORS[d.Constructors[0]?.constructorId] || "#666";
    const flag = NAT_FLAGS[d.Driver.nationality] || "";
    const flagImg = flag
      ? `<img src="https://flagcdn.com/w20/${flag}.png" alt="" class="flag-img">`
      : "";

    const card = document.createElement("div");
    card.className = "podium-card";
    card.innerHTML = `
            <div class="podium-accent" style="background:${color}"></div>
            <div class="podium-top-row">
                <span class="podium-pos" style="color:${color}">P${d.position}</span>
                <span class="podium-pts">${d.points}<small> PTS</small></span>
            </div>
            <div class="podium-driver">
                ${flagImg}
                <span class="podium-first">${d.Driver.givenName}</span>
                <span class="podium-last">${d.Driver.familyName}</span>
            </div>
            <div class="podium-team">
                <span class="team-color-dot" style="background:${color}"></span>
                ${d.Constructors[0]?.name || ""}
            </div>
            <span class="podium-wins">${d.wins} win${d.wins !== "1" ? "s" : ""}</span>
        `;
    container.appendChild(card);
  });
}

// ===== TABLE ROWS =====
function buildTable() {
  const tbody = document.getElementById("standingsBody");
  tbody.innerHTML = "";

  const maxPts = Math.max(...allDrivers.map((d) => Number(d.points)));
  const visible = showAll ? allDrivers : allDrivers.slice(0, 10);

  visible.forEach((d) => {
    const color = TEAM_COLORS[d.Constructors[0]?.constructorId] || "#666";
    const flag = NAT_FLAGS[d.Driver.nationality] || "";
    const flagImg = flag
      ? `<img src="https://flagcdn.com/w20/${flag}.png" alt="" class="flag-img">`
      : "";
    const barWidth = maxPts > 0 ? (Number(d.points) / maxPts) * 100 : 0;

    const tr = document.createElement("tr");
    tr.className = "standing-row";
    tr.innerHTML = `
            <td>
                <div class="pos-cell">
                    <span class="pos-bar" style="background:${color}"></span>
                    <span class="pos-number">${d.position}</span>
                </div>
            </td>
            <td>
                <div class="driver-info">
                    ${flagImg}
                    <span class="driver-fname">${d.Driver.givenName}</span>
                    <span class="driver-lname">${d.Driver.familyName}</span>
                    <span class="driver-code">${d.Driver.code}</span>
                </div>
            </td>
            <td class="hide-mobile nat-cell">${d.Driver.nationality}</td>
            <td>
                <div class="team-info">
                    <span class="team-color-dot" style="background:${color}"></span>
                    <span>${d.Constructors[0]?.name || ""}</span>
                </div>
            </td>
            <td class="hide-small wins-cell">${d.wins}</td>
            <td>
                <div class="pts-cell">
                    <div class="pts-bar-bg" style="width:${barWidth}%;background:${color}"></div>
                    <span class="pts-number">${d.points}</span>
                </div>
            </td>
        `;
    tbody.appendChild(tr);
  });
}

// ===== TOGGLE SHOW ALL =====
function toggleShowAll() {
  showAll = !showAll;
  buildTable();
  const btn = document.getElementById("toggleStandings");
  btn.textContent = showAll ? "▲ Show Less" : "▼ Show All Drivers";
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", fetchStandings);
function fetchConstructors() {
  const loading = document.getElementById("constructorsLoading");
  const error = document.getElementById("constructorsError");
  const cards = document.getElementById("constructorCards");
  const badge = document.getElementById("constructorsBadge");
  const footer = document.getElementById("constructorsFooter");

  loading.style.display = "flex";
  error.style.display = "none";
  cards.style.display = "none";
  badge.style.display = "none";
  footer.style.display = "none";

  fetch(
    "https://api.jolpi.ca/ergast/f1/current/constructorstandings/?format=json",
  )
    .then((res) => res.json())
    .then((data) => {
      const list = data.MRData.StandingsTable.StandingsLists[0];
      const teams = list.ConstructorStandings;

      badge.textContent = list.season + " SEASON · ROUND " + list.round;
      badge.style.display = "inline-block";

      buildConstructorCards(teams);
      cards.style.display = "grid";
      footer.style.display = "block";
      loading.style.display = "none";
    })
    .catch(() => {
      loading.style.display = "none";
      error.style.display = "flex";
    });
}

function buildConstructorCards(teams) {
  const container = document.getElementById("constructorCards");
  container.innerHTML = "";

  const maxPts = Math.max(...teams.map((t) => Number(t.points)));

  teams.forEach((t, i) => {
    const color = TEAM_COLORS[t.Constructor.constructorId] || "#666";
    const barWidth = maxPts > 0 ? (Number(t.points) / maxPts) * 100 : 0;

    const card = document.createElement("div");
    card.className = "constructor-card";

    // first place gets a special glow
    if (i === 0) card.classList.add("constructor-leader");

    card.innerHTML = `
            <div class="constructor-accent" style="background:${color}"></div>
            <div class="constructor-left">
                <span class="constructor-pos">${t.position}</span>
                <div class="constructor-color-bar" style="background:${color}"></div>
                <div class="constructor-name-block">
                    <span class="constructor-name">${t.Constructor.name}</span>
                    <span class="constructor-nat">${t.Constructor.nationality}</span>
                </div>
            </div>
            <div class="constructor-right">
                <div class="constructor-pts-bar-wrapper">
                    <div class="constructor-pts-bar" style="width:${barWidth}%;background:${color}"></div>
                </div>
                <div class="constructor-stats">
                    <span class="constructor-pts">${t.points}<small> PTS</small></span>
                    <span class="constructor-wins">${t.wins} win${t.wins !== "1" ? "s" : ""}</span>
                </div>
            </div>
        `;
    container.appendChild(card);
  });
}

// ===== RUN ON PAGE LOAD =====
document.addEventListener("DOMContentLoaded", () => {
  fetchStandings();
  fetchConstructors();
});
