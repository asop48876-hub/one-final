// ==========================================
// LOADING SCREEN
// ==========================================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        },800);

    },3000);

});


// ==========================================
// NAME POPUP
// ==========================================

const popup = document.getElementById("popup");

const continueBtn = document.getElementById("continueBtn");

const username = document.getElementById("username");

const greeting = document.getElementById("greeting");


continueBtn.addEventListener("click",()=>{


    let name = username.value.trim();


    if(name === ""){

        alert("Please enter your name 🌻");

        return;

    }


    popup.style.display="none";


    greeting.innerHTML = 
    `Welcome, ${name} 🌸`;


    startTyping();


});


// ==========================================
// TYPEWRITER EFFECT
// ==========================================

const typingText = 
"Happy Friendship Day Priyanka 🌻";


let index = 0;


function startTyping(){


    const typing =
    document.getElementById("typing");


    typing.innerHTML="";


    index=0;


    function type(){


        if(index < typingText.length){


            typing.innerHTML += 
            typingText.charAt(index);


            index++;

            setTimeout(type,100);


        }


    }


    type();


}



// ==========================================
// STAR WISHES
// ==========================================


const wishes=[

"May your life always be filled with happiness ✨",

"Keep smiling and shining always 🌻",

"May every dream come true 🌸",

"Thank you for being a wonderful friend 💛",

"May beautiful moments always find you ⭐",

"Stay exactly the amazing person you are 🌷"

];


const stars =
document.querySelectorAll(".wish");


const wishText =
document.getElementById("wishText");



stars.forEach((star,index)=>{


    star.addEventListener("click",()=>{


        wishText.innerHTML =
        wishes[index];


        star.style.transform =
        "scale(1.4)";


        setTimeout(()=>{

            star.style.transform="";

        },500);


    });


});



// ==========================================
// ENVELOPE OPENING
// ==========================================


const openLetter =
document.getElementById("openLetter");


const envelopeSection =
document.getElementById("envelopeSection");


const envelope =
document.querySelector(".envelope");



openLetter.addEventListener("click",()=>{


    envelopeSection.style.display="flex";


    setTimeout(()=>{


        envelope.classList.add("open");


    },300);


    envelopeSection.scrollIntoView({

        behavior:"smooth"

    });


});



// ==========================================
// CLICK ENVELOPE AGAIN
// ==========================================


envelope.addEventListener("click",()=>{


    envelope.classList.toggle("open");


});



// ==========================================
// FLOATING PARTICLES
// ==========================================


function createParticle(){


    const particle =
    document.createElement("div");


    particle.innerHTML="✨";


    particle.style.position="fixed";

    particle.style.left =
    Math.random()*100+"vw";


    particle.style.top="100vh";


    particle.style.fontSize =
    Math.random()*20+10+"px";


    particle.style.opacity =
    Math.random();


    particle.style.transition =
    "transform 8s linear, opacity 8s";


    document.body.appendChild(particle);



    setTimeout(()=>{


        particle.style.transform =
        "translateY(-120vh)";


        particle.style.opacity=0;


    },100);



    setTimeout(()=>{


        particle.remove();


    },8000);



}



setInterval(createParticle,1200);



// ==========================================
// BUTTON SMOOTH SCROLL
// ==========================================


const beginBtn =
document.getElementById("beginJourney");


beginBtn.addEventListener("click",()=>{


    document.querySelector(".section")
    .scrollIntoView({

        behavior:"smooth"

    });


});
