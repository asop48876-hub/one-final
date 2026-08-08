document.addEventListener("DOMContentLoaded", function () {

    const slider = document.getElementById("slider");
    const pages = document.querySelectorAll(".page");
    const nextButtons = document.querySelectorAll(".next-btn");

    const yesButton = document.getElementById("yesButton");
    const thinkButton = document.getElementById("thinkButton");
    const response = document.getElementById("response");

    let currentPage = 0;

    if (!slider || pages.length === 0) {
        return;
    }

    function showPage(index) {

        if (index < 0 || index >= pages.length) {
            return;
        }

        currentPage = index;

        slider.style.transform =
            "translateX(-" + (index * 100) + "%)";
    }

    nextButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            if (currentPage < pages.length - 1) {
                showPage(currentPage + 1);
            }

        });

    });


    if (yesButton) {

        yesButton.addEventListener("click", function () {

            if (response) {
                response.textContent =
                    "You just made me smile. ♡";

                response.classList.add("show");
            }

            yesButton.disabled = true;

            if (thinkButton) {
                thinkButton.disabled = true;
            }

        });

    }


    if (thinkButton) {

        thinkButton.addEventListener("click", function () {

            if (response) {
                response.textContent =
                    "Take all the time you need. ♡";

                response.classList.add("show");
            }

            thinkButton.disabled = true;

            if (yesButton) {
                yesButton.disabled = true;
            }

        });

    }


    showPage(0);

});
