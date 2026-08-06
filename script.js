// ======================================
// LOADER
// ======================================

window.addEventListener("load", () => {

    setTimeout(() => {

        document.getElementById("loader").classList.add("hide");

    }, 2800);

});

// ======================================
// SCENES
// ======================================

const scenes = document.querySelectorAll(".scene");

let currentScene = 0;

// ======================================
// SHOW SCENE
// ======================================

function showScene(index) {

    if (index < 0 || index >= scenes.length) return;

    scenes.forEach(scene => {

        scene.classList.remove("active");

    });

    scenes[index].classList.add("active");

    currentScene = index;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

// ======================================
// NEXT BUTTONS
// ======================================

document.querySelectorAll(".nextBtn").forEach(button => {

    button.addEventListener("click", () => {

        showScene(currentScene + 1);

    });

});// ======================================
// FINAL BUTTONS
// ======================================

const yesBtn = document.getElementById("yesBtn");
const timeBtn = document.getElementById("timeBtn");

const successScene = document.getElementById("successScene");
const timeScene = document.getElementById("timeScene");

if (yesBtn) {

    yesBtn.addEventListener("click", () => {

        scenes.forEach(scene => scene.classList.remove("active"));

        successScene.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

if (timeBtn) {

    timeBtn.addEventListener("click", () => {

        scenes.forEach(scene => scene.classList.remove("active"));

        timeScene.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

// ======================================
// KEYBOARD NAVIGATION (OPTIONAL)
// ======================================

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {

        if (currentScene < 9) {

            showScene(currentScene + 1);

        }

    }

    if (event.key === "ArrowLeft") {

        if (currentScene > 0) {

            showScene(currentScene - 1);

        }

    }

});

// ======================================
// FADE IN CONTENT WHEN SCENE CHANGES
// ======================================

const observer = new MutationObserver(() => {

    const active = document.querySelector(".scene.active");

    if (!active) return;

    const content = active.querySelector(".content");

    if (!content) return;

    content.classList.remove("animate");

    void content.offsetWidth;

    content.classList.add("animate");

});

observer.observe(document.getElementById("app"), {
    subtree: true,
    attributes: true,
    attributeFilter: ["class"]
});// ======================================
// FLOATING HEARTS
// ======================================

const heartsContainer = document.querySelector(".floating-hearts");

function createHeart() {

    if (!heartsContainer) return;

    const heart = document.createElement("span");

    heart.innerHTML = Math.random() > 0.5 ? "❤️" : "💖";

    heart.style.position = "absolute";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.bottom = "-30px";

    heart.style.fontSize = (16 + Math.random() * 20) + "px";

    heart.style.opacity = Math.random() * 0.5 + 0.3;

    heart.style.animation = `heartFloat ${5 + Math.random() * 5}s linear forwards`;

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 10000);

}

setInterval(createHeart, 900);

// ======================================
// HEART FLOAT KEYFRAME
// ======================================

const style = document.createElement("style");

style.innerHTML = `
@keyframes heartFloat{
0%{
transform:translateY(0) rotate(0deg);
opacity:0;
}
15%{
opacity:1;
}
100%{
transform:translateY(-120vh) rotate(360deg);
opacity:0;
}
}
`;

document.head.appendChild(style);

// ======================================
// PREVENT DOUBLE CLICK
// ======================================

document.querySelectorAll(".nextBtn").forEach(btn => {

    btn.addEventListener("click", () => {

        btn.disabled = true;

        setTimeout(() => {

            btn.disabled = false;

        }, 500);

    });

});

// ======================================
// INITIAL SCENE
// ======================================

showScene(0);

console.log("Website Loaded Successfully ❤️");
