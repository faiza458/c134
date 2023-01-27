img = "";
status = "";
objects = [];

function preload(){
img  = loadImage('dog_cat.jpg');
}


function setup(){
canvas = createCanvas(380,380);
canvas.center();
video = createCapture(VIDEO);
video.size(380,380);
video.hide();
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    }
    
    function gotResult(error,results){
    
    if (error) {
    console.log(error);
    }else{
    console.log(results);
    objects = results;
    }
    }

function draw(){
image(video,0,0,380,380);

if(status != ""){
r = random(255);
g = random(255);
b = random(255);
objectDetector.detect(video, gotResult);
    for(i = 0 ; i < objects.length ; i++ )
{
document.getElementById("status").innerHTML = "Status: Object detected";
document.getElementById("number_of_objects").innerHTML = "Number of detected objects are" + objects.length ;
fill(r,b,g);
percent=floor(objects[i].confidence*100);
text(objects[i].label+ "" + percent + "%" , objects[i].x + 15, objects[i].y + 15);
noFill();
stroke(r,b,g);
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
}
}
}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML = "Status : Detecting Objects";
}