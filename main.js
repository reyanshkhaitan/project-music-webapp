var songHP = "";
var songPP = "";
var leftWristX = 0;
var leftWristY = 0;
var rightWristX = 0;
var rightWristY = 0;
var scoreLeftWrist = 0;
var scoreRightWrist = 0;
var song1status = "";
var song2status = "";

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

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(scoreLeftWrist);
        console.log(scoreRightWrist);
    }
}


function draw(){
    image(video,0,0,600,500);

    fill("#FF0000");
    stroke("#FF0000");

    song1status = songHP.isPlaying();
    song2status = songPP.isPlaying();

    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        songPP.stop();
        if(song1status == false){
            songHP.play();
            document.getElementById("songName").innerHTML = "playing Harry Potter";

        }
    }

    if(scoreRightWrist > 0.2){
        circle(RightWristX,RightWristY,20);
        songHP.stop();
        if(song2status == false){
            songPP.play();
            document.getElementById("songName").innerHTML = "playing Peter pan";
             
        }
    }

}

