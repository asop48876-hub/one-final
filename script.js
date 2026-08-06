// =====================================================
// SCRIPT.JS - PART 1
// Loader
// Music
// Scene Navigation
// Mouse Glow
// Falling Petals
// Shooting Stars
// =====================================================



// =====================================================
// LOADER
// =====================================================

window.addEventListener("load",()=>{

    const loader=document.getElementById("loader");

    setTimeout(()=>{

        loader.style.opacity="0";

        setTimeout(()=>{

            loader.style.display="none";

        },1000);

    },3000);

});



// =====================================================
// MUSIC
// =====================================================

const music=document.getElementById("bgMusic");

const musicBtn=document.getElementById("musicBtn");

let playing=false;

musicBtn.addEventListener("click",()=>{

    if(!playing){

        music.play();

        musicBtn.innerHTML="🔇 Mute";

        playing=true;

    }

    else{

        music.pause();

        musicBtn.innerHTML="🔊 Music";

        playing=false;

    }

});



// =====================================================
// SCENE NAVIGATION
// =====================================================

const scenes=document.querySelectorAll(".scene");

const nextButtons=document.querySelectorAll(".nextBtn");

let currentScene=0;

nextButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        nextScene();

    });

});



function nextScene(){

    if(currentScene>=scenes.length-1){

        return;

    }

    scenes[currentScene].classList.remove("active");

    scenes[currentScene].classList.add("exit");

    currentScene++;

    scenes[currentScene].classList.add("active");

}



// =====================================================
// CURSOR GLOW
// =====================================================

const glow=document.createElement("div");

glow.className="cursor-glow";

document.body.appendChild(glow);

document.addEventListener("mousemove",(e)=>{

    glow.style.left=e.clientX+"px";

    glow.style.top=e.clientY+"px";

});



// =====================================================
// FALLING PETALS
// =====================================================

function createPetal(){

    const petal=document.createElement("div");

    petal.className="petal";

    petal.innerHTML="🌸";

    petal.style.left=Math.random()*100+"vw";

    petal.style.fontSize=(18+Math.random()*18)+"px";

    petal.style.animationDuration=(8+Math.random()*8)+"s";

    document.body.appendChild(petal);

    setTimeout(()=>{

        petal.remove();

    },16000);

}

setInterval(createPetal,700);



// =====================================================
// SHOOTING STARS
// =====================================================

function shootingStar(){

    const star=document.createElement("div");

    star.className="shooting-star";

    star.style.top=Math.random()*300+"px";

    star.style.left=(window.innerWidth+150)+"px";

    document.body.appendChild(star);

    setTimeout(()=>{

        star.remove();

    },2200);

}

setInterval(shootingStar,6000);



// =====================================================
// TYPEWRITER EFFECT
// =====================================================

const typing=document.querySelector(".typing");

const originalText=typing.innerHTML;

typing.innerHTML="";

let i=0;

function typeWriter(){

    if(i<originalText.length){

        typing.innerHTML+=originalText.charAt(i);

        i++;

        setTimeout(typeWriter,70);

    }

}

setTimeout(typeWriter,1200);



// =====================================================
// SCENE FADE-IN
// =====================================================

function animateScene(index){

    const content=scenes[index].querySelector(".content");

    if(content){

        content.style.opacity="0";

        content.style.transform="translateY(40px)";

        setTimeout(()=>{

            content.style.transition="1s";

            content.style.opacity="1";

            content.style.transform="translateY(0)";

        },100);

    }

}

animateScene(0);



// =====================================================
// RE-ANIMATE EVERY SCENE
// =====================================================

nextButtons.forEach(btn=>{

    btn.addEventListener("click",()=>{

        setTimeout(()=>{

            animateScene(currentScene);

        },350);

    });

});



// =====================================================
// PREVENT DOUBLE CLICK
// =====================================================

let canClick=true;

