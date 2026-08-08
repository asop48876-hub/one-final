/* =========================================================
   PROPOSAL WEBSITE
   SCRIPT.JS — PART 1/2
   Horizontal Page Navigation
========================================================= */


/* ---------------------------------------------------------
   1. GET THE MAIN SLIDER
--------------------------------------------------------- */

const slider = document.getElementById("slider");


/* ---------------------------------------------------------
   2. GET ALL PAGES
--------------------------------------------------------- */

const pages = document.querySelectorAll(".page");


/* ---------------------------------------------------------
   3. GET ALL NEXT BUTTONS
--------------------------------------------------------- */

const nextButtons =
    document.querySelectorAll(".next-btn");


/* ---------------------------------------------------------
   4. CURRENT PAGE
--------------------------------------------------------- */

let currentPage = 0;


/* ---------------------------------------------------------
   5. NAVIGATION LOCK
   Prevents multiple clicks during a transition.
--------------------------------------------------------- */

let isMoving = false;


/* ---------------------------------------------------------
   6. MOVE TO A PAGE
--------------------------------------------------------- */

function moveToPage(pageNumber) {

    /* Stop if the slider doesn't exist. */

    if (!slider) {
        return;
    }


    /* Stop if the requested page doesn't exist. */

    if (
        pageNumber < 0 ||
        pageNumber >= pages.length
    ) {
        return;
    }


    /* Stop accidental repeated navigation. */

    if (isMoving) {
        return;
    }


    /* Nothing to do if we're already there. */

    if (pageNumber === currentPage) {
        return;
    }


    isMoving = true;


    /* Calculate the horizontal position. */

    const position =
        pageNumber * 100;


    /* Move the entire slider horizontally. */

    slider.style.transform =
        `translateX(-${position}%)`;


    /* Remember the current page. */

    currentPage = pageNumber;


    /*
        Wait for the CSS transition to finish
        before allowing another movement.
    */

    setTimeout(() => {

        isMoving = false;

    }, 900);

}


/* ---------------------------------------------------------
   7. NEXT PAGE
--------------------------------------------------------- */

function goToNextPage() {

    const nextPage =
        currentPage + 1;


    if (
        nextPage >= pages.length
    ) {
        return;
    }


    moveToPage(nextPage);

}


/* ---------------------------------------------------------
   8. NEXT BUTTONS
--------------------------------------------------------- */

nextButtons.forEach(button => {

    button.addEventListener(
        "click",
        goToNextPage
    );

});


/* ---------------------------------------------------------
   9. KEYBOARD NAVIGATION
--------------------------------------------------------- */

document.addEventListener(
    "keydown",
    (event) => {

        /*
            Right arrow = next page.
        */

        if (
            event.key === "ArrowRight"
        ) {

            goToNextPage();

        }

    }
);


/* ---------------------------------------------------------
   10. PREVENT HORIZONTAL / VERTICAL PAGE SCROLLING
--------------------------------------------------------- */

window.addEventListener(
    "wheel",
    (event) => {

        event.preventDefault();

    },
    {
        passive: false
    }
);


/* ---------------------------------------------------------
   11. PREVENT SPACE / ARROW SCROLLING
--------------------------------------------------------- */

window.addEventListener(
    "keydown",
    (event) => {

        const blockedKeys = [
            "ArrowUp",
            "ArrowDown",
            "PageUp",
            "PageDown",
            "Home",
            "End",
            " "
        ];


        if (
            blockedKeys.includes(
                event.key
            )
        ) {

            event.preventDefault();

        }

    }
);


/* ---------------------------------------------------------
   12. INITIAL POSITION
--------------------------------------------------------- */

function initializeSlider() {

    if (!slider) {
        return;
    }


    currentPage = 0;


    slider.style.transform =
        "translateX(0%)";

}


/* ---------------------------------------------------------
   13. START
--------------------------------------------------------- */

initializeSlider();


/* =========================================================
   END OF SCRIPT.JS — PART 1/2
========================================================= *//* =========================================================
   SCRIPT.JS — PART 2/2
   Final Buttons + Touch Navigation
========================================================= */


/* ---------------------------------------------------------
   14. FINAL ANSWER BUTTONS
--------------------------------------------------------- */

const yesButton =
    document.getElementById("yesButton");

const thinkButton =
    document.getElementById("thinkButton");

const response =
    document.getElementById("response");


/* ---------------------------------------------------------
   15. SHOW FINAL RESPONSE
--------------------------------------------------------- */

function showResponse(message) {

    if (!response) {
        return;
    }


    response.textContent = message;

    response.classList.add("show");

}


/* ---------------------------------------------------------
   16. YES BUTTON
--------------------------------------------------------- */

if (yesButton) {

    yesButton.addEventListener(
        "click",
        () => {

            showResponse(
                "You just made me smile. ♡"
            );

            yesButton.disabled = true;

            if (thinkButton) {
                thinkButton.disabled = true;
            }

        }
    );

}


/* ---------------------------------------------------------
   17. THINK BUTTON
--------------------------------------------------------- */

if (thinkButton) {

    thinkButton.addEventListener(
        "click",
        () => {

            showResponse(
                "Take all the time you need. "
                + "Whatever you decide, thank you "
                + "for reading this. ♡"
            );

            thinkButton.disabled = true;

            if (yesButton) {
                yesButton.disabled = true;
            }

        }
    );

}


/* ---------------------------------------------------------
   18. TOUCH / SWIPE VARIABLES
--------------------------------------------------------- */

let touchStartX = 0;

let touchEndX = 0;


/* ---------------------------------------------------------
   19. TOUCH START
--------------------------------------------------------- */

document.addEventListener(
    "touchstart",
    (event) => {

        if (!event.changedTouches.length) {
            return;
        }


        touchStartX =
            event.changedTouches[0].screenX;

    },
    {
        passive: true
    }
);


/* ---------------------------------------------------------
   20. TOUCH END
--------------------------------------------------------- */

document.addEventListener(
    "touchend",
    (event) => {

        if (!event.changedTouches.length) {
            return;
        }


        touchEndX =
            event.changedTouches[0].screenX;


        handleSwipe();

    },
    {
        passive: true
    }
);


/* ---------------------------------------------------------
   21. HANDLE HORIZONTAL SWIPE
--------------------------------------------------------- */

function handleSwipe() {

    const distance =
        touchEndX - touchStartX;


    const minimumSwipe = 60;


    /*
        Swipe from right to left:
        move forward.
    */

    if (
        distance < -minimumSwipe
    ) {

        goToNextPage();

    }

}


/* ---------------------------------------------------------
   22. PREVENT IMAGE DRAGGING
--------------------------------------------------------- */

document.addEventListener(
    "dragstart",
    (event) => {

        event.preventDefault();

    }
);


/* ---------------------------------------------------------
   23. KEEP PAGE AT TOP
--------------------------------------------------------- */

window.addEventListener(
    "load",
    () => {

        window.scrollTo(
            0,
            0
        );

    }
);


/* ---------------------------------------------------------
   24. FINAL SAFETY CHECK
--------------------------------------------------------- */

if (!slider) {

    console.error(
        "Proposal website: slider element not found."
    );

}


/* =========================================================
   SCRIPT.JS COMPLETE
========================================================= */
