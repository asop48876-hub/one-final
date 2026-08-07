/* =========================================================
   PROPOSAL WEBSITE
   SCRIPT.JS — PART 1/5
   Core Page Navigation
========================================================= */


/* =========================================================
   1. GET ALL PAGES
========================================================= */

const pages = document.querySelectorAll(".page");


/* =========================================================
   2. GET ALL NEXT BUTTONS
========================================================= */

const nextButtons = document.querySelectorAll(
    ".next-btn"
);


/* =========================================================
   3. CURRENT PAGE
========================================================= */

let currentPage = 0;


/* =========================================================
   4. ACTIVATE INITIAL PAGE
========================================================= */

function initializeWebsite() {

    if (pages.length === 0) {
        return;
    }

    pages.forEach((page, index) => {

        page.classList.toggle(
            "active",
            index === currentPage
        );

    });

}


/* =========================================================
   5. SHOW SPECIFIC PAGE
========================================================= */

function showPage(targetPageId) {

    const targetPage =
        document.getElementById(targetPageId);

    if (!targetPage) {
        return;
    }


    const targetIndex =
        Array.from(pages).indexOf(targetPage);


    if (targetIndex === -1) {
        return;
    }


    /* -----------------------------------------
       Remove active state from current page
    ----------------------------------------- */

    pages[currentPage].classList.remove(
        "active"
    );


    /* -----------------------------------------
       Update current page
    ----------------------------------------- */

    currentPage = targetIndex;


    /* -----------------------------------------
       Activate target page
    ----------------------------------------- */

    pages[currentPage].classList.add(
        "active"
    );

}


/* =========================================================
   6. NEXT BUTTON HANDLER
========================================================= */

function handleNextButton(event) {

    const button =
        event.currentTarget;

    const targetPage =
        button.dataset.next;


    if (!targetPage) {
        return;
    }


    showPage(targetPage);

}


/* =========================================================
   7. CONNECT NEXT BUTTONS
========================================================= */

nextButtons.forEach(button => {

    button.addEventListener(
        "click",
        handleNextButton
    );

});


/* =========================================================
   8. START WEBSITE
========================================================= */

initializeWebsite();


/* =========================================================
   END OF PART 1
========================================================= *//* =========================================================
   SCRIPT.JS — PART 2/5
   Directional Page Transitions / Page State
========================================================= */


/* =========================================================
   1. TRANSITION LOCK
========================================================= */

let isTransitioning = false;


/* =========================================================
   2. TRANSITION DURATION
========================================================= */

const TRANSITION_DURATION = 800;


/* =========================================================
   3. GET PAGE INDEX
========================================================= */

function getPageIndex(page) {

    return Array.from(pages).indexOf(page);

}


/* =========================================================
   4. PREPARE PAGE POSITION
========================================================= */

function preparePage(page, direction) {

    if (!page) {
        return;
    }


    /*
        direction:
        1  = coming from below
       -1  = coming from above
    */

    page.style.transition = "none";

    page.style.transform =
        `translateY(${direction * 100}%)`;

    page.style.opacity = "0";

    page.classList.add("active");


    /*
        Force browser to register
        the starting position.
    */

    page.offsetHeight;


    page.style.transition = "";

}


/* =========================================================
   5. COMPLETE PAGE TRANSITION
========================================================= */

function completePageTransition(
    oldPage,
    newPage,
    direction
) {

    if (!newPage) {
        return;
    }


    /*
        Put new page into its
        starting position.
    */

    preparePage(
        newPage,
        direction
    );


    /*
        Animate old page away.
    */

    if (oldPage) {

        oldPage.style.transform =
            `translateY(${-direction * 100}%)`;

        oldPage.style.opacity =
            "0";

    }


    /*
        Animate new page into view.
    */

    requestAnimationFrame(() => {

        newPage.style.transform =
            "translateY(0)";

        newPage.style.opacity =
            "1";

    });


    /*
        Clean up inline styles
        after the animation.
    */

    setTimeout(() => {

        if (oldPage) {

            oldPage.classList.remove(
                "active"
            );

            oldPage.style.transform = "";
            oldPage.style.opacity = "";

        }


        newPage.style.transform = "";
        newPage.style.opacity = "";


        isTransitioning = false;

    }, TRANSITION_DURATION);

}


/* =========================================================
   6. ADVANCED PAGE NAVIGATION
========================================================= */

