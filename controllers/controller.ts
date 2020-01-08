// VEHICLE REGISTRATION
let car: any = {};

// hide things or not
let isShown: boolean = false;
let showCarBox: any = document.getElementById("carBox");
let showWheelsBox: any = document.getElementById("wheelsBox");
let showResultsBox: any = document.getElementById("resultsBox");
hideThings(showCarBox, showWheelsBox, showResultsBox);

// start with the car form
function hideThings(showCarBox: any, showWheelsBox: any, showResultsBox: any) {
    if (!isShown) {
        showCarBox.style.display = "";
        showWheelsBox.style.display = "none";
        showResultsBox.style.display = "none";
    }
}

// CAR ONCLICK
function createCar(event: any) {
    event.preventDefault(event);

    // get input values and add them in the car object
    let plate: any = (<HTMLInputElement>document.querySelector('#plate')).value;
    let brand: any = (<HTMLInputElement>document.querySelector('#brand')).value;
    let color: any = (<HTMLInputElement>document.querySelector('#color')).value;
    let carCreate = new Car(plate, brand, color);
    car = carCreate;

    // test regex plate with 4 numbers and 3 letters
    let regexPlate = /\b[0-9]{4}[A-Za-z]{3}\b/.test(plate);

    // validate empty inputs and regex plate with message errors or show wheel forms if valid
    let messageErrorCar = <HTMLElement>document.getElementById("messageErrorCar");
    if ((plate == "") || (brand == "") || (color == "")) {
        messageErrorCar.innerText = "You must fill all the fields in order to register your car!"
    } else if (!regexPlate) {
        messageErrorCar.innerText = "The plate must have 4 numbers and 3 leetters. Try it again!";
    } else {
        messageErrorCar.innerText = "";
        showCarBox.style.display = "none";
        showWheelsBox.style.display = "";
    }
}

// WHEELS ONCLICK
function addWheels(event: any) {
    event.preventDefault(event);

    // initialize variables
    let messageErrorWheels = <HTMLElement>document.getElementById("messageErrorWheels");
    let controlDiameter: number = 0;
    let isValid = false;

    // get all input values with a for and add them within the car method
    for (var i = 1; i <= 4; i++) {
        let brandW: any = (<HTMLInputElement>document.querySelector('#brandWheel' + i)).value;
        let diameterW: any = (<HTMLInputElement>document.querySelector('#diameterWheel' + i)).value;
        let allResults = 0;

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
    let carInfo = <HTMLElement>document.getElementById("carInfo");
    carInfo.innerText = "PLATE: " + car.plate + " BRAND: " + car.brand + " COLOR: " + car.color;

    // print wheels form information
    let resultWheels = car.wheels;
    for (var i = 0; i <= 3; i++) {
        let wheelObject = resultWheels[i];
        console.log(wheelObject, "console");
        let wheelsBrand = <HTMLElement>document.getElementById("bW" + (i + 1));
        wheelsBrand.innerText = "Brand: " + wheelObject.brand;
        let wheelsDiameter = <HTMLElement>document.getElementById("dW" + (i + 1));
        wheelsDiameter.innerText = "Diameter: " + wheelObject.diameter;
    }
}