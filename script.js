document.addEventListener("DOMContentLoaded", () => {
    const keyMap = {
        '1': 'C', '!': 'C#', '2': 'D', '@': 'D#', '3': 'E', '4': 'F', '$': 'F#', '5': 'G', '%': 'G#', 
        '6': 'A', '^': 'A#', '7': 'B', '8': 'C2', '*': 'C#2', '9': 'D2', '(': 'D#2', '0': 'E2', 
        'q': 'F2', 'Q': 'F#2', 'w': 'G2', 'W': 'G#2', 'e': 'A2', 'E': 'A#2', 'r': 'B2', 
        't': 'C3', 'T': 'C#3', 'y': 'D3', 'Y': 'D#3', 'u': 'E3', 'i': 'F3', 'I': 'F#3', 
        'o': 'G3', 'O': 'G#3', 'p': 'A3', 'P': 'A#3', 'a': 'B3', 's': 'C4', 'S': 'C#4', 
        'd': 'D4', 'D': 'D#4', 'f': 'E4', 'g': 'F4', 'G': 'F#4', 'h': 'G4', 'H': 'G#4', 
        'j': 'A4', 'J': 'A#4', 'k': 'B4', 'l': 'C5', 'L': 'C#5', 'z': 'D5', 'Z': 'D#5', 
        'x': 'E5', 'c': 'F5', 'C': 'F#5', 'v': 'G5', 'V': 'G#5', 'b': 'A5', 'B': 'A#5', 
        'n': 'B5', 'm': 'C6'
    };

    const piano = document.getElementById("piano");
    const keyElements = {};
    const whiteKeys = [];
    const blackKeys = [];

    // keys
    Object.entries(keyMap).forEach(([qwertyKey, note]) => {
        const key = document.createElement("div");
        key.className = `key ${note.includes("#") ? "black" : ""}`;
        key.dataset.note = note;
        key.dataset.qwerty = qwertyKey;

        // problem here, work on it
        const label = document.createElement("span");
        label.innerText = note.includes("#") ? `[${qwertyKey}]` : qwertyKey;
        key.appendChild(label);

        if (note.includes("#")) {
            blackKeys.push({ key, qwertyKey });
        } else {
            whiteKeys.push({ key, qwertyKey });
        }

        // piano Click effect
        key.addEventListener("mousedown", () => pressKey(qwertyKey));
        key.addEventListener("mouseup", () => releaseKey(qwertyKey));
        key.addEventListener("mouseleave", () => releaseKey(qwertyKey));

        piano.appendChild(key);
        keyElements[qwertyKey] = key;
    });

    // black keys still arnt set right, needs fixed
    const whiteKeyWidth = 40;
    blackKeys.forEach(({ key, qwertyKey }) => {
        const whiteKeyIndex = Object.keys(keyMap).indexOf(qwertyKey) - 1;
        const offset = (whiteKeyIndex * whiteKeyWidth) + (whiteKeyWidth * 0.65);
        key.style.position = "absolute";
        key.style.left = `${offset}px`;
        key.style.marginLeft = "-15px";
        piano.appendChild(key);
    });

    document.addEventListener("keydown", (event) => {
        const key = event.key;
        if (keyElements[key]) pressKey(key);
    });

    document.addEventListener("keyup", (event) => {
        const key = event.key;
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
