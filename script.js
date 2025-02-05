document.addEventListener("DOMContentLoaded", () => {
    const keyMap = {
        '1': 'C', 'Shift+1': 'C#', '2': 'D', 'Shift+2': 'D#', '3': 'E', '4': 'F', 'Shift+4': 'F#', 
        '5': 'G', 'Shift+5': 'G#', '6': 'A', 'Shift+6': 'A#', '7': 'B',
        '8': 'C2', 'Shift+8': 'C#2', '9': 'D2', 'Shift+9': 'D#2', '0': 'E2', 
        'q': 'F2', 'Shift+q': 'F#2', 'w': 'G2', 'Shift+w': 'G#2', 'e': 'A2', 'Shift+e': 'A#2',
        'r': 'B2', 't': 'C3', 'Shift+t': 'C#3', 'y': 'D3', 'Shift+y': 'D#3', 'u': 'E3', 
        'i': 'F3', 'Shift+i': 'F#3', 'o': 'G3', 'Shift+o': 'G#3', 'p': 'A3', 'Shift+p': 'A#3',
        'a': 'B3', 's': 'C4', 'Shift+s': 'C#4', 'd': 'D4', 'Shift+d': 'D#4', 'f': 'E4', 
        'g': 'F4', 'Shift+g': 'F#4', 'h': 'G4', 'Shift+h': 'G#4', 'j': 'A4', 'Shift+j': 'A#4',
        'k': 'B4', 'l': 'C5', 'Shift+l': 'C#5', 'z': 'D5', 'Shift+z': 'D#5', 'x': 'E5', 
        'c': 'F5', 'Shift+c': 'F#5', 'v': 'G5', 'Shift+v': 'G#5', 'b': 'A5', 'Shift+b': 'A#5',
        'n': 'B5', 'm': 'C6'
    };

    const piano = document.getElementById("piano");
    const keyElements = {};

    // Generate piano keys
    Object.entries(keyMap).forEach(([qwertyKey, note]) => {
        const key = document.createElement("div");
        key.className = `key ${note.includes("#") ? "black" : ""}`;
        key.dataset.note = note;
        key.dataset.qwerty = qwertyKey;

        // Label the key with the QWERTY character at the bottom
        const label = document.createElement("span");
        label.innerText = qwertyKey.replace("Shift+", ""); // Display without "Shift+"
        key.appendChild(label);

        // Click event
        key.addEventListener("mousedown", () => pressKey(qwertyKey));
        key.addEventListener("mouseup", () => releaseKey(qwertyKey));
        key.addEventListener("mouseleave", () => releaseKey(qwertyKey));

        piano.appendChild(key);
        keyElements[qwertyKey] = key;
    });

    document.addEventListener("keydown", (event) => {
        let key = event.key;
        if (event.shiftKey) key = `Shift+${key}`;
        if (keyElements[key]) pressKey(key);
    });

    document.addEventListener("keyup", (event) => {
        let key = event.key;
        if (event.shiftKey) key = `Shift+${key}`;
        if (keyElements[key]) releaseKey(key);
    });

    function pressKey(qwertyKey) {
        if (!keyElements[qwertyKey]) return;
        keyElements[qwertyKey].classList.add("pressed");
        playSound(keyMap[qwertyKey]);
    }

    function releaseKey(qwertyKey) {
        if (keyElements[qwertyKey]) {
            keyElements[qwertyKey].classList.remove("pressed");
        }
    }

    function playSound(note) {
        let audio = new Audio(`sounds/${note}.mp3`);
        audio.play().catch(err => console.warn(`Error playing ${note}:`, err));
    }
});
