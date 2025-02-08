document.addEventListener("DOMContentLoaded", () => {
    const pianoContainer = document.getElementById("piano");
    const soundTypeSelector = document.createElement("select");
    
    // Different piano sound options
    const soundTypes = ["soft_piano", "jazz_piano", "electric_piano", "professional_piano"];
    let selectedSoundType = "soft_piano"; // Default sound

    // Create dropdown menu for sound selection
    soundTypes.forEach(type => {
        const option = document.createElement("option");
        option.value = type;
        option.textContent = type.replace("_", " ");
        soundTypeSelector.appendChild(option);
    });

    document.body.insertBefore(soundTypeSelector, pianoContainer);

    soundTypeSelector.addEventListener("change", (e) => {
        selectedSoundType = e.target.value;
    });

    // Define keys for the piano
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

    // Play sound when key is pressed
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
        const audio = new Audio(`sounds/${selectedSoundType}/${note}.mp3`);
        audio.play();
    }
});
