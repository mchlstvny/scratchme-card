const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");

// Match canvas size to the postcard
const postcard = document.querySelector(".postcard");
canvas.width = postcard.clientWidth;
canvas.height = postcard.clientHeight;

// Load the overlay image (scratch layer)
const img = new Image();
img.src = "scratchAssets/scratchme.gif"; // The black & white image
img.onload = function () {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};

// Scratch effect
let isScratching = false;
let lastX = null, lastY = null;

// Helper function to get correct cursor position
function getCursorPosition(e) {
    const rect = canvas.getBoundingClientRect(); // Get actual rendered size
    const scaleX = canvas.width / rect.width;   // Scale factor for width
    const scaleY = canvas.height / rect.height; // Scale factor for height

    return {
        x: ((e.clientX || e.touches[0].clientX) - rect.left) * scaleX,
        y: ((e.clientY || e.touches[0].clientY) - rect.top) * scaleY
    };
}

// Start scratching
canvas.addEventListener("mousedown", (e) => {
    isScratching = true;
    const { x, y } = getCursorPosition(e);
    lastX = x;
    lastY = y;
    scratch(x, y, true);
});

canvas.addEventListener("mousemove", (e) => {
    if (!isScratching) return;
    const { x, y } = getCursorPosition(e);
    scratch(x, y, false);
});

canvas.addEventListener("mouseup", () => {
    isScratching = false;
});

canvas.addEventListener("mouseleave", () => {
    isScratching = false;
});

function scratch(x, y, isFirst) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 100; // Adjust stroke width
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (isFirst) {
        ctx.beginPath();
        ctx.arc(x, y, 100, 0, Math.PI * 2); // Draw a small circle at the start
        ctx.fill();
    } else {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
    }

    lastX = x;
    lastY = y;
}

window.onload = function () {
    triggerConfetti(); // Confetti triggers when the page loads
};

// Function to trigger confetti
function triggerConfetti() {
    const defaults = {
        spread: 360,
        ticks: 100,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["heart"],
        colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
    };

    confetti({
        ...defaults,
        particleCount: 50,
        scalar: 2,
    });

    confetti({
        ...defaults,
        particleCount: 35,
        scalar: 3,
    });

    confetti({
        ...defaults,
        particleCount: 20,
        scalar: 4,
    });
}

