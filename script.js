document.addEventListener("DOMContentLoaded", () => {
    const pianoContainer = document.getElementById("piano");

    // Define all 88 keys (C, C#, D, D#, etc.)
    const keys = [
        { note: "C0", key: "A" }, { note: "C#0", key: "W" }, { note: "D0", key: "S" }, { note: "D#0", key: "E" }, { note: "E0", key: "D" },
        { note: "F0", key: "F" }, { note: "F#0", key: "T" }, { note: "G0", key: "G" }, { note: "G#0", key: "Y" }, { note: "A0", key: "H" },
        { note: "A#0", key: "U" }, { note: "B0", key: "J" }, { note: "C1", key: "K" }, { note: "C#1", key: "O" }, { note: "D1", key: "L" },
        { note: "D#1", key: ";" }, { note: "E1", key: "'" }, { note: "F1", key: "Z" }, { note: "F#1", key: "X" }, { note: "G1", key: "C" },
        // Repeat for all the 88 keys (C0 to C8)...
    ];

    // Create piano keys dynamically
    keys.forEach(k => {
        const keyElement = document.createElement("div");
        keyElement.classList.add("piano-key");
        keyElement.textContent = k.key;
        keyElement.dataset.note = k.note;
        pianoContainer.appendChild(keyElement);
    });

    // Handle key press events
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

    // Function to play sound
    function playSound(note) {
        const audio = new Audio(`sounds/soft_piano/${note}.mp3`);
        audio.play();
    }
});
