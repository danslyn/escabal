const form = document.getElementById("rsvpForm");
const buttons = document.querySelectorAll(".rsvp-button");
const attendanceInput = document.getElementById("attendance");
const sendingPopup = document.getElementById("sendingPopup");

const errorPopup = document.getElementById("errorPopup");
const errorMessage = document.getElementById("errorMessage");
const errorOkButton = document.getElementById("errorOkButton");

function showError(message) {
    errorMessage.textContent = message;
    errorPopup.style.display = "flex";
}

errorOkButton.addEventListener("click", function () {
    errorPopup.style.display = "none";
});

buttons.forEach(button => {

    button.addEventListener("click", async function () {

        // Check if name was entered
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Get YES or NO
        const attendance = this.dataset.attendance;

        // Save the response
        attendanceInput.value = attendance;

        // Show Sending popup
        sendingPopup.style.display = "flex";

        // Disable buttons
        buttons.forEach(btn => {
            btn.disabled = true;
        });

        const formData = new FormData(form);

        try {

            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {

                // Redirect after successful submission
              // Wait 5 seconds before redirecting
setTimeout(() => {

    if (attendance === "YES") {

        window.location.href =
            "letscelebrate.html";

    } //else {

       // window.location.href =
           // "letscelebrate.html";

  //  }

}, 3000);
            } else {

    // Hide popup if there was an error
    sendingPopup.style.display = "none";

    showError("Hal, Bat kaya hindi nag send?");

    buttons.forEach(btn => {
        btn.disabled = false;
    });
}

} catch (error) {

    console.error(error);

    // Hide popup
    sendingPopup.style.display = "none";

    showError("Ngek, hindi nag-send. Ulitin mo!");

    buttons.forEach(btn => {
        btn.disabled = false;
    });
}

    });

});

const noButton = document.getElementById("noButton");

document.addEventListener("mousemove", function(e) {

    const rect = noButton.getBoundingClientRect();

    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
        Math.pow(e.clientX - buttonCenterX, 2) +
        Math.pow(e.clientY - buttonCenterY, 2)
    );

    if (distance < 100) {

        const maxX = window.innerWidth - noButton.offsetWidth - 20;
        const maxY = window.innerHeight - noButton.offsetHeight - 20;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        noButton.style.position = "fixed";
        noButton.style.left = randomX + "px";
        noButton.style.top = randomY + "px";
    }
});

const darkOverlay = document.getElementById("darkOverlay");

document.addEventListener("mousemove", function (e) {

    const element = document.elementFromPoint(e.clientX, e.clientY);

    // Only protect the name input and RSVP buttons
    const protectedArea = element.closest(
        ".form input, .rsvp-button"
    );

    if (protectedArea) {

        // Hide the reveal circle
        const hiddenMask =
            "radial-gradient(circle 0px at 50% 50%, transparent 0%, #000 0%)";

        darkOverlay.style.webkitMaskImage = hiddenMask;
        darkOverlay.style.maskImage = hiddenMask;

        return;
    }

    // Show reveal circle everywhere else
    const x = e.clientX;
    const y = e.clientY;

    const mask = `
        radial-gradient(
            circle 180px at ${x}px ${y}px,
            transparent 0%,
            transparent 60%,
            black 100%
        )
    `;

    darkOverlay.style.webkitMaskImage = mask;
    darkOverlay.style.maskImage = mask;
});

const nameInput = document.getElementById("name");

nameInput.addEventListener("invalid", function () {
    this.setCustomValidity("Uy! Ilagay mo muna pangalan mo. 😆");
});

nameInput.addEventListener("input", function () {
    this.setCustomValidity("");
});