function nextScene(){

    if(!canClick)return;

    canClick=false;

    if(currentScene>=scenes.length-1){

        return;

    }

    scenes[currentScene].classList.remove("active");

    scenes[currentScene].classList.add("exit");

    currentScene++;

    scenes[currentScene].classList.add("active");

    setTimeout(()=>{

        canClick=true;

    },850);

}// =====================================================
// SCRIPT.JS - PART 2
// Envelope
// Final Buttons
// Confetti
// Success / Time Screens
// =====================================================



// =====================================================
// ENVELOPE OPENING
// =====================================================

const envelope = document.querySelector(".envelope");
const openLetterBtn = document.getElementById("openLetter");

if (openLetterBtn && envelope) {

    openLetterBtn.addEventListener("click", () => {

        envelope.classList.toggle("open");

        if (envelope.classList.contains("open")) {

            openLetterBtn.innerHTML = "Close Letter 💌";

        } else {

            openLetterBtn.innerHTML = "Open Letter 💌";

        }

    });

}



// =====================================================
// YES & NEED TIME BUTTONS
// =====================================================

const yesBtn = document.getElementById("yesBtn");
const timeBtn = document.getElementById("timeBtn");

const successScene = document.getElementById("successScene");
const timeScene = document.getElementById("timeScene");



function showScene(scene) {

    scenes.forEach((item) => {

        item.classList.remove("active");
        item.classList.remove("exit");

    });

    scene.classList.add("active");

}



// =====================================================
// YES BUTTON
// =====================================================

if (yesBtn) {

    yesBtn.addEventListener("click", () => {

        launchConfetti();

        setTimeout(() => {

            showScene(successScene);

        }, 1200);

    });

}



// =====================================================
// NEED TIME BUTTON
// =====================================================

if (timeBtn) {

    timeBtn.addEventListener("click", () => {

        showScene(timeScene);

    });

}



// =====================================================
// SIMPLE CONFETTI
// =====================================================

function launchConfetti() {

    for (let i = 0; i < 180; i++) {

        createConfetti();

    }

}



function createConfetti() {

    const confetti = document.createElement("div");

    confetti.className = "confetti";

    const colors = [

        "#FFD166",
        "#EF476F",
        "#06D6A0",
        "#118AB2",
        "#FFFFFF",
        "#F472B6",
        "#8B5CF6"

    ];

    confetti.style.background =
        colors[Math.floor(Math.random() * colors.length)];

    confetti.style.left =
        Math.random() * window.innerWidth + "px";

    confetti.style.top = "-20px";

    confetti.style.width =
        (6 + Math.random() * 8) + "px";

    confetti.style.height =
        (10 + Math.random() * 12) + "px";

    confetti.style.transform =
        "rotate(" + Math.random() * 360 + "deg)";

    confetti.style.animationDuration =
        (3 + Math.random() * 3) + "s";

    document.body.appendChild(confetti);

    setTimeout(() => {

        confetti.remove();

    }, 7000);

}



// =====================================================
// FLOATING HEARTS
// =====================================================

function createHeart() {

    const heart = document.createElement("div");

    heart.className = "floating-heart";

    heart.innerHTML = "❤️";

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.fontSize =
        (18 + Math.random() * 25) + "px";

    heart.style.animationDuration =
        (4 + Math.random() * 4) + "s";

    document.body.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 8000);

}



// Hearts only after YES

if (yesBtn) {

    yesBtn.addEventListener("click", () => {

        const heartInterval = setInterval(createHeart, 250);

        setTimeout(() => {

            clearInterval(heartInterval);

        }, 6000);

    });

}



// =====================================================
// BUTTON HOVER GLOW
// =====================================================

document.querySelectorAll("button").forEach((btn) => {

    btn.addEventListener("mouseenter", () => {

        btn.style.boxShadow =
            "0 0 25px rgba(255,209,102,.45)";

    });

    btn.addEventListener("mouseleave", () => {

        btn.style.boxShadow = "";

    });

});



// =====================================================
// KEYBOARD SUPPORT
// =====================================================

