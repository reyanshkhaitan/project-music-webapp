var songHP = "";
var songPP = "";
var leftWristX = 0;
var leftWristY = 0;
var rightWristX = 0;
var rightWristY = 0;

function preload(){
    songHP = loadSound("harry potter.mp3");
    songPP = loadSound("peterpan.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center()
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("posenets model is loaded");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("left wrist x = " + leftWristX + " left wrist y = " + leftWristY);
        console.log("right wrist x = " + rightWristX + "right wrist y = " + rightWristY);

        //scoreLeftWrist = results[0].pose.keypoints[9].score;
        //console.log(scoreLeftWrist);
    }
}


function draw(){
    image(video,0,0,600,500);
}

