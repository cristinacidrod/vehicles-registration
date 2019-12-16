"use strict";
var Car = /** @class */ (function () {
    function Car(plate, color, brand) {
        this.wheels = new Array();
        this.isShown = false;
        this.plate = plate;
        this.color = color;
        this.brand = brand;
    }
    Car.prototype.showWheels = function () {
        this.isShown = !this.isShown;
    };
    Car.prototype.addWheel = function (wheel) {
        this.wheels.push(wheel);
    };
    return Car;
}());
