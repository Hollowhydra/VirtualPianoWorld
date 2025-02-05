document.addEventListener("DOMContentLoaded", () => {
    const keyMap = {
        '1': 'C', '!': 'C#', '2': 'D', '@': 'D#', '3': 'E', '4': 'F', '$': 'F#', '5': 'G', '%': 'G#', '6': 'A', '^': 'A#', '7': 'B',
        '8': 'C2', '*': 'C#2', '9': 'D2', '(': 'D#2', '0': 'E2', 'q': 'F2', 'Q': 'F#2', 'w': 'G2', 'W': 'G#2', 'e': 'A2', 'E': 'A#2',
        'r': 'B2', 't': 'C3', 'T': 'C#3', 'y': 'D3', 'Y': 'D#3', 'u': 'E3', 'i': 'F3', 'I': 'F#3', 'o': 'G3', 'O': 'G#3', 'p': 'A3', 'P': 'A#3',
        'a': 'B3', 's': 'C4', 'S': 'C#4', 'd': 'D4', 'D': 'D#4', 'f': 'E4', 'g': 'F4', 'G': 'F#4', 'h': 'G4', 'H': 'G#4', 'j': 'A4', 'J': 'A#4',
        'k': 'B4', 'l': 'C5', 'L': 'C#5', 'z': 'D5', 'Z': 'D#5', 'x': 'E5', 'c': 'F5', 'C': 'F#5', 'v': 'G5', 'V': 'G#5', 'b': 'A5', 'B': 'A#5',
        'n': 'B5', 'm': 'C6'
    };

    const audioCache = {};

    document.addEventListener("keydown", (event) => {
        event.preventDefault(); // Prevent default key actions

        const note = keyMap[event.key];
        if (note) {
            playSound(note);
        }
    });

    function playSound(note) {
        if (!audioCache[note]) {
            audioCache[note] = new Audio(`https://piano-sounds.com/${note}.mp3`);
        }

        const audio = audioCache[note].cloneNode(); // Clone to allow overlapping sounds
        audio.play().catch(err => console.warn(`Error playing ${note}:`, err));
    }
});
