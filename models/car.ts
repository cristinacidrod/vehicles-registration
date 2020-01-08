class Car{
    plate:any;
    color:any;
    brand:any;
    wheels:Wheel[]=new Array();
    isShown:boolean=false;
    
    constructor(plate:any,color:any,brand:any){
        this.plate=plate;
        this.color=color;
        this.brand=brand;
    }
    
    showWheels() {
    this.isShown = !this.isShown;
    }

    addWheel(wheel:Wheel):void{
        this.wheels.push(wheel);
    }
}