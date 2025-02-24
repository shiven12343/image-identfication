img="";
var status = "";
objects = [];
var Detector = "";

function preload(){
    img=loadImage('person.jpg')
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
        Detector = ml5.objectDetector('cocossd',modelLoaded);
   document.getElementById("status5").innerHTML = "Status : Detecting Objects";

}
function draw(){
    image(img, 0, 0, 380, 380);
    fill("#FF0000")
    if (status != ""){
        r = random(255);
        g = random(255);
        b = random(255);

        Detector.detect(img, gotResult);
        for(i =0; i< objects.length; i++){
            document.getElementById("status5").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects5").innerHTML = "Number of objects detected are : "+ objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15 );
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
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

