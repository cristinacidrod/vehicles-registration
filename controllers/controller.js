"use strict";
// VEHICLE REGISTRATION
var car = {};
// hide things or not
var isShown = false;
var showCarBox = document.getElementById("carBox");
var showWheelsBox = document.getElementById("wheelsBox");
var showResultsBox = document.getElementById("resultsBox");
hideThings(showCarBox, showWheelsBox, showResultsBox);
// start with the car form
function hideThings(showCarBox, showWheelsBox, showResultsBox) {
    if (!isShown) {
        showCarBox.style.display = "";
        showWheelsBox.style.display = "none";
        showResultsBox.style.display = "none";
    }
}
// CAR ONCLICK
function createCar(event) {
    event.preventDefault(event);
    // get input values and add them in the car object
    var plate = document.querySelector('#plate').value;
    var brand = document.querySelector('#brand').value;
    var color = document.querySelector('#color').value;
    var carCreate = new Car(plate, brand, color);
    car = carCreate;
    // test regex plate with 4 numbers and 3 letters
    var regexPlate = /\b[0-9]{4}[A-Za-z]{3}\b/.test(plate);
    // validate empty inputs and regex plate with message errors or show wheel forms if valid
    var messageErrorCar = document.getElementById("messageErrorCar");
    if ((plate == "") || (brand == "") || (color == "")) {
        messageErrorCar.innerText = "You must fill all the fields in order to register your car!";
    }
    else if (!regexPlate) {
        messageErrorCar.innerText = "The plate must have 4 numbers and 3 leetters. Try it again!";
    }
    else {
        messageErrorCar.innerText = "";
        showCarBox.style.display = "none";
        showWheelsBox.style.display = "";
    }
}
// WHEELS ONCLICK
function addWheels(event) {
    event.preventDefault(event);
    // initialize variables
    var messageErrorWheels = document.getElementById("messageErrorWheels");
    var controlDiameter = 0;
    var isValid = false;
    // get all input values with a for and add them within the car method
    for (var i = 1; i <= 4; i++) {
        var brandW = document.querySelector('#brandWheel' + i).value;
        var diameterW = document.querySelector('#diameterWheel' + i).value;
        var allResults = 0;
        // validate diameter inputs with message errors
        if ((diameterW < 0.4) && (brandW != "") || (diameterW > 2) && (diameterW != "")) {
            messageErrorWheels.innerText = "The diameter must be bigger than 0.4 and smaller than 2!";
            controlDiameter++;
        }
        // validate all empty inputs with message errors
        else if ((brandW == "") || (diameterW == "")) {
            messageErrorWheels.innerText = "You must fill all the fields for the brands and the diameters!";
            controlDiameter++;
        }
        // add the values and change isValid to true if everything is correct
        else if ((controlDiameter < 1) && (brandW != "") && (diameterW != "")) {
            car.addWheel(new Wheel(brandW, diameterW));
            messageErrorWheels.innerText = "";
            allResults = i + allResults++;
            if (allResults == 4) {
                isValid = true;
            }
        }
    }
    // hide the wheels form and show results
    if (isValid) {
        showWheelsBox.style.display = "none";
        showResultsBox.style.display = "";
        showResults();
    }
}
// PRINT RESULTS
function showResults() {
    //print car form information
    var carInfo = document.getElementById("carInfo");
    carInfo.innerText = "PLATE: " + car.plate + " BRAND: " + car.brand + " COLOR: " + car.color;
    // print wheels form information
    var resultWheels = car.wheels;
    for (var i = 0; i <= 3; i++) {
        var wheelObject = resultWheels[i];
        var wheelsBrand = document.getElementById("bW" + (i + 1));
        wheelsBrand.innerText = "Diameter: " + wheelObject.brand;
        var wheelsDiameter = document.getElementById("dW" + (i + 1));
        wheelsDiameter.innerText = "Brand: " + wheelObject.diameter;
    } /* DISCLAIMER: they are reversed so I changed the innerText to match the right p in html to print them correctly */
}
