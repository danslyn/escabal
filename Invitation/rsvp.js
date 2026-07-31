document.getElementById("rsvpForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const status = document.getElementById("status").value;
  const message = document.getElementById("message").value;

  const guest = { name, email, status, message };

  // Save to localStorage (or send to backend API)
  let guests = JSON.parse(localStorage.getItem("guests")) || [];
  guests.push(guest);
  localStorage.setItem("guests", JSON.stringify(guests));

  document.getElementById("confirmation").textContent =
    `Thank you, ${name}! Your RSVP (${status}) has been recorded.`;

  renderGuestList();
});

function renderGuestList() {
  const guests = JSON.parse(localStorage.getItem("guests")) || [];
  const listEl = document.getElementById("guestList");
  listEl.innerHTML = "";

  guests.forEach(g => {
    const li = document.createElement("li");
    li.textContent = `${g.name} — ${g.status}`;
    listEl.appendChild(li);
  });
}

renderGuestList();
