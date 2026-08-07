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