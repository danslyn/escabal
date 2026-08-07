const form = document.getElementById("rsvpForm");
const buttons = document.querySelectorAll(".rsvp-button");
const attendanceInput = document.getElementById("attendance");
const sendingPopup = document.getElementById("sendingPopup");

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

    } else {

        window.location.href =
            "letscelebrate.html";

    }

}, 3000);
            } else {

                // Hide popup if there was an error
                sendingPopup.style.display = "none";

                alert("There was a problem submitting your RSVP.");

                buttons.forEach(btn => {
                    btn.disabled = false;
                });
            }

        } catch (error) {

            console.error(error);

            // Hide popup
            sendingPopup.style.display = "none";

            alert("Unable to send your RSVP. Please try again.");

            buttons.forEach(btn => {
                btn.disabled = false;
            });
        }

    });

});