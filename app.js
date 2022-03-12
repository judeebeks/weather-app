"use strict";

window.addEventListener("load", () => {
    let long;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const tempDescription = document.querySelector(
                ".temperature-description"
            );
            const tempDegree = document.querySelector(".degree");
            const tempLocation = document.querySelector(".location-timezone");
            const tempSection = document.querySelector(".degree-section");
            const tempSectionSpan = document.querySelector(".degree-section span");

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=17ddfbb9acef4d0f888916a1cabe2f11&include=minutely`;

            fetch(api)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    let { temp, timezone } = data.data[0];
                    let { description, icon } = data.data[0].weather;
                    let farentheit = temp * 1.8 + 32;

                    tempDegree.textContent = temp;
                    tempLocation.textContent = timezone;
                    tempDescription.textContent = description;
                    setIcons(icon);

                    tempSection.addEventListener("click", () => {
                        if (tempSectionSpan.textContent === "C") {
                            tempSectionSpan.textContent = "F";
                            tempDegree.textContent = farentheit;
                        } else {
                            tempSectionSpan.textContent = "C";
                            tempDegree.textContent = temp;
                        }
                    });
                });
        });
    }

    function setIcons(icon) {
        const img = document.querySelector(".iconid");
        img.src = `./icons/${icon}.png`;
        img.style.paddingLeft = "0";

        function animateIcons() {
            setTimeout(function() {
                img.style.paddingLeft = "0.3rem";
            }, 1000);
            setTimeout(function() {
                img.style.paddingLeft = "0.6rem";
            }, 2000);
            setTimeout(function() {
                img.style.paddingLeft = "0.9rem";
            }, 3000);
        }

        setInterval(animateIcons, 4000);
    }
});