function navigateToPage(targetPageId) {

    if (isTransitioning) {
        return;
    }


    const targetPage =
        document.getElementById(
            targetPageId
        );


    if (!targetPage) {
        return;
    }


    const targetIndex =
        getPageIndex(targetPage);


    if (targetIndex === -1) {
        return;
    }


    if (targetIndex === currentPage) {
        return;
    }


    const oldPage =
        pages[currentPage];


    const direction =
        targetIndex > currentPage
            ? 1
            : -1;


    currentPage =
        targetIndex;


    isTransitioning =
        true;


    completePageTransition(
        oldPage,
        targetPage,
        direction
    );

}


/* =========================================================
   7. UPDATE NEXT BUTTON HANDLER
========================================================= */

nextButtons.forEach(button => {

    button.removeEventListener(
        "click",
        handleNextButton
    );


    button.addEventListener(
        "click",
        () => {

            const targetPage =
                button.dataset.next;


            if (!targetPage) {
                return;
            }


            navigateToPage(
                targetPage
            );

        }
    );

});


/* =========================================================
   8. PREVENT ACCIDENTAL PAGE SCROLLING
========================================================= */

window.addEventListener(
    "wheel",
    event => {

        event.preventDefault();

    },
    {
        passive: false
    }
);


/* =========================================================
   9. PREVENT TOUCH SCROLLING
========================================================= */

window.addEventListener(
    "touchmove",
    event => {

        event.preventDefault();

    },
    {
        passive: false
    }
);


/* =========================================================
   10. PREVENT SPACE / ARROW PAGE SCROLL
========================================================= */

