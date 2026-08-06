// ======================================
// SELECT ELEMENTS
// ======================================

const slider = document.getElementById("slider");
const pages = document.querySelectorAll(".page");
const nextButtons = document.querySelectorAll(".next-btn");
const progressBar = document.getElementById("progressBar");

let currentPage = 0;
const totalPages = pages.length;


// ======================================
// UPDATE PAGE
// ======================================

function updatePage() {

    slider.style.transform =
        `translateX(-${currentPage * 100}vw)`;

    const progress =
        ((currentPage + 1) / totalPages) * 100;

    progressBar.style.width = progress + "%";

}


// ======================================
// NEXT BUTTONS
// ======================================

nextButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (currentPage < totalPages - 1) {

            currentPage++;

            updatePage();

        }

    });

});


// ======================================
// KEYBOARD SUPPORT
// ======================================

document.addEventListener("keydown", e => {

    if (e.key === "ArrowRight") {

        if (currentPage < totalPages - 1) {

            currentPage++;

            updatePage();

        }

    }

    if (e.key === "ArrowLeft") {

        if (currentPage > 0) {

            currentPage--;

            updatePage();

        }

    }

});


// ======================================
// MOBILE SWIPE
// ======================================

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", e => {

    touchStartX = e.changedTouches[0].screenX;

});

document.addEventListener("touchend", e => {

    touchEndX = e.changedTouches[0].screenX;

    if (touchStartX - touchEndX > 70) {

        if (currentPage < totalPages - 1) {

            currentPage++;

            updatePage();

        }

    }

    if (touchEndX - touchStartX > 70) {

        if (currentPage > 0) {

            currentPage--;

            updatePage();

        }

    }

});


// ======================================
// MOUSE LIGHT EFFECT
// ======================================

const light = document.createElement("div");

light.style.position = "fixed";
light.style.width = "220px";
light.style.height = "220px";
light.style.borderRadius = "50%";
light.style.pointerEvents = "none";
light.style.background =
"radial-gradient(circle, rgba(255,255,255,.12), transparent 70%)";
light.style.filter = "blur(15px)";
light.style.zIndex = "0";

document.body.appendChild(light);

document.addEventListener("mousemove", e => {

    light.style.left = (e.clientX - 110) + "px";
    light.style.top = (e.clientY - 110) + "px";

});


// ======================================
// PLAYFUL "MAYBE LATER" BUTTON
// ======================================

const noBtn = document.querySelector(".no");

if (noBtn) {

    noBtn.addEventListener("mouseenter", () => {

        const maxX = window.innerWidth - noBtn.offsetWidth - 30;
        const maxY = window.innerHeight - noBtn.offsetHeight - 30;

        const x = Math.random() * maxX;
        const y = Math.random() * maxY;

        noBtn.style.position = "fixed";
        noBtn.style.left = x + "px";
        noBtn.style.top = y + "px";

    });

}


// ======================================
// YES BUTTON
// ======================================

const yesBtn = document.querySelector(".yes");

if (yesBtn) {

    yesBtn.addEventListener("click", () => {

        alert(
`😊

Thank you for reading everything.

No matter what your answer is,
I'm really happy you took the time to read this.

❤️`
        );

    });

}


// ======================================
// INITIALIZE
// ======================================

updatePage();