document.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        const activeScene = document.querySelector(".scene.active");

        if (!activeScene) return;

        const nextButton = activeScene.querySelector(".nextBtn");

        if (nextButton) {

            nextButton.click();

        }

    }

});



// =====================================================
// END OF PART 2
// =====================================================// =====================================================
// SCRIPT.JS - PART 3
// Premium Effects
// Scene Improvements
// Extra Animations
// Final Polish
// =====================================================



// =====================================================
// SCENE CONTENT ANIMATION OBSERVER
// =====================================================

function revealSceneContent(){

    const activeScene = document.querySelector(".scene.active");

    if(!activeScene) return;


    const elements =
    activeScene.querySelectorAll(
        "h1, h2, h3, p, button, .quality, .memory-card"
    );


    elements.forEach((element,index)=>{

        element.style.opacity="0";

        element.style.transform=
        "translateY(40px)";


        setTimeout(()=>{

            element.style.transition=
            "1s ease";


            element.style.opacity="1";

            element.style.transform=
            "translateY(0)";


        },index*150);


    });

}



document.querySelectorAll(".nextBtn")
.forEach(button=>{

    button.addEventListener("click",()=>{

        setTimeout(()=>{

            revealSceneContent();

        },700);

    });

});



// =====================================================
// RANDOM STAR TWINKLE
// =====================================================

function createTwinkle(){

    const star=document.createElement("div");

    star.className="twinkle-star";

    star.style.left=
    Math.random()*100+"vw";

    star.style.top=
    Math.random()*100+"vh";


    star.style.animationDuration=
    (1+Math.random()*3)+"s";


    document.body.appendChild(star);


    setTimeout(()=>{

        star.remove();

    },4000);

}


setInterval(createTwinkle,500);



// =====================================================
// RANDOM BACKGROUND GLOW
// =====================================================

const colors=[

    "rgba(244,114,182,.25)",

    "rgba(139,92,246,.25)",

    "rgba(96,165,250,.25)"

];


function changeAurora(){

    const aurora=
    document.querySelector(".aurora");


    if(aurora){

        aurora.style.background=

        `
        radial-gradient(
        circle,
        ${colors[Math.floor(Math.random()*colors.length)]},
        transparent 60%
        )
        `;

    }

}


setInterval(changeAurora,8000);



// =====================================================
// CLICK SPARK EFFECT
// =====================================================

document.addEventListener("click",(e)=>{


    const spark=document.createElement("span");


    spark.className="click-spark";


    spark.style.left=
    e.clientX+"px";


    spark.style.top=
    e.clientY+"px";


    document.body.appendChild(spark);


    setTimeout(()=>{

        spark.remove();

    },800);


});



// =====================================================
// AUTO CREATE PETAL BURST ON SCENE CHANGE
// =====================================================

function petalBurst(){


    for(let i=0;i<20;i++){


        const petal=document.createElement("div");


        petal.className="petal";


        petal.innerHTML="🌸";


        petal.style.left=
        Math.random()*window.innerWidth+"px";


        petal.style.top=
        "50%";


        petal.style.animationDuration=
        "3s";


        document.body.appendChild(petal);


        setTimeout(()=>{

            petal.remove();

        },3000);


    }

}



document.querySelectorAll(".nextBtn")
.forEach(btn=>{

    btn.addEventListener("click",()=>{

        petalBurst();

    });

});



// =====================================================
// FINAL SCENE ATMOSPHERE
// =====================================================

if(yesBtn){

    yesBtn.addEventListener("click",()=>{


        document.body.style.transition=
        "2s";


        document.body.style.background=
        "#14001f";


    });

}



// =====================================================
// DISABLE RIGHT CLICK (OPTIONAL)
// =====================================================

document.addEventListener(
"contextmenu",
(event)=>{

    event.preventDefault();

});



// =====================================================
// PAGE START EFFECT
// =====================================================

window.addEventListener("load",()=>{

    setTimeout(()=>{

        revealSceneContent();

    },3200);

});



// =====================================================
// PROJECT COMPLETE
// =====================================================
