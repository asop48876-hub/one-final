/* =========================================================
   A LITTLE SOMETHING FOR YOU
   script.js
   Single clean JavaScript file
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------------
       GET ELEMENTS
    ----------------------------------------------------- */

    const slider = document.getElementById("slider");
    const pages = document.querySelectorAll(".page");
    const nextButtons = document.querySelectorAll(".next-btn");

    const yesButton = document.getElementById("yesButton");
    const thinkButton = document.getElementById("thinkButton");
    const response = document.getElementById("response");


    /* -----------------------------------------------------
       BASIC CHECK
    ----------------------------------------------------- */

    if (!slider || pages.length === 0) {
        console.error(
            "Proposal website: required page elements are missing."
        );
        return;
    }


    /* -----------------------------------------------------
       PAGE STATE
    ----------------------------------------------------- */

    let currentPage = 0;
    let isMoving = false;

    const transitionTime = 850;


    /* -----------------------------------------------------
       MOVE TO PAGE
    ----------------------------------------------------- */

    function moveToPage(pageNumber) {

        if (isMoving) {
            return;
        }

        if (
            pageNumber < 0 ||
            pageNumber >= pages.length
        ) {
            return;
        }

        if (pageNumber === currentPage) {
            return;
        }

        isMoving = true;

        slider.style.transform =
            `translateX(-${pageNumber * 100}%)`;

        currentPage = pageNumber;

        window.setTimeout(() => {
            isMoving = false;
        }, transitionTime);
    }


    /* -----------------------------------------------------
       NEXT PAGE
    ----------------------------------------------------- */

    function nextPage() {

        if (
            currentPage < pages.length - 1
        ) {
            moveToPage(currentPage + 1);
        }
    }


    /* -----------------------------------------------------
       NEXT BUTTONS
    ----------------------------------------------------- */

    nextButtons.forEach((button) => {

        button.addEventListener("click", nextPage);

    });


    /* -----------------------------------------------------
       FINAL "YES" BUTTON
    ----------------------------------------------------- */

    if (yesButton && response) {

        yesButton.addEventListener("click", () => {

            response.textContent =
                "You just made me smile. ♡";

            response.classList.add("show");

            yesButton.disabled = true;

            if (thinkButton) {
                thinkButton.disabled = true;
            }

        });

    }


    /* -----------------------------------------------------
       FINAL "LET ME THINK" BUTTON
    ----------------------------------------------------- */

    if (thinkButton && response) {

        thinkButton.addEventListener("click", () => {

            response.textContent =
                "Take all the time you need. " +
                "Whatever you decide, thank you " +
                "for reading this. ♡";

            response.classList.add("show");

            thinkButton.disabled = true;

            if (yesButton) {
                yesButton.disabled = true;
            }

        });

    }


    /* -----------------------------------------------------
       SIMPLE LEFT-SWIPE SUPPORT
       Swipe right-to-left to go forward.
    ----------------------------------------------------- */

    let touchStartX = 0;

    document.addEventListener(
        "touchstart",
        (event) => {

            if (event.changedTouches.length === 0) {
                return;
            }

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    document.addEventListener(
        "touchend",
        (event) => {

            if (event.changedTouches.length === 0) {
                return;
            }

            const touchEndX =
                event.changedTouches[0].screenX;

            const swipeDistance =
                touchEndX - touchStartX;

            if (swipeDistance < -60) {
                nextPage();
            }

        },
        { passive: true }
    );


    /* -----------------------------------------------------
       INITIAL POSITION
    ----------------------------------------------------- */

    slider.style.transform = "translateX(0%)";

});
