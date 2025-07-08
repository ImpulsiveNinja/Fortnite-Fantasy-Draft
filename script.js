document.addEventListener("DOMContentLoaded", () => {
  let players = [
    { name: "Ninja", score: 120, earnings: "$1,200,000" },
    { name: "Clix", score: 90, earnings: "$850,000" },
    { name: "Bugha", score: 150, earnings: "$2,500,000" },
  ];

  const playersContainer = document.getElementById("players");
  const teamContainer = document.getElementById("team");
  const searchInput = document.getElementById("search-input");

  let team = [];

  // Render available players
  function renderPlayers(filter = "") {
    playersContainer.innerHTML = "";
    const filteredPlayers = players.filter(player =>
      player.name.toLowerCase().includes(filter.toLowerCase())
    );

    filteredPlayers.forEach(player => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${player.name}</h3>
        <p>Power Ranking: <span class="score">${player.score}</span></p>
        <p>Earnings: <span class="earnings">${player.earnings}</span></p>
        <button class="add-to-team-btn">Add to Team</button>
      `;

      const btn = card.querySelector(".add-to-team-btn");
      btn.addEventListener("click", () => {
        if (!team.find(p => p.name === player.name)) {
          team.push(player);
          renderTeam();
          alert(`${player.name} added to your team!`);
        } else {
          alert(`${player.name} is already in your team.`);
        }
      });

      playersContainer.appendChild(card);
    });
  }

  // Render the user's team
  function renderTeam() {
    teamContainer.innerHTML = "";

    if (team.length === 0) {
      teamContainer.textContent = "Your team is empty.";
      return;
    }

    team.forEach(player => {
      const div = document.createElement("div");
      div.className = "team-player";
      div.innerHTML = `
        <span>${player.name} - Power: ${player.score}, Earnings: ${player.earnings}</span>
        <button class="remove-btn">Remove</button>
      `;

      const removeBtn = div.querySelector(".remove-btn");
      removeBtn.addEventListener("click", () => {
        team = team.filter(p => p.name !== player.name);
        renderTeam();
      });

      teamContainer.appendChild(div);
    });
  }

  // Search filter
  searchInput.addEventListener("input", (e) => {
    renderPlayers(e.target.value);
  });

  // Add player form
  const form = document.getElementById("add-player-form");
  form.addEventListener("submit", e => {
    e.preventDefault();

    const nameInput = document.getElementById("player-name");
    const scoreInput = document.getElementById("player-score");
    const earningsInput = document.getElementById("player-earnings");

    const name = nameInput.value.trim();
    const score = parseInt(scoreInput.value, 10);
    const earnings = earningsInput.value.trim();

    if (name && !isNaN(score) && earnings) {
      if (players.find(p => p.name.toLowerCase() === name.toLowerCase())) {
        alert("Player with that name already exists.");
        return;
      }
      players.push({ name, score, earnings });
      renderPlayers(searchInput.value);

      nameInput.value = "";
      scoreInput.value = "";
      earningsInput.value = "";
    } else {
      alert("Please fill out all fields correctly.");
    }
  });

  // Tab switching logic
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      tabButtons.forEach(btn => btn.classList.remove("active"));
      tabContents.forEach(content => (content.style.display = "none"));

      button.classList.add("active");
      const tabId = button.getAttribute("data-tab");
      document.getElementById(tabId).style.display = "block";
    });
  });

  // Initial render
  renderPlayers();
  renderTeam();
});
