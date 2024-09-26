img="";
var status = "";
objects = [];
var Detector = "";

function preload(){
    img=loadImage('bottle.jpg')
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
        Detector = ml5.objectDetector('cocossd',modelLoaded);
   document.getElementById("status2").innerHTML = "Status : Detecting Objects";

}
function draw(){
    image(img, 0, 0, 380, 380);
    fill("#FF0000")
    if (status != ""){
        r = random(255);
        g = random(255);
        b = random(255);

        Detector.detect(img, gotResult);
        for(j =0; j< objects.length; j++){
            document.getElementById("status2").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects2").innerHTML = "Number of objects detected are : "+ objects.length;
            fill(r,g,b);
            percent = floor(objects[j].confidence * 100);
            text(objects[j].label + " " + percent + "%", objects[j].x + 15, objects[j].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[j].x, objects[j].y, objects[j].width, objects[j].height);
        }
    }

}
function modelLoaded() {
    console.log("Model Loaded!");
    status = "true";
    Detector.detect(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
    
}

