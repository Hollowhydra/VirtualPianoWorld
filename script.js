// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const pianoContainer = document.getElementById("piano");

    // Define the keys for the virtual piano
    const keys = [
        { note: "C", key: "A" },
        { note: "D", key: "S" },
        { note: "E", key: "D" },
        { note: "F", key: "F" },
        { note: "G", key: "G" },
        { note: "A", key: "H" },
        { note: "B", key: "J" },
        { note: "C2", key: "K" }
    ];

    // Create piano keys dynamically
    keys.forEach(k => {
        const keyElement = document.createElement("div");
        keyElement.classList.add("piano-key");
        keyElement.textContent = k.key;
        keyElement.dataset.note = k.note;
        pianoContainer.appendChild(keyElement);
    });

    // Event listener for key presses
    document.addEventListener("keydown", (event) => {
        const keyPressed = event.key.toUpperCase();
        const keyElement = [...document.querySelectorAll(".piano-key")]
            .find(el => el.textContent === keyPressed);

        if (keyElement) {
            keyElement.classList.add("active");
            playSound(keyElement.dataset.note);
        }
    });

    // Remove active class when key is released
    document.addEventListener("keyup", (event) => {
        const keyReleased = event.key.toUpperCase();
        const keyElement = [...document.querySelectorAll(".piano-key")]
            .find(el => el.textContent === keyReleased);

        if (keyElement) {
            keyElement.classList.remove("active");
        }
    });

    // Function to play sound (to be implemented)
    function playSound(note) {
        console.log("Playing note:", note);
        // We will add actual sound files in the next step
    }
});