window.addEventListener(
    "keydown",
    event => {

        const blockedKeys = [
            "ArrowUp",
            "ArrowDown",
            "PageUp",
            "PageDown",
            " ",
            "Home",
            "End"
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


/* =========================================================
   END OF PART 2
========================================================= *//* =========================================================
   SCRIPT.JS — PART 3/5
   Final Page Interaction
========================================================= */


/* =========================================================
   1. GET FINAL PAGE BUTTONS
========================================================= */

const yesButton =
    document.getElementById("yesBtn");

const thinkButton =
    document.getElementById("thinkBtn");


/* =========================================================
   2. CREATE RESPONSE ELEMENT
========================================================= */

function createResponseMessage(
    message,
    secondaryMessage
) {

    /*
        Remove an existing response first.
        This prevents duplicate messages.
    */

    const existingResponse =
        document.querySelector(
            ".response-message"
        );


    if (existingResponse) {

        existingResponse.remove();

    }


    /*
        Create the response container.
    */

    const response =
        document.createElement("div");


    response.className =
        "response-message";


    /*
        Main response.
    */

    const mainText =
        document.createElement("p");


    mainText.className =
        "response-main";


    mainText.textContent =
        message;


    /*
        Secondary response.
    */

    const secondaryText =
        document.createElement("p");


    secondaryText.className =
        "response-secondary";


    secondaryText.textContent =
        secondaryMessage;


    response.appendChild(
        mainText
    );


    response.appendChild(
        secondaryText
    );


    /*
        Add it to the final page.
    */

    const finalContent =
        document.querySelector(
            ".final-content"
        );


    if (!finalContent) {
        return;
    }


    finalContent.appendChild(
        response
    );


    /*
        Allow CSS animation
        to start naturally.
    */

    requestAnimationFrame(() => {

        response.classList.add(
            "show"
        );

    });

}


/* =========================================================
   3. YES BUTTON
========================================================= */

if (yesButton) {

    yesButton.addEventListener(
        "click",
        () => {

            createResponseMessage(
                "You just made me smile.",
                "Maybe this is where our story begins. ♡"
            );


            /*
                Disable both buttons after
                a choice has been made.
            */

            yesButton.disabled =
                true;

            if (thinkButton) {

                thinkButton.disabled =
                    true;

            }

        }
    );

}


/* =========================================================
   4. LET ME THINK BUTTON
========================================================= */

if (thinkButton) {

    thinkButton.addEventListener(
        "click",
        () => {

            createResponseMessage(
                "Take all the time you need.",
                "Whatever you decide, I'm glad you took the time to read this."
            );


            /*
                Disable both buttons after
                a choice has been made.
            */

            thinkButton.disabled =
                true;

            if (yesButton) {

                yesButton.disabled =
                    true;

            }

        }
    );

}


/* =========================================================
   5. FINAL PAGE STATE
========================================================= */

function resetFinalPageState() {

    const response =
        document.querySelector(
            ".response-message"
        );


    if (response) {

        response.remove();

    }


    if (yesButton) {

        yesButton.disabled =
            false;

    }


    if (thinkButton) {

        thinkButton.disabled =
            false;

    }

}


/* =========================================================
   END OF PART 3
========================================================= *//* =========================================================
   SCRIPT.JS — PART 4/5
   Touch Navigation / Keyboard Support / Safeguards
========================================================= */


/* =========================================================
   1. TOUCH VARIABLES
========================================================= */

let touchStartX = 0;
let touchStartY = 0;

let touchEndX = 0;
let touchEndY = 0;


/* =========================================================
   2. MINIMUM SWIPE DISTANCE
========================================================= */

const SWIPE_THRESHOLD = 60;


/* =========================================================
   3. TOUCH START
========================================================= */

document.addEventListener(
    "touchstart",
    event => {

        const touch =
            event.changedTouches[0];

        if (!touch) {
            return;
        }

        touchStartX =
            touch.screenX;

        touchStartY =
            touch.screenY;

    },
    {
        passive: true
    }
);


/* =========================================================
   4. TOUCH END
========================================================= */

document.addEventListener(
    "touchend",
    event => {

        const touch =
            event.changedTouches[0];

        if (!touch) {
            return;
        }

        touchEndX =
            touch.screenX;

        touchEndY =
            touch.screenY;


        handleSwipe();

    },
    {
        passive: true
    }
);


/* =========================================================
   5. HANDLE SWIPE
========================================================= */

function handleSwipe() {

    if (isTransitioning) {
        return;
    }


    const horizontalDistance =
        touchEndX - touchStartX;


    const verticalDistance =
        touchEndY - touchStartY;


    /*
        Ignore mostly horizontal swipes.
    */

    if (
        Math.abs(horizontalDistance) >
        Math.abs(verticalDistance)
    ) {

        return;

    }


    /*
        Ignore very small movements.
    */

    if (
        Math.abs(verticalDistance) <
        SWIPE_THRESHOLD
    ) {

        return;

    }


    /*
        Swipe upward:
        move to the next page.
    */

    if (verticalDistance < 0) {

        goToNextPage();

    }


    /*
        Swipe downward:
        move to the previous page.
    */

    else {

        goToPreviousPage();

    }

}


/* =========================================================
   6. GO TO NEXT PAGE
========================================================= */

function goToNextPage() {

    if (
        currentPage >=
        pages.length - 1
    ) {

        return;

    }


    const nextPage =
        pages[currentPage + 1];


    if (!nextPage) {
        return;
    }


    navigateToPage(
        nextPage.id
    );

}


/* =========================================================
   7. GO TO PREVIOUS PAGE
========================================================= */

function goToPreviousPage() {

    if (currentPage <= 0) {
        return;
    }


    const previousPage =
        pages[currentPage - 1];


    if (!previousPage) {
        return;
    }


    navigateToPage(
        previousPage.id
    );

}


/* =========================================================
   8. KEYBOARD NAVIGATION
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
            Don't interfere with buttons
            or other interactive controls.
        */

        if (
            event.target.tagName ===
            "BUTTON"
        ) {

            return;

        }


        if (event.key === "ArrowDown") {

            goToNextPage();

        }


        if (event.key === "ArrowUp") {

            goToPreviousPage();

        }

    }
);


/* =========================================================
   9. PREVENT DOUBLE CLICK ISSUES
========================================================= */

document.addEventListener(
    "dblclick",
    event => {

        /*
            Prevent accidental zoom/
            selection-like interactions.
        */

        if (
            event.target.tagName !==
            "INPUT"
        ) {

            event.preventDefault();

        }

    }
);


/* =========================================================
   10. RESET TOUCH VALUES
========================================================= */

function resetTouchValues() {

    touchStartX = 0;
    touchStartY = 0;

    touchEndX = 0;
    touchEndY = 0;

}


/* =========================================================
   11. RESET AFTER EVERY SWIPE
========================================================= */

document.addEventListener(
    "touchend",
    () => {

        setTimeout(
            resetTouchValues,
            50
        );

    },
    {
        passive: true
    }
);


/* =========================================================
   12. PAGE VISIBILITY SAFETY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        /*
            Don't leave a transition
            permanently locked if the
            browser temporarily hides
            the page.
        */

        if (
            document.visibilityState ===
            "visible"
        ) {

            isTransitioning = false;

        }

    }
);


/* =========================================================
   END OF PART 4
========================================================= *//* =========================================================
   SCRIPT.JS — PART 5/5
   Final Polish / Indicators / Initialization
========================================================= */


/* =========================================================
   1. CREATE PAGE INDICATOR
========================================================= */

const proposal =
    document.getElementById("proposal");


let pageIndicator = null;


function createPageIndicator() {

    if (!proposal) {
        return;
    }


    pageIndicator =
        document.createElement("div");


    pageIndicator.className =
        "page-indicator";


    /*
        Create one dot for each page.
    */

    pages.forEach(
        (page, index) => {

            const dot =
                document.createElement("span");


            dot.className =
                "indicator-dot";


            dot.setAttribute(
                "aria-label",
                `Page ${index + 1}`
            );


            if (
                index === currentPage
            ) {

                dot.classList.add(
                    "active"
                );

            }


            pageIndicator.appendChild(
                dot
            );

        }
    );


    proposal.appendChild(
        pageIndicator
    );

}


/* =========================================================
   2. UPDATE PAGE INDICATOR
========================================================= */

function updatePageIndicator() {

    if (!pageIndicator) {
        return;
    }


    const dots =
        pageIndicator.querySelectorAll(
            ".indicator-dot"
        );


    dots.forEach(
        (dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentPage
            );

        }
    );

}


/* =========================================================
   3. WATCH PAGE CHANGES
========================================================= */

const originalNavigateToPage =
    navigateToPage;


navigateToPage = function(
    targetPageId
) {

    const oldPage =
        currentPage;


    originalNavigateToPage(
        targetPageId
    );


    /*
        Update immediately so the
        indicator follows navigation.
    */

    if (
        currentPage !== oldPage
    ) {

        updatePageIndicator();

    }

};


/* =========================================================
   4. FINAL PAGE REACHED
========================================================= */

function handleFinalPage() {

    if (
        currentPage ===
        pages.length - 1
    ) {

        document.body.classList.add(
            "final-page-active"
        );

    }

    else {

        document.body.classList.remove(
            "final-page-active"
        );

    }

}


/* =========================================================
   5. KEEP FINAL PAGE STATE UPDATED
========================================================= */

const indicatorObserver =
    new MutationObserver(() => {

        handleFinalPage();

    });


if (proposal) {

    indicatorObserver.observe(
        proposal,
        {
            subtree: true,
            attributes: true,
            attributeFilter: [
                "class"
            ]
        }
    );

}


/* =========================================================
   6. PAGE LOAD CHECK
========================================================= */

function verifyWebsiteStructure() {

    if (!pages.length) {

        console.error(
            "Proposal website: No pages found."
        );

        return false;

    }


    if (!nextButtons.length) {

        console.warn(
            "Proposal website: No next buttons found."
        );

    }


    return true;

}


/* =========================================================
   7. FINAL INITIALIZATION
========================================================= */

function startProposalWebsite() {

    const valid =
        verifyWebsiteStructure();


    if (!valid) {
        return;
    }


    /*
        Make sure only the first page
        is active when the website starts.
    */

    pages.forEach(
        (page, index) => {

            page.classList.toggle(
                "active",
                index === 0
            );

        }
    );


    currentPage = 0;


    /*
        Create indicator.
    */

    createPageIndicator();


    /*
        Set initial state.
    */

    updatePageIndicator();

    handleFinalPage();

}


/* =========================================================
   8. START WHEN DOM IS READY
========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        startProposalWebsite
    );

}

else {

    startProposalWebsite();

}


/* =========================================================
   9. ERROR SAFETY
========================================================= */

window.addEventListener(
    "error",
    event => {

        console.error(
            "Proposal website error:",
            event.error
        );

    }
);


/* =========================================================
   10. FINAL JAVASCRIPT MARK
========================================================= */

/*
    ======================================================
    JAVASCRIPT COMPLETE
    ======================================================

    Four-page navigation
    Vertical transitions
    Touch/swipe navigation
    Keyboard navigation
    Final-page responses
    Page indicators
    Scroll prevention
    Responsive interaction
    Safety checks

    ======================================================
*/


/* =========================================================
   END OF SCRIPT.JS — PART 5/5
========================================================= */
